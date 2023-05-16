import { setStatusBarBackgroundColor } from "expo-status-bar";
import React, {useState} from 'react';
import { View, Text, Pressable ,StyleSheet ,TextInput, Modal, } from "react-native";
import CheckBox from "expo-checkbox";




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
        backgroundColor: "#3f3f3f"
      },
      textStyle: {
        color: 'white',
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

export default function ProfileScreen({navigation_bar}) {
    const [text, onChangeText] = React.useState();
    const [number, onChangeNumber] = React.useState(S);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);
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
                            value={text}
                            placeholder="Username"
                            
                        />
                        <TextInput
                            style={styles.inputModal}
                            value={text}
                            placeholder="Password"
                            
                        />
                        <TextInput
                            style={styles.inputModal}
                            value={text}
                            placeholder="Email"
                            
                        />
                        <TextInput
                            style={styles.inputModal}
                            value={text}
                            placeholder="SPZ"
                            
                        />
                        <CheckBox
                          value={isSelected}
                          onValueChange={setSelection}
                          style={styles.checkbox}/>
                        </View>
                    
                        
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
         </View>
    );
}
