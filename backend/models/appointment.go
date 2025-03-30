package models

import "time"

type Appointment struct {
	ID        int       `json:"id"`
	Service   string    `json:"service"`
	Date      time.Time `json:"date"`
	Time      string    `json:"time"`
	ClientID  int       `json:"client_id"`
	Confirmed bool      `json:"confirmed"`
}
