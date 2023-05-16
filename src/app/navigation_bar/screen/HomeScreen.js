import * as React from "react";
import { View, Text, Pressable ,StyleSheet ,TextInput,Image} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"

const styles = StyleSheet.create({
    buttonStyle: {
    borderRadius: 150,
    padding: 6,
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
    marginBottom: 10,
    
    },
    textBtnStyle:{
        textAlign:"center",
        color: "white",
        fontSize: 25,
    },
    container:{
        justifyContent: "center",
        alignItems: "center",
    },
    text1:{
        marginBottom:250,
        fontSize:25,
        color: "#3f3f3f",
        
    },
})
export default function HomeScreen({navigation_bar}) {
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            
            <Pressable style={styles.buttonStyle} onPress={()=>{console.log("navigate")}}>
                <Ionicons name={"navigate-circle"} size={300} color={"#3f3f3f"}/>
            </Pressable> 
            <Text style={styles.text1}>FIND BEST PARKING NOW!</Text>
        
         </View>   
    );
}

