package handlers

import (
	"net/http"

	"beauty-salon-api/models"
	"beauty-salon-api/utils"

	"github.com/gin-gonic/gin"
)

func GetUserProfile(c *gin.Context) {
	userID := c.MustGet("user_id").(float64)
	var user models.User
	err := utils.DB.QueryRow("SELECT id, username FROM users WHERE id=$1", int(userID)).Scan(&user.ID, &user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user profile"})
		return
	}

	c.JSON(http.StatusOK, user)
}
