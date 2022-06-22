import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./navigation/StackNavigator"
import {BottomTabNavigator} from './navigation/BottomTabNavigator';
import Login from './screens/Login';
import Home from './screens/Home';
import NewEntry from './screens/NewEntry';
import ViewEntry from './screens/ViewEntry';
import Search from './screens/Search';
import { AppContextProvider } from './context/app-context';
import LoginStackNavigator from './navigation/LoginStackNavigator';
import Register from './screens/Register';


function App() {

  return (
    <NavigationContainer>
      <AppContextProvider>
        <LoginStackNavigator />
      </AppContextProvider>
    </NavigationContainer>


  );
}

export default App;


