import * as React from "react";
import { View, Text } from "react-native";

export default function MapScreen({navigation_bar}) {
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text
                onPress={() => navigation_bar.navigate("Home")}
                style={{ fontSize: 26, fontWeight:"bold"}}>Map</Text>
         </View>   
    );
}
