import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, StatusBar, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import PlantList from 'react-native-sandbox/components/PlantReminderList';
import Color from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import Api from 'react-native-sandbox/constants/api';

function HomePageContent(props) {

  const navigation = useNavigation();

  const path = 'http://192.168.86.34/plantapi/plant-images/';

  return (
    <View style={styles.container}>

      {/* Search */}
      <View style={styles.solidLine}></View>
      <Text style={{ ...styles.secondaryText, paddingVertical: 3 }}>Check Information for any of your plants.</Text>

      {/* Horizontal List */}
      <FlatList
        style={{ flexGrow: 0 }}
        horizontal
        keyExtractor = {(item)=> item.id}
        showsHorizontalScrollIndicator={false}
        data={props.data}
        renderItem={(element) => {
          
          return (<TouchableOpacity onPress={()=>{
            navigation.navigate("ViewEntry",{data:element.item})
          }}><Image style={{ height: 100, width: 100, borderRadius: 10, marginRight: 5, resizeMode:'contain' }} source={{ uri: `${Api.path}/plant-images/${element.item.image}`}} /></TouchableOpacity>);
        }} />

      {/* Search */}
      {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10, paddingRight: 5 }}>
        <TextInput style={{ marginRight: 5 }} placeholder="Or click here to search for a specific plant" />
        <Icon style={{ textAlignVertical: 'center' }} name="search-outline" size={20} />
      </View> */}

      <View style={{...styles.solidLine, marginTop:10}}></View>
      
      {/* Reminders */}
      <Text style={{ ...styles.secondaryText, paddingVertical: 8 }}>You have upcoming reminders for the following plants...</Text>
      <View style={styles.dashedLine}></View>

      {/* Vertical List */}
      <PlantList data={props.data}/>

    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    position: 'relative', backgroundColor: Color.background, paddingTop: 10, paddingHorizontal: 5, flex:1
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

export default HomePageContent;


