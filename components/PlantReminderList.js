import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, {useState,useContext, useEffect} from 'react';
import PlantReminderCard from '../components/PlantReminderCard';
import Modal from '../components/modal/CustomModal';
import {AppContext} from '../context/app-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../constants/api';

function PlantReminderList(props) {

    console.log(props);

    const{homeModal} = React.useContext(AppContext);
    const{plantArray} = React.useContext(AppContext);

    const[plants,setPlants] = plantArray;

    const[modalVisibleHome,setModalVisibleHome] = homeModal;
    const[selectedEntry, setSelectedEntry] = useState({});

    const{userCookie} = React.useContext(AppContext);
    const [userData, setUserData] = userCookie;
   
    function launchModal(obj){
        setModalVisibleHome(true);
        setSelectedEntry({...obj});
        // console.log(obj);
    }

    function cancelModal(){
        setModalVisibleHome(false);
    }

    function confirmModal(){
        console.log("Item deleted.");
        console.log(selectedEntry);
        setModalVisibleHome(false);
        confirmEntry();
    }

    function confirmEntry(){

        let formData = new FormData();
               
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate()+parseInt(selectedEntry.water));
        expireDate = `${expireDate.getFullYear()}-${expireDate.getMonth()+1}-${expireDate.getDate()}`;

        formData.append('id', selectedEntry.id);
        formData.append('expireDate',expireDate);

        fetch(`${Api.path}/updateCompletedTask.php`,{
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
            <Modal message="Mark Entry as Completed?" value={selectedEntry.nickname} visible={modalVisibleHome} onCancel={cancelModal} onConfirm={confirmModal} actionButton="Completed" />
            <FlatList
            contentContainerStyle={{paddingVertical:10}}
            data={props.data}
            keyExtractor = {(item)=> item.id}
            renderItem={(element)=>{
            return <PlantReminderCard data={element.item}  onLaunchModal={launchModal}/>
            }} />
        </View>

    );
}


export default PlantReminderList;
