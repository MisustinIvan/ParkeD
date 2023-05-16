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

func RegisterUser(w http.ResponseWriter, r * http.Request) {
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
    
    // check if user exists

    query := fmt.Sprintf(
`SELECT (name, email)
FROM users
WHERE name = %s OR email = %s`, values.Get("name"), values.Get("email"))


    row := db.QueryRow(query)

    output := ""

    err = row.Scan(output)

    if err != sql.ErrNoRows {
        w.Header().Set("Content-Type", "plain/text")
        w.WriteHeader(http.StatusOK)
        fmt.Fprintf(w, fmt.Sprintf("NOT OK"))

        fmt.Println("served register_user request")

        defer db.Close()
        return
    }

    command := fmt.Sprintf(
`INSERT INTO users (name, email, password, license_plate, engine_type, disabled_person, rating)
VALUES ("%s", "%s", "%s", "%s", "%s", %s, 0)`,
    values.Get("name"),
    values.Get("email"),
    values.Get("password"),
    values.Get("license_plate"),
    values.Get("engine_type"),
    values.Get("disabled_person"),
    )

    _, err = db.Exec(command)
    if err != nil {
        log.Fatal(err)
    }

	w.Header().Set("Content-Type", "plain/text")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, fmt.Sprintf("OK"))

    fmt.Println("served register_user request")

    defer db.Close()
}
