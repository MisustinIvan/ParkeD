import { setStatusBarBackgroundColor } from "expo-status-bar";
import axios from 'axios';
import React, {useState} from 'react';
import { View, Text, Pressable ,StyleSheet ,TextInput, Modal, } from "react-native";
import CheckBox from "expo-checkbox";

import { atom, useAtom } from "jotai";
import { loggedInAtom, userIdAtom } from "../../App"



const styles = StyleSheet.create({
    buttonStyle: {
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
    backgroundColor: "#ff6700",
    marginTop: 7,
    },
    textBtnStyle:{
        textAlign:"center",
        color: "#3f3f3f",
        fontSize: 25,
        
    },

    infoText: {
        fontSize: 15,
        paddingBottom: 20,
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
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
        backgroundColor: "#ff6700"
        },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
     
      buttonClose: {
        borderRadius: 8,
        padding: 6,
        height: 50,
        width: '70%',
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
        backgroundColor: "#ff6700"
      },
      textStyle: {
        color: "#3f3f3f",
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      inputModal:{
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: 200,
        marginTop: 10,
      }
})




const SignUp = (email, username, password, spz, isdisabled) => {
    console.log(email)
    console.log(username)
    console.log(password)
    console.log(spz)
    console.log(isdisabled)
}

const Login = (email, password, navigation, userId, loggedIn, setUserId, setLoggedIn) => {


    const getUserIdUrl = 'http://f486-84-19-71-121.ngrok-free.app/get_user_id';

    data = "email=" + email

    axios.post(getUserIdUrl, data)
      .then(response => {
        setUserId(prev_value => response.data )
      })
      .catch(error => {
        console.error(error);
      });

    const LoginUrl = 'http://f486-84-19-71-121.ngrok-free.app/login_user';
    data = "email=" + email + "&" + "password=" + password

    axios.post(LoginUrl, data)
        .then(response => {
            console.log(response.data)
            setLoggedIn(prev_value => true)
        })
        .catch(error => {
          console.error(error);
        });
    navigation.navigate("Home")
};

export default function ProfileScreen({navigation}) {
    const [email, changeEmail] = React.useState("");
    const [name, changeName] = React.useState("");
    const [spz, changeSPZ] = React.useState("");
    const [password, changePassword] = React.useState("");
    const [isDisabled, changeDisabled] = React.useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    const [userId, setUserId] = useAtom(userIdAtom);
    const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);

    React.useEffect(() => {
    }, [email, name, spz, password, isDisabled] )

    return(
        <View>
            <View style={styles.container}>
                <TextInput
                style={styles.input}
                value={email}
                onChangeText={newText => changeEmail(newText)}
                placeholder="email"
            />

            <TextInput
                style={styles.input}
                value={password}
                onChangeText={newText => changePassword(newText)}
                placeholder="Password"
            />
            
        
            <Pressable style={styles.buttonStyle} onPress={()=>{Login(email, password, navigation, userId, loggedIn, setUserId, setLoggedIn)}}>
                <Text style={styles.textBtnStyle}>Login</Text>
            </Pressable> 
            <Pressable style={styles.buttonStyle2} onPress={()=>{setModalVisible(true)}}>
                <Text style={styles.textBtnStyle}>Sign Up</Text>
            </Pressable> 
            </View>    
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.container}>
                            <TextInput
                            style={styles.inputModal}
                            value={name}
                            onChangeText={newText => changeName(newText)}
                            placeholder="Name"
                            
                        />
                        <TextInput
                            style={styles.inputModal}
                            value={password}
                            onChangeText={newText => changePassword(newText)}
                            placeholder="Password"
                            
                        />
                        <TextInput
                            style={styles.inputModal}
                            value={email}
                            onChangeText={newText => changeEmail(newText)}
                            placeholder="Email"
                            
                        />
                        <TextInput
                            style={styles.inputModal}
                            value={spz}
                            onChangeText={newText => changeSPZ(newText)}
                            placeholder="SPZ"
                            
                        />
                        <Text style={styles.infoText}>Are you disabled?</Text>
                        <CheckBox
                            value={isDisabled}
                            onValueChange={changeDisabled}
                            style={styles.checkbox}/>
                        </View>
                    
                        
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={()=>{SignUp(email, name, password, spz, isDisabled)}}>
                        <Text style={styles.textStyle}>Sign Up</Text>
                        </Pressable>


                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={()=>{setModalVisible(!modalVisible)}}>
                        <Text style={styles.textStyle}>Back</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
         </View>
    );
}
