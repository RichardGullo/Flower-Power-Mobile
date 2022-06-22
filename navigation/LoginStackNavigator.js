import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import ViewEntry from "../screens/ViewEntry";
import Search from "../screens/Search";
import EditEntry from "../screens/EditEntry";
import NewEntry from "../screens/NewEntry";
import BottomTabNavigator from "./BottomTabNavigator";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

function LoginStackNavigator() {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
      </Stack.Navigator>
    )
  }


export default LoginStackNavigator;







