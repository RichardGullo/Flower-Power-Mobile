import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Form, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import RoundButtonSmall from '../components/buttons/RoundButtonSmall';
import Color from '../constants/colors'
import Api from '../constants/api';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import {AppContext} from '../context/app-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

function NewEntry({ navigation }) {

    const{plantArray} = React.useContext(AppContext);
    const{userCookie} = React.useContext(AppContext);

    const[plants,setPlants] = plantArray;
    const[userData, setUserData] = userCookie;
    
  
    const [nickname, setNickname] = useState("");
    const [species, setSpecies] = useState("");
    const [water, setWater] = useState("");
    const [notes, setNotes] = useState("");

    // Image Picker 
    const [imageUri, setImageUri] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            base64:true,
        });

        console.log(result);

        if (!result.cancelled) {
            setImageUri(result.uri);
            setImageBase64(result.base64);
        }
    };

    // Date Picker
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true
        })
    };

    const showDatepicker = () => {
        showMode('date');
    };


    // Classification Buttons
    const [roundButtons, setRoundButtons] = useState([
        { id: 0, name: 'Algae', selected: false },
        { id: 1, name: 'Flower', selected: false },
        { id: 2, name: 'Fruit', selected: false },
        { id: 3, name: 'Grass', selected: false },
        { id: 4, name: 'Herb', selected: false },
        { id: 5, name: 'Moss', selected: false },
        { id: 6, name: 'Orchid', selected: false },
        { id: 7, name: 'Root', selected: false },
        { id: 8, name: 'Other', selected: false }

    ]);

    const [buttonSet, setButtonSet] = useState([]);


    function buttonSelect(obj) {

        // Make copy of our button list and button set
        let tempRoundButtons = [...roundButtons];
        let tempButtonSet = [...buttonSet];

        // Selected button is false
        if (!obj.selected) {

            if (tempButtonSet.length == 3) {
                let tempButton = tempButtonSet.pop();
                tempRoundButtons[tempButton.id].selected = false;
            }

            tempRoundButtons[obj.id].selected = true;
            tempButtonSet.push({ ...tempRoundButtons[obj.id] })
        }
        // Selected button is true
        else {
            tempRoundButtons[obj.id].selected = false;

            tempButtonSet = tempButtonSet.filter((element) => {
                if (element.id != obj.id)
                    return element;
            });
        }

        setRoundButtons(tempRoundButtons);
        setButtonSet(tempButtonSet);

    }

    function createEntry() {
        let formData = new FormData();
        let acquiredDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate()+parseInt(water));
        expireDate = `${expireDate.getFullYear()}-${expireDate.getMonth()+1}-${expireDate.getDate()}`;


        let json = JSON.stringify(buttonSet);
        console.log(json);

        formData.append('nickname',nickname);
        formData.append('species',species);
        formData.append('acquiredDate', acquiredDate);
        formData.append('expireDate',expireDate);
        formData.append('class', json);
        formData.append('notes', notes);
        formData.append('water', parseInt(water));
        formData.append('imageUri', imageUri);
        formData.append('imageBase64', imageBase64);
        formData.append('email', userData.email);

        fetch(`${Api.path}/addEntry.php`,{
        method:"POST",
        body:formData
      }).then((res)=>{
          return res.text();
      }).then((res)=>{
          console.log(res);
          populateData(userData);
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
            setNickname("");
            setSpecies("");
            setImageBase64(null);
            setImageUri(null);
            setNotes("");
            setWater("");
            setButtonSet([]);

            let tempButtons = [...roundButtons];

            for(let tempButton of tempButtons)
            {
                tempButton.selected = false;
            }

            setRoundButtons([...tempButtons]);

            navigation.navigate("Home");
        }).catch(err=>{
            console.log(err);
        });
    
      }
    

    // Date Helper Output
    let dateOutput = date.toLocaleDateString();

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 30, backgroundColor: '#F6EFED' }}>

            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor={Color.lightGreen}
                />
                <Image style={{ position: 'absolute', top: 0, left: 0 }} source={require('../assets/top-background.png')} />

                {/* Image Picker */}
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                    <TouchableOpacity onPress={pickImage}>
                        {imageUri ? <Image source={{ uri: 'data:image/jpeg;base64,'+ imageBase64 }} style={{ width: 200, height: 200, resizeMode: 'contain' }} /> : <View style={{ height: 250, width: 250, borderWidth: 2, borderColor: Color.brown, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 50, height: 50, marginBottom: 5 }} source={require('../assets/image-block.png')} />
                            <Text style={styles.brownText}>Click this panel to upload</Text>
                            <Text style={styles.brownText}>an image of your plant.</Text>
                        </View>}
                    </TouchableOpacity>
                </View>

                {/* Nickname and Species TextInputs */}
                <View style={{ zIndex: 100 }}>

                    <Text style={styles.secondaryText}>Plant Nickname</Text>
                    <TextInput
                        placeholder="Plant nickname"
                        style={{ ...styles.textInput }}
                        placeholderTextColor='black'
                        value={nickname}
                        onChangeText={(newText) => setNickname(newText)}
                    />

                    <Text style={styles.secondaryText}>Plant Species</Text>
                    <TextInput
                        placeholder="Plant species"
                        style={{ ...styles.textInput }}
                        placeholderTextColor='black'
                        value={species}
                        onChangeText={(newText) => setSpecies(newText)}
                    />

                    {/* Plant Classification */}
                    <Text style={styles.secondaryText}>Plant Classification (Select up to 3)</Text>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <RoundButtonSmall data={roundButtons[0]} onSelected={buttonSelect} />
                        <RoundButtonSmall data={roundButtons[1]} onSelected={buttonSelect} />
                        <RoundButtonSmall data={roundButtons[2]} onSelected={buttonSelect} />
                        <RoundButtonSmall data={roundButtons[3]} onSelected={buttonSelect} />
                        <RoundButtonSmall data={roundButtons[4]} onSelected={buttonSelect} />
                        <RoundButtonSmall data={roundButtons[5]} onSelected={buttonSelect} />
                        <RoundButtonSmall data={roundButtons[6]} onSelected={buttonSelect} />
                        <RoundButtonSmall data={roundButtons[7]} onSelected={buttonSelect} />
                        <RoundButtonSmall data={roundButtons[8]} onSelected={buttonSelect} />
                    </View>

                    {/* Date Acquired */}
                    <Text style={{ ...styles.secondaryText, marginVertical: 10 }}>Date Acquired</Text>

                    <TouchableOpacity onPress={showDatepicker}>
                        <Text style={styles.hyperlink}>Click here to select date.</Text>
                    </TouchableOpacity>
                    <Text>{dateOutput}</Text>

                    {/* Reminders */}
                    <Text style={styles.secondaryText}>Reminders</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>This plant needs to be <Text style={{ fontWeight: 'bold' }}>watered</Text> every </Text>
                        <TextInput
                            placeholder="##"
                            style={{ borderColor: Color.lightGreen, borderWidth: 2, borderRadius: 5, backgroundColor: 'white', paddingLeft: 10, marginHorizontal: 5 }}
                            value={water}
                            onChangeText={(newText) => setWater(newText)}
                        />
                        <Text>days</Text>
                    </View>


                    {/* Additional Notes */}
                    <Text style={styles.secondaryText}>Additional Notes</Text>
                    <TextInput
                        placeholder="Write any additional notes you'd like to keep about your plant here."
                        style={{
                            borderColor: Color.lightGreen, borderWidth: 1, backgroundColor: "white", borderRadius: 5,
                            paddingLeft: 10, paddingTop: 5, marginTop: 5, textAlignVertical: 'top'
                        }}
                        placeholderTextColor="black"
                        numberOfLines={10}
                        multiline
                        value={notes}
                        onChangeText={(newText) => setNotes(newText)}
                    />

                    {/* Entry and Cancel Buttons */}
                    <View style={{zIndex:150}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, zIndex:100 }}>
                            <TouchableOpacity
                                onPress={createEntry}
                                style={{ backgroundColor: Color.lightGreen, flexDirection: 'row', borderRadius: 5, alignItems: 'center', width: 150, paddingVertical: 5, zIndex: 5 }}
                            >
                                <Icon name='pencil' type="simple-line-icon" color="white" style={{ paddingLeft: 5 }} />
                                <Text style={{ color: 'white', paddingLeft: 10, fontSize: 16 }}>Create Entry</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: Color.lightGreen, flexDirection: 'row', borderRadius: 5, alignItems: 'center', width: 150, zIndex: 5 }}
                                onPress={()=>navigation.goBack()}
                            >
                                <Icon name='md-close' type='ionicon' color="white" style={{ paddingLeft: 10 }} />
                                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%', position: 'relative', backgroundColor: Color.background, paddingHorizontal: 20
    },
    headerText: {
        fontSize: 48, textAlign: 'center', color: Color.brown, fontWeight: 'bold'
    },
    secondaryText: {
        fontSize: 20, color: Color.brown
    },
    regularText: {
        fontSize: 15, color: Color.primary
    },
    brownText: {
        fontSize: 15, color: Color.brown
    },
    hyperlink: {
        color: Color.darkGreen,
        textDecorationLine: 'underline',
    },
    textContainer: {
        zIndex: 100
    },
    textInput: {
        borderWidth: 1, backgroundColor: 'white', paddingVertical: 5, borderColor: Color.lightGreen,
        color: 'red', fontSize: 15, borderRadius: 5, marginBottom: 10, paddingLeft: 10
    },
    button: {
        backgroundColor: Color.lightGreen, color: 'white', textAlign: 'center', paddingVertical: 15, borderRadius: 10,
        fontSize: 25, marginBottom: 10
    }
});

export default NewEntry;


