package handlers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"beauty-salon-api/models"
	"beauty-salon-api/utils"

	"github.com/gin-gonic/gin"
)

func CreateAppointment(c *gin.Context) {
	var appointment models.Appointment
	if err := c.ShouldBindJSON(&appointment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	userID := c.MustGet("user_id").(float64)
	appointment.ClientID = int(userID)
	appointment.Confirmed = false

	err := utils.DB.QueryRow("INSERT INTO appointments (service, date, time, client_id, confirmed) VALUES ($1, $2, $3, $4, $5) RETURNING id",
		appointment.Service, appointment.Date, appointment.Time, appointment.ClientID, appointment.Confirmed).Scan(&appointment.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create appointment"})
		return
	}

	c.JSON(http.StatusCreated, appointment)
}

func GetAppointments(c *gin.Context) {
	userID := c.MustGet("user_id").(float64)
	rows, err := utils.DB.Query("SELECT id, service, date, time, confirmed FROM appointments WHERE client_id=$1", int(userID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var appointments []models.Appointment
	for rows.Next() {
		var a models.Appointment
		err := rows.Scan(&a.ID, &a.Service, &a.Date, &a.Time, &a.Confirmed)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		appointments = append(appointments, a)
	}

	c.JSON(http.StatusOK, appointments)
}

func ConfirmAppointment(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	_, err := utils.DB.Exec("UPDATE appointments SET confirmed = true WHERE id=$1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Appointment confirmed"})
}

func CancelAppointment(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	_, err := utils.DB.Exec("DELETE FROM appointments WHERE id=$1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Appointment canceled"})
}

func SendReminder(appointment models.Appointment) {
	// Здесь можно добавить логику для отправки напоминаний, например, через email или SMS
	// Например, можно использовать пакет для отправки email
	// На данный момент просто выводим сообщение в консоль
	timeUntilAppointment := time.Until(appointment.Date)
	if timeUntilAppointment < 24*time.Hour {
		fmt.Printf("Sending reminder for appointment ID %d\n", appointment.ID)
	}
}
