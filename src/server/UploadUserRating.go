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

func UploadUserRating(w http.ResponseWriter, r * http.Request) {
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
    
    user_id := values.Get("id")
    rating := values.Get("rating")
    
    command := fmt.Sprintf(
`UPDATE users
SET rating = rating + %s
WHERE id = %s`,
rating,
user_id)

    _, err = db.Exec(command)

    if err != nil {
        log.Fatal(err)
    }

	w.Header().Set("Content-Type", "plain/text")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, fmt.Sprintf("OK"))

    fmt.Println("served upload_user_rating request")

    defer db.Close()
}
