import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input } from "react-native-elements/dist/input/Input";
import { Button } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";
//import { Image } from "react-native-elements";

const LoginScreen = (props) => {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState("")

  useEffect(() => {
    // auth.onAuthStateChanged returns an object which can be use to clear the sesson of the user 
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        props.navigation.replace('Home')
      }
    })
    return unsubscribe;
  }, [])
  
  const signIn=()=>{
    auth.signInWithEmailAndPassword(email,password)
    .catch((err)=>alert(err))
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri:
            "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input  placeholder="Email" value={email} type="email" autofocus onChangeText={(text)=>setemail(text)} />
        <Input placeholder='Password' value={password} type="password" secureTextEntry onChangeText={(text)=>setpassword(text)} onSubmitEditing={signIn}/>
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button containerStyle={styles.button}  
      onPress={()=>props.navigation.navigate("Register") }
      type="outline" title="Register" />
      <View style={{height:100}} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    padding:10
  },
  inputContainer: {
    width:300
  },
  button:{
    width:200,
    marginTop:10
  },
});
