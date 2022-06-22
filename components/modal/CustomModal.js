import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Platform, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constants/colors';

function CustomModal(props) {
    

    return (
        <Modal visible={props.visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <View style={styles.modalTextContainer}>
                        <Text>{props.message}</Text>
                        <Text>{props.value}</Text>
                        <Text>This action cannot be undone.</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={props.onCancel}>
                            <Text style={styles.cancelButton}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1 }} onPress={props.onConfirm}>
                            <Text style={styles.deleteButton}>{props.actionButton}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    modalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
    },
    modal: {
        width: 250,
        backgroundColor: Color.background,
        borderRadius: 5,

    },
    modalTextContainer: {
        alignItems: 'center',
        paddingVertical: 20
    },
    button: {
        width: '50%'
    },
    cancelButton: {
        textAlign: 'center', backgroundColor: Color.lightGreen, color: 'white', paddingVertical: 5
    },
    deleteButton: {
        textAlign: 'center', backgroundColor: Color.darkGreen, color: 'white', paddingVertical: 5
    }

});

export default CustomModal;