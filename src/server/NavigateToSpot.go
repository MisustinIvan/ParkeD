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

func NavigateToSpot(w http.ResponseWriter, r * http.Request) {
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
    fmt.Println(values)

    // send the response
	w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, fmt.Sprintf("ligma balls"))

    fmt.Println("served navigate_to_spot request")

    defer db.Close()
}
