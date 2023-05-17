import * as React from 'react';


import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"


import HomeScreen from "./screen/HomeScreen";
import MapScreen from "./screen/MapScreen";
import ProfileScreen from "./screen/ProfileScreen";


const homename = "Home"
const Profilename = "Profile"
const Mapname = "Map"

const Tab = createBottomTabNavigator();


export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator 
            initialRouteName={homename, Profilename}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconname;
                    let rn = route.name;

                    if (rn === homename){
                        iconname = focused ? "home" : "home-outline";
                    } else if (rn === Profilename){
                        iconname = focused ? "person-circle-outline" : "person-circle-outline";
                    } else if (rn === Mapname){
                        iconname = focused ? "map" : "map-outline"
                    } 

                    return <Ionicons name={iconname} size={size} color={"#ff6700"}/>

                }
            })}>
            <Tab.Screen name={Profilename} component={ProfileScreen}/>
            <Tab.Screen name={homename} component={HomeScreen}/>
            <Tab.Screen name={Mapname} component={MapScreen}/>

            </Tab.Navigator>
        </NavigationContainer>

    )
}
