import { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, ScrollView, Modal, Pressable, TextInput } from "react-native";

import { userIdAtom, loggedInAtom } from "../../App";
import { useAtom, atom } from "jotai";

export default function MapScreen({navigation}) {
  const [parkplaces, setParkplaces] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeFrom, setTimeFrom] = useState(0)
  const [timeTo, setTimeTo] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const ParkplatzUrl = 'http://f486-84-19-71-121.ngrok-free.app/get_spot_state';
      const requests = [];

      for (let i = 1; i <= 27; i++) {
        const data = "id=" + i

        const request = axios.post(ParkplatzUrl, data)
          .then(response => response.data)
          .catch(error => {
            console.error(error);
            return null;
          });

        requests.push(request);
      }

      const responses = await Promise.all(requests);
      setParkplaces(responses);
    };

    fetchData();
  }, []);

  useEffect(()=>{

  }, [timeTo, timeFrom])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <ScrollView style={{ marginTop: 20 }}>
        {parkplaces.map((item, index) =>
        (
            <View style={styles.ParkingSpot}>
              <Pressable onPress={()=>{setModalVisible(true)}}>
                <Text style={styles.ParkingSpot} key={index}>
                  {item.id}
                  {" | "}
                  {item.ocupied = 1 ? "empty" : "occupied"}
                  {" | "}
                  {item.reserved = 1 ? "free" : "reserved"}
                  {" | "}
                  {item.engine_type}
                  {item.for_disabled = 0 ? " | " : ""}
                  {item.for_disabled = 0 ? "for disabled" : ""}
                  {" | "}
                  {item.price}
                </Text>
              </Pressable>
            </View>
        ))}
        </ScrollView>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.ReservationMenu}>
              <Text style={styles.InfoText}>Pick a time</Text>

              <TextInput
                value={timeFrom}
                style={styles.time_input}
                onChangeText={newText => setTimeFrom(newText)}
                placeholder="From"
              />

              <TextInput
                value={timeTo}
                style={styles.time_input}
                onChangeText={newText => setTimeTo(newText)}
                placeholder="To"
              />
            <Pressable style={styles.ButtonContainer} onPress={()=>{}}>
              <Text style={styles.Button}>Confirm</Text>
            </Pressable>

            <Pressable style={styles.ButtonContainer} onPress={()=>{setModalVisible(false)}}>
              <Text style={styles.Button}>Cancel</Text>
            </Pressable>
            </View>
          </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  ButtonContainer : {
    width : "120%",
    alignContent: "center",
    marginLeft: "80%"
  },
  Button : {
    fontWeight: "400",
    fontSize: 20,
    width: "30%",
    backgroundColor: "#ff6700",
    color: "#3f3f3f",
    borderRadius: 8,
    margin: 4,
    padding: 6,
  },
  time_input : {
    fontSize: 20,
    borderColor : "#ff6700",
    padding : 8,
    width: "40%",
  },
  InfoText : {
    fontWeight: "500",
    fontSize: 30,
  },
  ParkingSpot : {
    fontWeight: "400",
    fontSize: 25,
    backgroundColor: "#ff6700",
    color: "#3f3f3f",
    borderRadius: 8,
    margin: 4,
    padding: 2,
  },
  ReservationMenu: {
    marginLeft: "15%",
    marginTop: "60%",
    shadowColor: "#3f3f3f",
    shadowOpacity: 0.5,
    borderRadius: 12,
    elevation: 5,
    width: "70%",
    height: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3"
  }

})
