import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, StatusBar, TextInput } from 'react-native'
import Color from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
function EmptyPlants() {

    const navigation = useNavigation();

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Image style={{ width: 100, height: 100 }} source={require('../../assets/emptyPlant.png')} />
            <Text style={{ fontSize: 20, color: Color.brown }}>You are currently not watching any plants.</Text>
            <Text style={{ fontSize: 20, color: Color.brown }}><Text style={{ ...styles.hyperlink }} onPress={() => navigation.navigate("NewEntry")}>Click here</Text> to add a new entry.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    hyperlink: {
        color: Color.darkGreen,
        textDecorationLine: 'underline',
    },

});

export default EmptyPlants;


