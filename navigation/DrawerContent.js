import React, {useState,useContext} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import { TextInput } from "react-native-gesture-handler";
import {PasswordDropdown,EmailDropdown, ProblemDropDown,AboutDropdown, Logout} from '../components/dropdowns/DropDown'
import {Icon} from 'react-native-elements'
import {AppContext} from '../context/app-context';

function DrawerContent(props)
{
    const{userCookie} = React.useContext(AppContext);
    const[userData, setUserData] = userCookie;

    return(
    
        <ScrollView contentContainerStyle = {{flexGrow:1}}>
            <View style = {{flex:1, backgroundColor:'#4CB97A', paddingTop:20, paddingLeft:5}}>
                <View>

                <View style = {{flexDirection:'row',borderBottomWidth:1, borderColor:'white', alignItems:'center'}}>
                    <Icon name ='md-menu' type = 'ionicon' color = 'white'/>  
                    <Text style = {{color:'white',paddingLeft:10}}>Account Information</Text>
                </View>
                <View style = {{height:70, justifyContent:'space-between'}}>
                    <View style = {{flexDirection:'row'}}>
                        <Text style = {{color:'white'}}>You are currently logged in as {userData.username} <Icon name ='user' type = 'evilicon' color = 'white' /> </Text>
                        
                    </View>

                    <View style = {{flexDirection:'row'}}>
                        <Text style = {{color:'white'}}>Not you? Log out.</Text>
                        <Icon name = 'logout' type = "material-community" color = 'white' />
                    </View>
                </View>

                </View>
                <PasswordDropdown />
                {/* <EmailDropdown /> */}
                <ProblemDropDown />
                <AboutDropdown />
                <Logout {...props}/>
                <View style = {{flex:1, justifyContent:'flex-end', alignItems:'flex-end'}}>
                <View style = {{height:200,width:'100%',justifyContent:'flex-end',alignItems:'flex-end',flexDirection:'row'}}>
                    <TouchableOpacity onPress = {()=>props.navigation.closeDrawer()}>
                        <View style = {{flexDirection:'row'}}>
                            <Icon name ='md-close' type = 'ionicon' color = 'white' size = {20}/>  
                            <Text style = {{color:'white', paddingLeft:5}}>Close</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default DrawerContent;

