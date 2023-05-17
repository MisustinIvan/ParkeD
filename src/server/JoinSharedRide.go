
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

func JoinSharedRide(w http.ResponseWriter, r * http.Request) {
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

    command := fmt.Sprintf(
`UPDATE rides
SET passenger_id = %s
WHERE id = %s`, values.Get("user_id"), values.Get("ride_id"))

    _, err = db.Exec(command)

    if err != nil {
        log.Fatal(err)
    }

    // send the response
	w.Header().Set("Content-Type", "text/plain")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, fmt.Sprintf("OK"))

    fmt.Println("served join_shared_ride request")

    defer db.Close()
}
