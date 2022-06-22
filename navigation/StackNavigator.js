import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import ViewEntry from "../screens/ViewEntry";
import Search from "../screens/Search";
import EditEntry from "../screens/EditEntry";
import NewEntry from "../screens/NewEntry";

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ViewEntry" component={ViewEntry} />
      <Stack.Screen name="EditEntry" component={EditEntry} />
    </Stack.Navigator>
  )
}



export default MainStackNavigator;





