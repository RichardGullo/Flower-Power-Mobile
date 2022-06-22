import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '../constants/colors';
import HomePageContent from '../components/Home/HomePageContent';
import EmptyPlants from '../components/Home/EmptyPlants';
import { AppContext } from '../context/app-context';


function Account({ navigation }) {

  const{userCookie} = React.useContext(AppContext);
  const [userData, setUserData] = userCookie;

  const{plantArray} = React.useContext(AppContext);

  const[plants,setPlants] = plantArray;

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      setUserData({});
      setPlants([]);
      navigation.navigate("Login");
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }

  return (
    <View>
      <Text>Account Screen</Text>
      <TouchableOpacity onPress={()=> clearAll()}>
        <Text style={styles.hyperlink}>Log out</Text>
      </TouchableOpacity>

    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative', backgroundColor: Color.background, paddingHorizontal: 5, height: '100%'
  },
  headerText: {
    fontSize: 30, color: Color.brown, fontWeight: 'bold'
  },
  secondaryText: {
    fontSize: 20, color: Color.brown
  },
  regularText: {
    fontSize: 15, color: Color.primary
  },
  hyperlink: {
    color: Color.darkGreen,
    textDecorationLine: 'underline',
  },
  textContainer: {
    zIndex: 100
  },
  textInput: {
    borderWidth: 1, backgroundColor: 'white', paddingVertical: 10, borderColor: '#A5DFB2',
    color: 'red', textAlign: 'center', fontSize: 18, borderRadius: 5, marginBottom: 10
  },
  button: {
    backgroundColor: Color.lightGreen, color: 'white', textAlign: 'center', paddingVertical: 15, borderRadius: 10,
    fontSize: 25, marginBottom: 10
  },
  solidLine: {
    borderColor: Color.brown, borderBottomWidth: 2, marginTop: 5
  },
  dashedLine: {
    borderColor: Color.brown, borderStyle: 'dashed', borderBottomWidth: 2
  }
});



export default Account;


