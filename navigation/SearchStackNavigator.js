import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ViewEntry from "../screens/ViewEntry";
import Search from "../screens/Search";
import EditEntry from '../screens/EditEntry';


const Stack = createStackNavigator();

function SearchStackNavigator() {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ViewEntrySearch" component={ViewEntry} />
        <Stack.Screen name="EditEntrySearch" component={EditEntry} />
      </Stack.Navigator>
    )
  }


export default SearchStackNavigator;







