import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, StatusBar, FlatList, TextInput} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import PlantSearchList from '../components/PlantSearchList';
import BrownButton from '../components/buttons/BrownButton';
import Color from 'react-native-sandbox/constants/colors';
import {AppContext} from '../context/app-context';

function Search({ navigation }) {

    const{plantArray} = React.useContext(AppContext);

    const[plants,setPlants] = plantArray;
    const[filteredPlants, setFilteredPlants] = useState([]);
    const[term, setTerm] = useState("");


    // Function used to sort plant list
    function sortPlants(searchType){
        if(searchType == "Date")
            searchType='date_acquired';

        let tempArray = filteredPlants.length > 0 ? [...filteredPlants] : [...plants];

        tempArray = tempArray.sort((a,b) =>{
            if(a[searchType] > b[searchType])
                return 1;
            else
                return -1;
        });

        if(filteredPlants.length > 0)
            setFilteredPlants(tempArray);
        else
            setPlants(tempArray);
    }



    // Change buttons to sortingButtons
    const[buttons, setButtons] = useState([
        {id:0, name:'Nickname', selected:true},
        {id:1, name:'Species', selected:false},
        {id:2, name:'Classification', selected:false},
        {id:3, name:'Date', selected:false}
    ]);

    const[prevButton, setPrevButton] = useState(0);

    // Function used to toggle between sorting buttons
    function selectedButton(obj)
    {
        let tempButtons = [...buttons];
        tempButtons[prevButton].selected = false;
        tempButtons[obj.id].selected = true;

        setButtons(tempButtons);
        setPrevButton(obj.id);
        
        let sortTerm = obj.name.toLowerCase();

        sortPlants(sortTerm);
    }

    function searchPlants(){
        let filteredArray = [];

        for(let plant of plants){
            let nickname = plant.nickname.toLowerCase();

            if(nickname.includes(term.toLowerCase()))
                filteredArray.push(plant);
        }

        setFilteredPlants(filteredArray);
    }

    useEffect(()=>{
      
        searchPlants();
    },[term])


    useEffect(()=>{
        setFilteredPlants([]);
        setTerm("");
    },[plants])

    

    const plantData = filteredPlants.length > 0 && term.length > 0 ? filteredPlants : plants;

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={Color.lightGreen}
            />

            {/* Header */}
            <Text style={styles.secondaryText}>
                Enter a phrase below to search through your saved plants. Plants with a nickname or species
                matching the search criteria will be shown.
            </Text>

            <TextInput placeholder="Search Criteria" style={styles.textInput} onChangeText={newTerm => setTerm(newTerm)} value={term} />

            {/* Sorting Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                <Text style={styles.brownText}>Search results by: </Text>
                <View style={{ flexDirection: 'row' }}>
                    <BrownButton data={buttons[0]} onSelect={selectedButton}>Nickname</BrownButton>
                    <BrownButton data={buttons[1]} onSelect={selectedButton}>Species</BrownButton>
                    <BrownButton data={buttons[2]} onSelect={selectedButton}>Classification</BrownButton>
                    <BrownButton data={buttons[3]} onSelect={selectedButton}>Date</BrownButton>
                </View>
            </View>

            {term.length > 0 && <Text style={{ ...styles.secondaryText, marginVertical: 10, fontSize:18 }}>Showing search results for "{term}"</Text>}

            <View style={{...styles.dashedLine, marginTop:10}}></View>

            {/* Plant List */}
            <PlantSearchList data={plantData} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative', backgroundColor: Color.background, paddingTop: 20, paddingHorizontal: 5, height: '100%'
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
        color: 'red', fontSize: 15, borderRadius: 5, paddingLeft: 10, marginVertical: 10
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

export default Search;


