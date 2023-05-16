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

func ChangeSpotState(w http.ResponseWriter, r * http.Request) {
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

    id := values.Get("id")
    ocupied := values.Get("ocupied")
    reserved := values.Get("reserved")


    command := fmt.Sprintf(
`UPDATE parking_spot
SET ocupied = %s, reserved = %s
WHERE id = %s`, ocupied, reserved, id)

    _, err = db.Exec(command)
    if err != nil {
        log.Fatal(err)
    }

    // send the response
	w.Header().Set("Content-Type", "text/plain")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, "OK")

    fmt.Println("served change_spot_state request")

    defer db.Close()
}
