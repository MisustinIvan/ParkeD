package main

import (
	"fmt"
	"io"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)




func HandleRoot(w http.ResponseWriter, r * http.Request) {
    io.WriteString(w, "hello from root\n")
}

func main() {
    http.HandleFunc("/", HandleRoot)
    http.HandleFunc("/change_spot_state", ChangeSpotState)
    http.HandleFunc("/get_spot_state", GetSpotInfo)
    http.HandleFunc("/register_user", RegisterUser)
    http.HandleFunc("/login_user", LoginUser)
    http.HandleFunc("/create_spot", CreateSpot)
    http.HandleFunc("/navigate_to_spot", NavigateToSpot)
    http.HandleFunc("/upload_user_rating", UploadUserRating)
    http.HandleFunc("/add_shared_ride", AddSharedRide)

    fmt.Println("server ready")
    fmt.Println("----------------------")
    http.ListenAndServe(":6969", nil)
}
