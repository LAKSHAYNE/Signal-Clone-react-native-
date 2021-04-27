import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "react-native";
//import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Input, Text, withTheme } from "react-native-elements";
import { Button } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerBackTitle: "Login"
        })
    }, [props.navigation])

  function register() {
      auth.createUserWithEmailAndPassword(email,password)
      .then((authUser)=>{
          
          authUser.user.updateProfile({
              displayName:name,
              photoURL:imageUrl || "https://www.theweeknd.com/sites/g/files/aaj5321/f/styles/suzuki_breakpoints_image_mobile-lg_sq/public/release/202104/ab67616d0000b2737a5b4e0ebe93011c797193ea.jpg" //if image is not give then use this url for image by default
          })
      })
      .catch((error)=>alert(error.message));
  }

  return (
    <View behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          type="text"
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          type="password"
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          type="text"
          placeholder="Profile Image (optional)"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        onPress={register}
        raised
        title="Register"
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button:{
    width:200,
    marginTop:10
  },
  inputContainer:{
    width:300
  }
});
