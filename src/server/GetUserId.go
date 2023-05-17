package main

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"

	_ "github.com/mattn/go-sqlite3"
)

func GetUserId(w http.ResponseWriter, r * http.Request) {
    // init the database
    db, err := sql.Open("sqlite3", "./database.db")
    if err != nil {
        log.Fatal(err)
    }

    // do the shit we want to do
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        log.Fatal(err)
    }
    body_str := string(body)

    values, err := url.ParseQuery(body_str)
	if err != nil {
		log.Fatal(err)
	}

    email := values.Get("email")

    fmt.Println(values)
    fmt.Println(email)
    fmt.Println(body_str)

    query := fmt.Sprintf(
`SELECT id
FROM users
WHERE email = "%s"
LIMIT 1`,
    email)

    id := "none"

    row := db.QueryRow(query)

    err = row.Scan(&id)

	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No record found with ID", id)
		} else {
			log.Fatal(err)
		}

	} else {
        w.Header().Set("Content-Type", "text/plain")
        w.WriteHeader(http.StatusOK)
        fmt.Fprintf(w, fmt.Sprintf(id))

        fmt.Println("served get_user_id request")

        defer db.Close()
        return
    }

    // send the response
	w.Header().Set("Content-Type", "text/plain")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, fmt.Sprintf("NOT OK"))

    fmt.Println("served get_user_id request")

    defer db.Close()
}
