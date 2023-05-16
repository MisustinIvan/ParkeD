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

type Spot struct {
	id int
	ocupied int
	reserved int
	time_from int
	time_to int
	for_disabled int
    engine_type string
    location_x int
    location_y int
    price int
}

func GetSpotInfo(w http.ResponseWriter, r * http.Request) {
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

    query := fmt.Sprintf(
`SELECT id, ocupied, reserved, time_from, time_to, for_disabled, engine_type, location_x, location_y, price
FROM parking_spot
WHERE id = %s
LIMIT 1`, id)

    row := db.QueryRow(query, id)
    response := ""

	spot := Spot{}
	err = row.Scan(&spot.id, &spot.ocupied, &spot.reserved, &spot.time_from, &spot.time_to, &spot.for_disabled, &spot.engine_type, &spot.location_x, &spot.location_y, &spot.price)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No record found with ID", id)
		} else {
			log.Fatal(err)
		}
	} else {

        response = fmt.Sprintf(
            `{"id":%d,"ocupied":%d,"reserved":%d,"time_from":%d,"time_to":%d,"for_disabled":%d,"engine_type":"%s","location_x":%d,"location_y":%d,"price":%d}`,
        spot.id,
        spot.ocupied,
        spot.reserved,
        spot.time_from,
        spot.time_to,
        spot.for_disabled,
        spot.engine_type,
        spot.location_x,
        spot.location_y,
        spot.price,
        )
	}

    // send the response
	w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    fmt.Fprintf(w, fmt.Sprintf(response))

    fmt.Println("served get_spot_state request")

    defer db.Close()
}
