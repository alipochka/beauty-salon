package utils

import (
	"log"
	"net/smtp"
)

func SendReminder(email, service, date, time string) {
	from := "your-email@example.com"
	password := "your-email-password"

	to := email
	host := "smtp.example.com"
	port := "587"
	address := host + ":" + port

	subject := "Subject: Напоминание о записи\n"
	body := "У вас запись на " + service + " в " + date + " в " + time + "."
	msg := []byte(subject + body)
	auth := smtp.PlainAuth("", from, password, host)

	err := smtp.SendMail(address, auth, from, []string{to}, msg)
	if err != nil {
		log.Fatal(err)
	}
}
