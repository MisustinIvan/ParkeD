import * as React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"
import logo from "C:\Users\petrv\Downloads\ParkeD-svg.svg"

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
            initialRouteName={homename}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconname;
                    let rn = route.name;

                    if (rn === homename){
                        iconname = focused ? "home" : "home-outline"
                    }

                    return <Ionicons name={iconname} size={size} color={color}/>

                }
            })}>

            <Tab.Screen name={homename} component={HomeScreen}/>

            </Tab.Navigator>
        </NavigationContainer>

    )
}