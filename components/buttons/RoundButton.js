import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../constants/colors';

function RoundButton(props) {

  const selectedColor = Color.lightGreen;

  return (
      <View style={{ position: 'relative' }}>
        <Icon style={{ position: 'absolute', top: 8, left: 5, zIndex: 100 }} name="add-circle-outline" color="white" size={12} />
        <Text style={{ ...styles.smallButton, backgroundColor: selectedColor }}>{props.data.name}</Text>
      </View>
  );
}


const styles = StyleSheet.create({
  smallButton: {
    backgroundColor: Color.lightGreen,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    height: 20,
    width: 100,
    marginTop: 5,
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white'
  }
});

export default RoundButton;