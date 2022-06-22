import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from 'expo-checkbox';
import Color from '../constants/colors'
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/app-context';
import Api from '../constants/api';

function PlantReminderCard(props) {

    const navigation = useNavigation();
    const checkboxRef = useRef();

    const { homeModal } = React.useContext(AppContext);

    const [modalVisibleHome, setModalVisibleHome] = homeModal;

    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    useEffect(() => {
        if (!modalVisibleHome)
            setToggleCheckBox(false);
    }, [modalVisibleHome]);
    
  

    useEffect(() => {

        if (toggleCheckBox) {
            props.onLaunchModal(props.data);
        }

    }, [toggleCheckBox]);

    let expiredDate = props.data.expire_date.split("-");
    expiredDate = new Date(expiredDate[0], expiredDate[1]-1, expiredDate[2]);

    let timeDifference = expiredDate - new Date();
    let dayDifference = Math.ceil(timeDifference / (1000*3600*24));

    return (
        <View style={{ paddingBottom: 10 }}>
            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                <Image style={{ width: 75, height: 75, borderRadius: 10, marginRight: 10, resizeMode:'contain' }} source={{ uri: `${Api.path}/plant-images/${props.data.image}`}} />
                <View style={{ flexGrow: 1 }}>
                    <Text><Text style={{ ...styles.hyperlink }}>Nickname: </Text>{props.data.nickname}</Text>
                    <Text><Text style={styles.hyperlink}>Specices: </Text>{props.data.species}</Text>
                    <Text><Text style={styles.hyperlink}>Reminder: </Text>Water in <Text>{dayDifference}</Text> days</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                value={toggleCheckBox}
                                onValueChange={setToggleCheckBox}
                                color={toggleCheckBox ? Color.darkGreen : undefined}
                                style={{ marginRight: 5 }}
                            />
                            <Text>I Completed this task</Text>
                        </View>

                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('ViewEntry',{
                                data:props.data
                            })
                        }}>
                            <View style={{ flexDirection: 'row'}}>
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

    hyperlink: {
        color: '#358B59',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
    solidLine: {
        borderColor: '#816868', borderBottomWidth: 2, marginTop: 5
    },
    dashedLine: {
        borderColor: '#816868', borderStyle: 'dashed', borderBottomWidth: 2
    }
});

export default PlantReminderCard;
