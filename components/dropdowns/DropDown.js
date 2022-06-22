import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Button, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { AppContext } from 'react-native-sandbox/context/app-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from 'react-native-sandbox/constants/api.js';
import Color from 'react-native-sandbox/constants/colors.js';



function PasswordDropdown() {
    const [flag, setFlag] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const{userCookie} = React.useContext(AppContext);
    const [userData, setUserData] = userCookie;
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    return (
        <View style={{ backgroundColor: '#4CB97A', marginTop: 20 }}>
            <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'white' }}>
                <TouchableOpacity onPress={() => {
                    if (flag)
                        setFlag(false)
                    else
                        setFlag(true);
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='pencil' type="evilicon" size={20} color="white" />
                            <Text style={{ color: 'white' }}>Change Password</Text>
                        </View>
                        {!flag ?
                            <View style={{ paddingRight: 10 }}><Icon name='angle-down' type='font-awesome' color="white" /></View> :
                            <View style={{ paddingRight: 10 }}><Icon name='angle-up' type='font-awesome' color="white" /></View>
                        }
                    </View>
                </TouchableOpacity>
            </View>
            {flag == true &&
                <View>
                    {error.length > 0 && <Text style={{color:'red'}}>{error}</Text>}
                    {success.length > 0 && <Text style={{color:Color.white}}>{success}</Text>}
                    <TextInput
                        placeholder="Current Password"
                        style={{ borderColor: 'black', borderWidth: 1, backgroundColor: "#80cda1", borderRadius: 5, paddingLeft: 10, marginTop: 10, borderColor: 'white' }}
                        placeholderTextColor="white"
                        onChangeText={(newText) => setCurrentPassword(newText)}
                    />
                    <TextInput
                        placeholder="New Password"
                        style={{ borderColor: 'black', borderWidth: 1, backgroundColor: "#80cda1", borderRadius: 5, paddingLeft: 10, marginTop: 10, borderColor: 'white' }}
                        placeholderTextColor="white"
                        onChangeText={(newText) => setNewPassword(newText)}
                        secureTextEntry={true}

                    />
                    <TextInput
                        placeholder="Confirm new password"
                        style={{ borderColor: 'black', borderWidth: 1, backgroundColor: "#80cda1", borderRadius: 5, paddingLeft: 10, marginVertical: 10, borderColor: 'white' }}
                        placeholderTextColor="white"
                        onChangeText={(newText) => setConfirmPassword(newText)}
                        secureTextEntry={true}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 5, alignItems: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() =>{ changePassword()}}>
                            <Icon name='check' type="entypo" color="white" />
                            <Text style={{ color: 'white' }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>

    )

    function changePassword(){
        setError("");
        setSuccess("");

        if(newPassword != confirmPassword)
        {
            setError("Error: Password fields don't match.");
            return;
        }

        let formData = new FormData();
        formData.append('oldPass',currentPassword);
        formData.append('newPass', newPassword);
        formData.append('email', userData.email);

        fetch(`${Api.path}/changePassword.php`,{
            method:"POST",
            body:formData
          }).then((res)=>{
              return res.json();
          }).then((res)=>{
            
            if(res.error != ""){
                setError("Error: " + res.error);
                return;
            }

            
            setSuccess("Success: " + res.success);
            


          }).catch(err=>{
              console.log(err);
          });
    }

}

function EmailDropdown() {
    const [flag, setFlag] = useState(false);


    return (
        <View style={{ backgroundColor: '#4CB97A', marginTop: 20 }}>
            <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'white' }}>
                <TouchableOpacity onPress={() => {
                    if (flag)
                        setFlag(false)
                    else
                        setFlag(true);
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='pencil' type="evilicon" size={20} color="white" />
                            <Text style={{ color: 'white' }}>Change E-mail Address</Text>
                        </View>
                        {!flag ?
                            <View style={{ paddingRight: 10 }}><Icon name='angle-down' type='font-awesome' color="white" /></View> :
                            <View style={{ paddingRight: 10 }}><Icon name='angle-up' type='font-awesome' color="white" /></View>
                        }
                    </View>
                </TouchableOpacity>
            </View>
            {flag == true &&
                <View>
                    <TextInput
                        placeholder="Current e-mail address"
                        style={{ borderColor: 'black', borderWidth: 1, backgroundColor: "#80cda1", borderRadius: 5, paddingLeft: 10, marginTop: 10, borderColor: 'white' }}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        placeholder="New e-mail address"
                        style={{ borderColor: 'black', borderWidth: 1, backgroundColor: "#80cda1", borderRadius: 5, paddingLeft: 10, marginTop: 10, borderColor: 'white' }}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        placeholder="Confirm new e-mail address"
                        style={{ borderColor: 'black', borderWidth: 1, backgroundColor: "#80cda1", borderRadius: 5, paddingLeft: 10, marginTop: 10, borderColor: 'white' }}
                        placeholderTextColor="white"

                    />
                    <TextInput
                        placeholder="Confirm new password"
                        style={{ borderColor: 'black', borderWidth: 1, backgroundColor: "#80cda1", borderRadius: 5, paddingLeft: 10, marginVertical: 10, borderColor: 'white' }}
                        placeholderTextColor="white"
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 5, alignItems: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => alert("Email changed")}>
                            <Icon name='check' type="entypo" color="white" />
                            <Text style={{ color: 'white' }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            }
        </View>
    )
}

function ProblemDropDown() {
    const [flag, setFlag] = useState(false);

    return (
        <View style={{ backgroundColor: '#4CB97A', marginTop: 20 }}>
            <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'white' }}>
                <TouchableOpacity onPress={() => {
                    if (flag)
                        setFlag(false)
                    else
                        setFlag(true);
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='report' type="octicon" color="white" size={15} />
                            <Text style={{ color: 'white', paddingLeft: 5 }}>Report a Problem</Text>
                        </View>
                        {!flag ?
                            <View style={{ paddingRight: 10 }}><Icon name='angle-down' type='font-awesome' color="white" /></View> :
                            <View style={{ paddingRight: 10 }}><Icon name='angle-up' type='font-awesome' color="white" /></View>
                        }
                    </View>
                </TouchableOpacity>
            </View>
            {flag == true &&
                <View>
                    <TextInput
                        placeholder="Please describe your problem below. Limited to 256 characters."
                        style={{ borderColor: 'black', borderWidth: 1, backgroundColor: "#80cda1", borderRadius: 5, paddingLeft: 10, marginTop: 10, borderColor: 'white', textAlignVertical: 'top' }}
                        placeholderTextColor="white"
                        numberOfLines={10}
                        multiline
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 5, alignItems: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => alert("Problem reported")}>
                            <Icon name='check' type="entypo" color="white" />
                            <Text style={{ color: 'white' }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            }
        </View>
    )
}

function AboutDropdown() {
    const [flag, setFlag] = useState(false);

    return (
        <View style={{ backgroundColor: '#4CB97A', marginTop: 20 }}>
            <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'white' }}>
                <TouchableOpacity onPress={() => {
                    if (flag)
                        setFlag(false)
                    else
                        setFlag(true);
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='info' type="feather" color="white" size={15} />
                            <Text style={{ color: 'white', paddingLeft: 5 }}>About</Text>
                        </View>
                        {!flag ?
                            <View style={{ paddingRight: 10 }}><Icon name='angle-down' type='font-awesome' color="white" /></View> :
                            <View style={{ paddingRight: 10 }}><Icon name='angle-up' type='font-awesome' color="white" /></View>
                        }
                    </View>
                </TouchableOpacity>
            </View>
            {flag == true &&
                <View style={{ flexWrap: 'wrap', alignItems: 'flex-start', height: 150 }}>
                    <Text style={{ color: 'white' }}>App coded by Richard Gullo</Text>
                    <Text style={{ color: 'white' }}>App designed by Michaela Green</Text>
                    <Text style={{ color: 'white' }}>Icons: Material Icons (Rounded)</Text>
                </View>
            }
        </View>
    )
}

function Logout({ navigation }) {

    const { userCookie } = React.useContext(AppContext);
    const [userData, setUserData] = userCookie;
    const{plantArray} = React.useContext(AppContext);

    const[plants,setPlants] = plantArray;

    const clearAll = async () => {
        try {
            await AsyncStorage.clear();
            setUserData({});
            setPlants([]);
            navigation.navigate("Login");
        } catch (e) {
            // clear error
            console.log("error with clearing");
        }

    }

    return (
        <View style={{ backgroundColor: '#4CB97A', marginTop: 20 }}>
            <View style={{ borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'white' }}>
                <TouchableOpacity onPress={() => {
                    clearAll();
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='pencil' type="evilicon" size={20} color="white" />
                            <Text style={{ color: 'white' }}>Log out</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export { PasswordDropdown, EmailDropdown, ProblemDropDown, AboutDropdown, Logout }