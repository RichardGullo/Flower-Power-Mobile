import React, { useState } from 'react';
import {Text, View,StyleSheet,Button, TextInput, Form, Image,TouchableOpacity, StatusBar} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../constants/api';
import Color from '../constants/colors';

function Login({navigation}) {

  const[username,setUsername] = useState('');
  const[pass, setPass] = useState('');

  async function login(){

    let formData = new FormData();
    formData.append('username',username);
    formData.append('password',pass);

    try{

      const path = `${Api.path}/login.php`;
      console.log(path);

      const response = await fetch(path,{
        method:"POST",
        body:formData
      });

      const result = await response.json();
      console.log("hello");
      await AsyncStorage.setItem('username', result.data[0].username);
      await AsyncStorage.setItem('email',result.data[0].email);
      setUsername("");
      setPass("");
      navigation.navigate('HomeScreen');
    }catch(err){
      console.log(err);
    }
  }

  return (
      <View style={styles.container}>
        <StatusBar
        animated={true}
        backgroundColor="#A5DFB2"
        />
        <Image style={{position:'absolute', top:0, left:0}} source={require('../assets/top-background.png')} />
            <View style={{zIndex:100}}>
                
                <Text style={styles.headerText}>Welcome to Flower Power!</Text>
                <Text style={styles.secondaryText}>Sign in below or create an account to get started tracking your garden today!</Text>

                <TextInput
                  placeholder="User Name"
                  style={{...styles.textInput,marginTop:10}}
                  placeholderTextColor='black'
                  value={username}
                  onChangeText={newText => setUsername(newText)}
                />
                <TextInput
                  placeholder="Password"
                  style={{...styles.textInput}}
                  placeholderTextColor='black'
                  value={pass}
                  secureTextEntry={true}
                  onChangeText={newText => setPass(newText)}
                />

                <TouchableOpacity onPress={()=> login()}>
                  <Text style={styles.button}>LOG IN</Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.textContainer}>
              <Text style={{...styles.regularText, textAlign:'center'}}>Don't have an account? <Text onPress={()=>navigation.navigate("Register")} style={styles.hyperlink}>Sign up here.</Text></Text>
              <Text style={[{...styles.regularText, ...styles.hyperlink, textAlign:'center'}]}>Forgot your password?</Text>
            </View>  
            <View style={styles.textContainer}>
            <Text style={{...styles.regularText, textAlign:'center'}}>By continuing, you're accepting our</Text>
            <Text style={{...styles.regularText, textAlign:'center'}}><Text style={styles.hyperlink}>Terms of service</Text> and <Text style={styles.hyperlink}>Privacy Policy</Text></Text>
            </View>
            
        <Image style={{position:'absolute', bottom:0, left:0}} source={require('../assets/bottom-background.png')} />
      </View>
  );
}

const styles = StyleSheet.create({
    container:{
      alignItems:'center', justifyContent:'center', height:'100%', position:'relative', backgroundColor:Color.background,paddingHorizontal:20
    },
    headerText:{
      fontSize:48, textAlign:'center', color:Color.brown, fontWeight:'bold'
    },
    secondaryText:{
      fontSize:20, color:Color.brown
    },
    regularText:{
      fontSize:15, color:Color.primary
    },
    hyperlink:{
      color:Color.darkGreen,
      textDecorationLine:'underline',
    },
    textContainer:{
      zIndex:100
    },
    textInput:{
      borderWidth:1, backgroundColor:'white',paddingVertical:10,borderColor:Color.lightGreen,
      color:'red',textAlign:'center',fontSize:18,borderRadius:5,marginBottom:10
    },
    button:{
      backgroundColor:Color.lightGreen,color:'white',textAlign:'center',paddingVertical:15,borderRadius:10,
      fontSize:25, marginBottom:10
    }
  });

export default Login;


