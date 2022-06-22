import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from 'expo-checkbox';
import Color from 'react-native-sandbox/constants/colors'
import RoundButton from 'react-native-sandbox/components/buttons/RoundButton';
import { AppContext } from '../context/app-context';

import { useNavigation } from '@react-navigation/native';

function PlantSearchCard(props) {

    const navigation = useNavigation();

    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const { modal } = React.useContext(AppContext);

    const [modalVisible, setModalVisible] = modal;

    useEffect(() => {

        if (toggleCheckBox) {
            props.onLaunchModal(props.data);
        }

    }, [toggleCheckBox]);

    useEffect(() => {
        if (!modalVisible)
            setToggleCheckBox(false);
    }, [modalVisible]);

    console.log(props.data);

    return (
        <View style={{ paddingBottom: 10 }}>
            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                <Image style={{ width: 75, height: 75, borderRadius: 10, marginRight: 10, resizeMode: 'contain' }} source={{ uri: 'http://192.168.86.34/plantapi/plant-images/' + props.data.image }} />
                <View style={{ flexGrow: 1 }}>
                    <Text><Text style={styles.hyperlink}>Nickname:</Text>{props.data.nickname}</Text>
                    <Text><Text style={styles.hyperlink}>Specices:</Text>{props.data.species}</Text>
                    <Text><Text style={styles.hyperlink}>Date Acquired: </Text>{props.data.date_acquired}</Text>
                    <Text style={styles.hyperlink}>Plant Classifcation: </Text>
                    <View style={{ flexDirection: 'row' }}>
                        {props.data.classification.map((element) => {
                            return <RoundButton key={element.id} data={element} />
                        })}

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                value={toggleCheckBox}
                                onValueChange={setToggleCheckBox}
                                color={toggleCheckBox ? Color.darkGreen : undefined}
                                style={{ marginRight: 5 }}
                            />
                            <Text>Delete Entry</Text>

                        </View>

                        <TouchableOpacity onPress={()=>{
                            navigation.navigate("ViewEntrySearch",{data:props.data})
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>View Entry</Text>
                                <Icon name="arrow-forward-outline" size={20} />
                            </View>
                        </TouchableOpacity>


                    </View>
                </View>
            </View>
            <View style={styles.dashedLine}></View>
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
    },
    solidLine: {
        borderColor: '#816868', borderBottomWidth: 2, marginTop: 5
    },
    dashedLine: {
        borderColor: '#816868', borderStyle: 'dashed', borderBottomWidth: 2
    }
});

export default PlantSearchCard;
