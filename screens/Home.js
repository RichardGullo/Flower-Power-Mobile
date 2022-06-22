import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, StatusBar, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '../constants/colors';
import HomePageContent from '../components/Home/HomePageContent';
import EmptyPlants from '../components/Home/EmptyPlants';
import {AppContext} from '../context/app-context';
import Api from '../constants/api';

function Home({ navigation }) {
  
  const{plantArray} = React.useContext(AppContext);
  const{userCookie} = React.useContext(AppContext);
  
  const[plants,setPlants] = plantArray;
  const [userData, setUserData] = userCookie;

  useEffect(() => {
    getData();
  }, []);

  useEffect(()=>{
    if(Object.keys(userData).length != 0)
      populateData();
      
  },[userData]);


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      const value2 = await AsyncStorage.getItem('email');
      if (value !== null) {
        setUserData({username:value, email:value2});
        console.log(value);
      } else
        navigation.navigate('Login');
    } catch (e) {
      console.log("Get Data Error");
    }
  }

  function populateData(){

    let formData = new FormData();
    formData.append('name',"Richard");
    formData.append('email', userData.email);

    fetch(`${Api.path}/populate.php`,{
      method:"POST",
      body:formData
    }).then((res)=>{
        return res.json();
    }).then((res)=>{

        for(let i = 0; i < res.length; i++)
          res[i].classification = JSON.parse(res[i].classification);
        
        setPlants(res);

    }).catch(err=>{
        console.log(err);
    });

  }

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={Color.lightGreen}
      />

      {/* Greeting */}
      <View style={{ flexDirection: 'row'}}>
        <View style={{ paddingRight: 5 }}>
          <Text style={styles.headerText}>Good afternoon, </Text>
          <Text style={styles.headerText}>{userData.username}</Text>
          <Text style={styles.secondaryText}>Ready for another day of gardening?</Text>
          <Text style={styles.secondaryText}>Let Flower Power lend you a hand!</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/flower-pot.png')} />
        </View>
      </View>

      {/* <Button title="Request" onPress={populateData} />
      <Button title="Plants" onPress={()=>{console.log(plants)}} />
      <Button title="New Entry" onPress={()=>navigation.navigate("NewEntry")} /> */}
      {/* HomePage Content */}
      {plants.length > 0 ? <HomePageContent data={plants} /> : <EmptyPlants />}


    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    position: 'relative', backgroundColor: Color.background, paddingHorizontal: 5, height:'100%'},
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

export default Home;


