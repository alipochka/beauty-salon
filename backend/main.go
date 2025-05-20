package main

func main() {

}

// import (
// 	"encoding/json"
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"time"

// 	"github.com/gorilla/mux"
// 	"github.com/jmoiron/sqlx"
// 	_ "github.com/lib/pq"
// 	"github.com/robfig/cron/v3"
// )

// // Модели данных
// type Appointment struct {
// 	ID          int       `json:"id" db:"id"`
// 	UserID      int       `json:"user_id" db:"user_id"`
// 	ServiceID   int       `json:"service_id" db:"service_id"`
// 	DateTime    time.Time `json:"datetime" db:"datetime"`
// 	Description string    `json:"description" db:"description"`
// 	Status      string    `json:"status" db:"status"`
// }

// type Service struct {
// 	ID          int    `json:"id" db:"id"`
// 	Name        string `json:"name" db:"name"`
// 	Description string `json:"description" db:"description"`
// 	Duration    int    `json:"duration" db:"duration"` // в минутах
// }

// type User struct {
// 	ID       int    `json:"id" db:"id"`
// 	Name     string `json:"name" db:"name"`
// 	Email    string `json:"email" db:"email"`
// 	Phone    string `json:"phone" db:"phone"`
// 	Telegram string `json:"telegram" db:"telegram"`
// }

// // Глобальные переменные
// var db *sqlx.DB
// var notificationCron *cron.Cron

// func main() {
// 	// Инициализация БД
// 	initDB()
// 	defer db.Close()

// 	// Инициализация планировщика уведомлений
// 	initNotificationScheduler()
// 	defer notificationCron.Stop()

// 	// Настройка роутера
// 	r := mux.NewRouter()

// 	// API endpoints
// 	r.HandleFunc("/appointments", createAppointment).Methods("POST")
// 	r.HandleFunc("/appointments/{userId}", getUserAppointments).Methods("GET")
// 	r.HandleFunc("/appointments/{id}", cancelAppointment).Methods("DELETE")
// 	r.HandleFunc("/services", getServices).Methods("GET")

// 	// Запуск сервера
// 	log.Println("Server starting on port 8080...")
// 	log.Fatal(http.ListenAndServe(":8080", r))
// }

// func initDB() {
// 	var err error
// 	connStr := "user=postgres dbname=beauty_salon password=postgres sslmode=disable"
// 	db, err = sqlx.Connect("postgres", connStr)
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	// Создание таблиц при необходимости
// 	db.MustExec(`
// 		CREATE TABLE IF NOT EXISTS services (
// 			id SERIAL PRIMARY KEY,
// 			name TEXT NOT NULL,
// 			description TEXT,
// 			duration INTEGER NOT NULL
// 		);

// 		CREATE TABLE IF NOT EXISTS users (
// 			id SERIAL PRIMARY KEY,
// 			name TEXT NOT NULL,
// 			email TEXT,
// 			phone TEXT,
// 			telegram TEXT
// 		);

// 		CREATE TABLE IF NOT EXISTS appointments (
// 			id SERIAL PRIMARY KEY,
// 			user_id INTEGER REFERENCES users(id),
// 			service_id INTEGER REFERENCES services(id),
// 			datetime TIMESTAMP NOT NULL,
// 			description TEXT,
// 			status TEXT DEFAULT 'active'
// 		);
// 	`)
// }

// func initNotificationScheduler() {
// 	notificationCron = cron.New()

// 	// Проверка каждые 5 минут на предстоящие записи
// 	notificationCron.AddFunc("@every 5m", checkUpcomingAppointments)

// 	notificationCron.Start()
// }

// func checkUpcomingAppointments() {
// 	// Записи, которые начнутся через 24 часа
// 	upcomingTime := time.Now().Add(24 * time.Hour)

// 	var appointments []Appointment
// 	err := db.Select(&appointments,
// 		"SELECT * FROM appointments WHERE datetime BETWEEN $1 AND $2 AND status = 'active'",
// 		upcomingTime.Add(-5*time.Minute), upcomingTime)

// 	if err != nil {
// 		log.Printf("Error fetching upcoming appointments: %v", err)
// 		return
// 	}

// 	for _, appt := range appointments {
// 		sendNotification(appt)
// 	}
// }

// func sendNotification(appt Appointment) {
// 	var user User
// 	err := db.Get(&user, "SELECT * FROM users WHERE id = $1", appt.UserID)
// 	if err != nil {
// 		log.Printf("Error fetching user: %v", err)
// 		return
// 	}

// 	var service Service
// 	err = db.Get(&service, "SELECT * FROM services WHERE id = $1", appt.ServiceID)
// 	if err != nil {
// 		log.Printf("Error fetching service: %v", err)
// 		return
// 	}

// 	// Здесь должна быть реализация отправки уведомления
// 	// через Telegram, Email или SMS
// 	message := fmt.Sprintf("Напоминание: у вас запись на %s завтра в %s. Услуга: %s",
// 		appt.DateTime.Format("15:04"), service.Name)

// 	log.Printf("Sending notification to user %d: %s", user.ID, message)
// 	// Реальная отправка уведомления будет здесь
// }

// // Обработчики API
// func createAppointment(w http.ResponseWriter, r *http.Request) {
// 	var appt Appointment
// 	if err := json.NewDecoder(r.Body).Decode(&appt); err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	// Проверка доступности времени
// 	var count int
// 	err := db.Get(&count,
// 		"SELECT COUNT(*) FROM appointments WHERE datetime BETWEEN $1 AND $2 AND status = 'active'",
// 		appt.DateTime, appt.DateTime.Add(time.Minute*time.Duration(appt.Service.Duration)))

// 	if err != nil || count > 0 {
// 		http.Error(w, "This time slot is not available", http.StatusConflict)
// 		return
// 	}

// 	// Сохранение записи
// 	_, err = db.NamedExec(`
// 		INSERT INTO appointments (user_id, service_id, datetime, description)
// 		VALUES (:user_id, :service_id, :datetime, :description)`, &appt)

// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	w.WriteHeader(http.StatusCreated)
// 	json.NewEncoder(w).Encode(appt)
// }

// func getUserAppointments(w http.ResponseWriter, r *http.Request) {
// 	vars := mux.Vars(r)
// 	userID := vars["userId"]

// 	var appointments []Appointment
// 	err := db.Select(&appointments,
// 		"SELECT * FROM appointments WHERE user_id = $1 AND status = 'active' ORDER BY datetime", userID)

// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	json.NewEncoder(w).Encode(appointments)
// }

// func cancelAppointment(w http.ResponseWriter, r *http.Request) {
// 	vars := mux.Vars(r)
// 	apptID := vars["id"]

// 	_, err := db.Exec(
// 		"UPDATE appointments SET status = 'cancelled' WHERE id = $1", apptID)

// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	w.WriteHeader(http.StatusNoContent)
// }

// func getServices(w http.ResponseWriter, r *http.Request) {
// 	var services []Service
// 	err := db.Select(&services, "SELECT * FROM services")

// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	json.NewEncoder(w).Encode(services)
// }
