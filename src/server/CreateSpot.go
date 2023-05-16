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

func CreateSpot(w http.ResponseWriter, r * http.Request) {
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

    command := 
fmt.Sprintf(`INSERT INTO parking_spot (ocupied, reserved, time_from, time_to, for_disabled, engine_type, location_x, location_y, price)
VALUES (%s, %s, %s, %s, %s, "%s", %s, %s, %s)`,
    values.Get("ocupied"),
    values.Get("reserved"),
    values.Get("time_from"),
    values.Get("time_to"),
    values.Get("for_disabled"),
    values.Get("engine_type"),
    values.Get("location_x"),
    values.Get("location_y"),
    values.Get("price"),
)

    _, err = db.Exec(command)
    if err != nil {
        log.Fatal(err)
    }
    
    // send the response
	w.Header().Set("Content-Type", "text/plain")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, fmt.Sprintf("OK"))

    fmt.Println("served create_spot request")

    defer db.Close()
}
