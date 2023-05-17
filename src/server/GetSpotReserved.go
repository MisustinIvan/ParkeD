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

func GetSpotReserved(w http.ResponseWriter, r * http.Request) {
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

    fmt.Println(body_str)

    values, err := url.ParseQuery(body_str)
	if err != nil {
		log.Fatal(err)
	}

    id := values.Get("id")

    query := fmt.Sprintf(
`SELECT reserved
FROM parking_spot
WHERE id = %s
LIMIT 1`, id)

    row := db.QueryRow(query)
    response := ""
    reserved := ""

	err = row.Scan(&reserved)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No record found with ID", id)
		} else {
			log.Fatal(err)
		}
	} else {
        response = reserved
	}

    // send the response
	w.Header().Set("Content-Type", "text/plain")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, fmt.Sprintf(response))

    fmt.Println("served get_spot_state request")

    defer db.Close()
}
