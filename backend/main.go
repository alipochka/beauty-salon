package main

import (
	"beauty-salon-api/handlers"
	"beauty-salon-api/utils"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Настройка CORS
	r.Use(cors.Default())

	// Инициализация базы данных
	utils.InitDB()

	// Маршруты для авторизации
	r.POST("/api/register", handlers.Register)
	r.POST("/api/login", handlers.Login)

	// Защищенные маршруты
	api := r.Group("/api")
	api.Use(utils.JWTAuthMiddleware())
	{
		api.POST("/appointments", handlers.CreateAppointment)
		api.GET("/appointments", handlers.GetAppointments)
		api.POST("/appointments/:id/confirm", handlers.ConfirmAppointment)
		api.POST("/appointments/:id/cancel", handlers.CancelAppointment)
		api.GET("/user/profile", handlers.GetUserProfile)
	}

	r.Run(":8080")
}
