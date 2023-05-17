import * as React from "react";
import { View, Text, Pressable ,StyleSheet ,TextInput, Linking} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import BetterImage from 'react-native-better-image';

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
        maxHeight:500,
    },
    text1:{
        marginBottom:250,
        fontSize:25,
        color: "#3f3f3f",
        
    },
})
const style = {
    width: 350,
    height: 132,
    borderRadius: 9,
    resizeMode: 'contain',
    marginTop: 50,
  };

const NavigateToPlace = () => {
    const url = 'https://goo.gl/maps/RVSNJdB3dJmfjbP28'; // Replace with your desired URL
    Linking.openURL(url)
      .catch(err => console.error('Failed to open URL:', err));
};

export default function HomeScreen({navigation_bar}) {
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", marginTop : 180}}>
            <View style={styles.container}>
                <BetterImage  source={{uri:"https://i.ibb.co/6ZCjKL6/logo-removebg-preview.png"}} viewStyle={style}/>
            </View>
            
            <Pressable style={styles.buttonStyle} onPress={NavigateToPlace}>
                <Ionicons name={"navigate-circle"} size={300} color={"#3f3f3f"}/>
            </Pressable> 
            <Text style={styles.text1}></Text>
        
         </View>   
    );
}

