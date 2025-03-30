package utils

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
	connStr := "user=salon_user1 password=1111 dbname=beauty_salon sslmode=disable"
	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	if err = DB.Ping(); err != nil {
		panic(err)
	}
	fmt.Println("Successfully connected to the database!")
}
