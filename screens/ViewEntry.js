import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Form, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import RoundButton from '../components/buttons/RoundButton';
import Color from 'react-native-sandbox/constants/colors';
import Api from '../constants/api';
import { AppContext } from '../context/app-context';

function ViewEntry({ navigation, route }) {
    
    const { data } = route.params;

    const path = `${Api.path}/plant-images/`;

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 30, backgroundColor: '#F6EFED' }}>

            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor={Color.lightGreen}
                />
                <Image style={{ position: 'absolute', top: 0, left: 0 }} source={{ uri: path + data.image }} />

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 10 }}>
                    <Image style={{ width: 150, height: 150, resizeMode: 'contain' }} source={{ uri: path + data.image }} />
                </View>

                <View style={{ zIndex: 100 }}>

                    {/* Plant Nickname */}
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <Text style={{ ...styles.hyperlink, paddingRight: 4 }}>Plant Nickname:</Text>
                        <Text style={styles.brownText}>{data.nickname}</Text>
                    </View>

                    {/* Plant Species */}
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={{ ...styles.hyperlink, paddingRight: 4 }}>Plant Species:</Text>
                        <Text style={styles.brownText}>{data.species}</Text>
                    </View>

                    {/* Plant Classification Section */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.hyperlink}>Plant Classification</Text>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {data.classification.map((element) => {
                                return <RoundButton key={element.id} data={element} />
                            })}
                        </View>
                    </View>


                    {/* Date Acquired Section */}
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={{ ...styles.hyperlink, paddingRight: 5 }}>Date Acquired:</Text>
                        <Text style={{ textAlignVertical: 'center' }}>{data.date_acquired}</Text>
                    </View>

                    {/* Reminders Section */}
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.hyperlink}>Reminders</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>This plant needs to be <Text style={{ fontWeight: 'bold', color: Color.darkBrown }}>watered</Text> every </Text><Text>{data.water} days</Text>
                        </View>

                    </View>

                    {/* Additional Notes */}
                    <Text style={styles.hyperlink}>Additional Notes</Text>
                    <TextInput
                        editable={false}
                        value={data.notes}
                        style={{
                            borderColor: '#A5DFB2', borderWidth: 1, backgroundColor: "white", borderRadius: 5,
                            paddingLeft: 10, paddingTop: 5, marginTop: 5, textAlignVertical: 'top', color: 'black'
                        }}
                        placeholderTextColor="black"
                        numberOfLines={10}
                        multiline
                    />

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: Color.lightGreen, flexDirection: 'row', borderRadius: 5, alignItems: 'center', width: 150, paddingVertical: 5, zIndex: 5 }}
                                onPress={()=>{
                                    if(route.name == "ViewEntrySearch")
                                        navigation.navigate("EditEntrySearch",{data:data});
                                    else
                                    navigation.navigate("EditEntry",{data:data});
                                }}
                            >
                                <Icon name='pencil' type="simple-line-icon" color="white" style={{ paddingLeft: 5 }} />
                                <Text style={{ color: 'white', paddingLeft: 10, fontSize: 16 }}>Modify Entry</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: Color.lightGreen, flexDirection: 'row', borderRadius: 5, alignItems: 'center', width: 150, zIndex: 5 }}
                                onPress={()=>{

                                    if(route.name == "ViewEntrySearch")
                                        navigation.navigate("Search");
                                    else
                                        navigation.navigate("Home");
                                }}
                            >
                                <Icon name='arrow-back-outline' type='ionicon' size={20} color="white" style={{ paddingLeft: 10 }} />
                                <Text style={{ paddingLeft: 10, color: 'white', fontSize: 16 }}>Go Back</Text>
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
        fontSize: 18
    },
    textContainer: {
        zIndex: 100
    },
    textInput: {
        borderColor: 'black', borderWidth: 1, backgroundColor: 'white', paddingVertical: 5, borderColor: '#A5DFB2',
        color: 'red', fontSize: 15, borderRadius: 5, marginBottom: 10, paddingLeft: 10
    },
    button: {
        backgroundColor: '#A5DFB2', color: 'white', textAlign: 'center', paddingVertical: 15, borderRadius: 10,
        fontSize: 25, marginBottom: 10
    }
});

export default ViewEntry;


