import { setStatusBarBackgroundColor } from "expo-status-bar";
import * as React from "react";
import { View, Text, Pressable ,StyleSheet ,TextInput} from "react-native";

const styles = StyleSheet.create({
    buttonStyle: {
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
    backgroundColor: "#3f3f3f",
    marginTop: 7,
    },
    textBtnStyle:{
        textAlign:"center",
        color: "white",
        fontSize: 25,
        
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: '70%',
        marginTop: 10,
      },
    container:{
        justifyContent: "center",
        alignItems: "center",
    },
    buttonStyle2: {
        borderRadius: 8,
        padding: 6,
        height: 50,
        width: '70%',
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
        backgroundColor: "#3f3f3f"
        },
})

export default function ProfileScreen({navigation_bar}) {
    const [text, onChangeText] = React.useState();
    const [number, onChangeNumber] = React.useState('');

    return(
        <View>
            <View style={styles.container}>
                <TextInput
                style={styles.input}
                value={text}
                placeholder="Username"
                
            />
            <TextInput
                style={styles.input}
                value={text}
                placeholder="Password"
                
            />
            
            <Pressable style={styles.buttonStyle} onPress={()=>{console.log("ligma")}}>
                <Text style={styles.textBtnStyle}>Login</Text>
            </Pressable> 
            <Pressable style={styles.buttonStyle2} onPress={()=>{console.log("ligma")}}>
                <Text style={styles.textBtnStyle}>Sign Up</Text>
            </Pressable> 
            </View>    
         </View>
    );
}
