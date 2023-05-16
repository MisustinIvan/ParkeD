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

func LoginUser(w http.ResponseWriter, r * http.Request) {
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

    query := fmt.Sprintf(
`SELECT (password)
FROM users
WHERE name = "%s" OR email = "%s"`, values.Get("name"), values.Get("email"))

    row := db.QueryRow(query)

    password_dest := ""

    err = row.Scan(&password_dest)

    if password_dest == values.Get("password") {
        w.Header().Set("Content-Type", "plain/text")
        w.WriteHeader(http.StatusOK)
        fmt.Fprintf(w, fmt.Sprintf("OK"))

        fmt.Println("served login_user request")

        defer db.Close()
        return
    }

    // send the response
	w.Header().Set("Content-Type", "text/plain")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, fmt.Sprintf("NOT OK"))

    fmt.Println("served login_user request")

    defer db.Close()
}
