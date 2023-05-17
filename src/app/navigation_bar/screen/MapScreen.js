import { useState, useEffect } from "react";
import axios from "axios";
import { View, Text } from "react-native";

import { userIdAtom, loggedInAtom } from "../../App";
import { useAtom, atom } from "jotai";

export default function MapScreen({navigation}) {
      const [parkplaces, setParkplaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ParkplatzUrl = 'http://f486-84-19-71-121.ngrok-free.app/get_spot_state';
      const requests = [];

      for (let i = 1; i <= 5; i++) {
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

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

      <Text
        onPress={() => navigation.navigate('Home')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        {parkplaces.map((item, index) =>
        (
            <Div>
                <Text key={index}>{item.id}</Text>
            </Div>
        ))}
      </Text>
    </View>
  );
};
