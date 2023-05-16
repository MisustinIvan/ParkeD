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

func AddSharedRide(w http.ResponseWriter, r * http.Request) {
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

    driver_id := values.Get("id")
    from_where_x := values.Get("from_where_x")
    from_where_y := values.Get("from_where_y")
    to_where_x := values.Get("to_where_x")
    to_where_y := values.Get("to_where_y")
    when := values.Get("when")

    command := fmt.Sprintf(
`INSERT INTO rides (id, from_where_x, from_where_y, to_where_x, to_where_y, when)
VALUES = (%s, %s, %s, %s, %s, %s)`,
driver_id, from_where_x, from_where_y, to_where_x, to_where_y, when)

    _, err = db.Exec(command)

    if err != nil{
        log.Fatal(err)
    }

	w.Header().Set("Content-Type", "plain/text")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, fmt.Sprintf("OK"))

    fmt.Println("served upload_user_rating request")

    defer db.Close()
}
