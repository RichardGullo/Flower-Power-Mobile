import { StatusBar } from 'expo-status-bar';
import React, {useState,useContext, useEffect} from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PlantSearchCard from '../components/PlantSearchCard';
import Modal from '../components/modal/CustomModal';
import {AppContext} from '../context/app-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../constants/api';


function PlantSearchList(props) {

    const{modal} = React.useContext(AppContext);
    const{plantArray} = React.useContext(AppContext);
    const{userCookie} = React.useContext(AppContext);

    const[plants,setPlants] = plantArray;

    const[modalVisible,setModalVisible] = modal;
    const[selectedEntry, setSelectedEntry] = useState({});

    const[userData, setUserData] = userCookie;

    
    function launchModal(obj){
        setModalVisible(true);
        setSelectedEntry({...obj});
        // console.log(obj);
    }

    function cancelModal(){
        setModalVisible(false);
    }

    function confirmModal(){
        console.log("Item deleted.");
        console.log(selectedEntry);
        setModalVisible(false);
        deleteEntry();
    }

    function deleteEntry(){

        let formData = new FormData();
        formData.append('id', selectedEntry.id);
        formData.append('image',selectedEntry.image);

        fetch(`${Api.path}/deleteEntry.php`,{
            method:"POST",
            body:formData
          }).then((res)=>{
              return res.text();
          }).then((res)=>{
              console.log(res);
              populateData();
          }).catch(err=>{
              console.log(err);
          });

          
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
            
            console.log(res);
            console.log("hello");
            setPlants(res);
    
            console.log(JSON.parse(res[0].classification));
        }).catch(err=>{
            console.log(err);
        });
    
      }

    return (
        <View style={{flex:1}}>
            <Modal message="Delete the following entry?" value={selectedEntry.nickname} visible={modalVisible} onCancel={cancelModal} onConfirm={confirmModal} actionButton="Delete" />
            <FlatList
            contentContainerStyle={{paddingVertical:10}}
            data={props.data}
            keyExtractor = {(item)=> item.id}
            renderItem={(element)=>{
            return <PlantSearchCard data ={element.item} onLaunchModal={launchModal} />
            }} />
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center', justifyContent: 'center', height: '100%', position: 'relative', backgroundColor: '#F6EFED', paddingHorizontal: 20
    },
    headerText: {
        fontSize: 48, textAlign: 'center', color: '#816868', fontWeight: 'bold'
    },
    secondaryText: {
        fontSize: 20, color: '#816868'
    },
    regularText: {
        fontSize: 15, color: 'black'
    },
    hyperlink: {
        color: '#358B59',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
    textContainer: {
        zIndex: 100
    },
    textInput: {
        borderColor: 'black', borderWidth: 1, backgroundColor: 'white', paddingVertical: 10, borderColor: '#A5DFB2',
        color: 'red', textAlign: 'center', fontSize: 18, borderRadius: 5, marginBottom: 10
    },
    button: {
        backgroundColor: '#A5DFB2', color: 'white', textAlign: 'center', paddingVertical: 15, borderRadius: 10,
        fontSize: 25, marginBottom: 10
    }
});

export default PlantSearchList;
