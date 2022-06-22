import React, { useState } from 'react';
import {Text, View,StyleSheet,Button, TextInput, Form, Image,TouchableOpacity, StatusBar, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../constants/api';

function Register({navigation}) {

    const[username,setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const[confirmPass,setConfirmPass] = useState('');
    const[error, setError] = useState('');

    async function register(){
        setError("");
        if(pass != confirmPass){
            console.log("Password fields are different");
            setError("Error: Passwords fields are different.");
            return;
        }
            
        let formData = new FormData();
        formData.append('username',username);
        formData.append('email',email);
        formData.append('password',pass);

        try{
          const response =  await fetch(`${Api.path}/register.php`,{
            method:"POST",
            body:formData
          });

          const result = await response.json();
          console.log(result);

          if(result.error != ""){
            setError("Error: " + result.error);
            return;
          }
            
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('email',email);
          setUsername("");
          setEmail("");
          setPass("");
          setConfirmPass("");
          navigation.navigate("HomeScreen");

        }catch{
          console.log("There was an error in registering");
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

                {error.length > 0 && <Text style={{color:'red', textAlign:'center'}}>{error}</Text>}
                <TextInput
                  placeholder="User Name"
                  style={{...styles.textInput, marginTop:10}}
                  placeholderTextColor='black'
                  value={username}
                  onChangeText={newText => setUsername(newText)}
                />

                <TextInput
                  placeholder="E-mail Address"
                  style={styles.textInput}
                  placeholderTextColor='black'
                  value={email}
                  onChangeText={newText => setEmail(newText)}
                />

                <TextInput
                  placeholder="Password"
                  style={styles.textInput}
                  placeholderTextColor='black'
                  value={pass}
                  secureTextEntry={true}
                  onChangeText={newText => setPass(newText)}
                />
                <TextInput
                  placeholder="Confirm Password"
                  style={{...styles.textInput}}
                  placeholderTextColor='black'
                  value={confirmPass}
                  secureTextEntry={true}
                  onChangeText={newText => setConfirmPass(newText)}
                />

                <TouchableOpacity onPress={()=> register()}>
                  <Text style={styles.button}>SIGN UP</Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.textContainer}>
              <Text style={{...styles.regularText, textAlign:'center'}}>Already have an account?<Text style={styles.hyperlink} onPress={()=>navigation.navigate("Login")}>Log in here</Text></Text>
            </View>  
            <View style={styles.textContainer}>
            <Text style={{...styles.regularText, textAlign:'center'}}>By continuing, you're accepting our</Text>
            <Text style={{...styles.regularText, textAlign:'center'}}><Text style={styles.hyperlink}>Terms of service</Text> and <Text style={styles.hyperlink}>Privacy Policy</Text></Text>
            </View>
            
        <Image style={{position:'absolute', bottom:0, left:0,height:400}} source={require('../assets/bottom-background.png')} />
      </View>
  );
}

const styles = StyleSheet.create({
    container:{
      alignItems:'center', justifyContent:'center', height:'100%', position:'relative', backgroundColor:'#F6EFED', paddingHorizontal:20
    },
    headerText:{
      fontSize:48, textAlign:'center', color:'#816868', fontWeight:'bold'
    },
    secondaryText:{
      fontSize:20, color:'#816868'
    },
    regularText:{
      fontSize:15, color:'black'
    },
    hyperlink:{
      color:'#358B59',
      textDecorationLine:'underline'
    },
    textContainer:{
      zIndex:100
    },
    textInput:{
      borderColor:'black',borderWidth:1, backgroundColor:'white',paddingVertical:10,borderColor:'#A5DFB2',
      textAlign:'center',fontSize:18,borderRadius:5,marginBottom:10 
    },
    button:{
      backgroundColor:'#A5DFB2',color:'white',textAlign:'center',paddingVertical:15,borderRadius:10,
      fontSize:25, marginBottom:10
    }
  })

export default Register;


