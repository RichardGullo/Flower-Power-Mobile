import React from "react";
import { createDrawerNavigator} from "@react-navigation/drawer";
import { ContactStackNavigator } from "./StackNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

function DrawerNavigator() 
{
  return (
    <Drawer.Navigator
    drawerContent = {props => {
      return (<DrawerContent {...props} />)
    }} 
    screenOptions={{
        headerShown:false,
        drawerPosition:'right',
        drawerStyle:{backgroundColor:'#4CB97A'},
        swipeEnabled:false
    }}
    >
      <Drawer.Screen name="HomeDrawer" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;


