import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStackNavigator from "./StackNavigator";
import SearchStackNavigator from "./SearchStackNavigator";
import {Icon} from 'react-native-elements';
import Search from '../screens/Search';
import Color from '../constants/colors';
import NewEntry from "../screens/NewEntry";
import Account from "../screens/Account";


const Tab = createBottomTabNavigator();

function BottomTabNavigator({navigation}) {
  return (
    <Tab.Navigator
      screenOptions = {({route}) => ({
        tabBarIcon: ({focused, color, size}) =>{
          
          if(route.name === 'HomeTab'){

            return <Icon name = 'home' type = 'font-awesome' size = {size} color = {color}/>
          }
          else if(route.name === 'SearchTab')
          {
            return <Icon name = "search" type = 'ionicons' size = {size} color = {color}/>
          }
          else if(route.name === 'NewEntry'){
            return <Icon name="flower" type="material-community" size={size} color={color} />
          }
          else if(route.name === "Account"){
            return <Icon name="list" type="ionicons" size={size} color={color} />
          }
        },
        headerShown:false,
        tabBarActiveTintColor:Color.darkGreen,
        tabBarInactiveTintColor:Color.white,
        tabBarStyle:{
          backgroundColor:Color.lightGreen
        }
      })}    
    >
      <Tab.Screen name="HomeTab" component={MainStackNavigator} />
      <Tab.Screen name="NewEntry" component={NewEntry} />
      <Tab.Screen name="SearchTab" component={SearchStackNavigator} />
      <Tab.Screen name = "Account" component = {Account}
        listeners = {{
          tabPress:e=>{
              e.preventDefault();
              navigation.openDrawer();
          }
        }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;



