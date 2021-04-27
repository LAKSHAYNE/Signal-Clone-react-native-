import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { auth, db } from "../firebase";
import firebase from "firebase/app";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri:messages[0]?.data.photoUrl||
                "https://upload.wikimedia.org/wikipedia/en/6/60/The_Weeknd_-_Twenty_Eight.png",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <AntDesign name="videocamera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation,messages]);

  

  const sendMessage = () => {
    console.log("loggied in user is >>>>>>", auth.currentUser.displayName);
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoUrl: auth.currentUser.photoURL,
    });
    setInput("");
  };


  useLayoutEffect(() => {
    const unsubscribe =db
        .collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behaviour={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
      <TouchableWithoutFeedback style={{flex:1}} onPress={Keyboard.dismiss}>
      <>
      {!(Platform.OS==="android"||Platform.OS==="ios")?
      (
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            onSubmitEditing={sendMessage}
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder="Signal Message"
          />
          <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
            <Ionicons name="send" size={24} color="#2B58E6" />
          </TouchableOpacity>
        </View>
      ):(<></>)
      }
      
        <ScrollView  contentContainerStyle={{paddingTop:15}}>
          {messages.map(({ id, data }) =>(
            data.email === auth.currentUser.email ? (
              <View key={id} style={styles.reciever}>
                <Avatar
                  position="absolute"
                  rounded
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    right: -5,
                  }}
                  bottom={-15}
                  right={-5}
                  size={30}
                  source= {{
                    uri: data.photoUrl,
                  }}
                />
                <Text style={styles.recieverText}>{data.message}</Text>
              </View>
            ) : (
              <View key={id} style={styles.sender}>
              <Avatar
                  position="absolute"
                  rounded
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    left: -5,
                  }}
                  bottom={-15}
                  left={-5}
                  size={30}
                  source={{
                    uri: data.photoUrl,
                  }}
                />
                <Text style={styles.senderText}>{data.message}</Text>
                <Text style={styles.senderName}>{data.displayName}</Text>
              </View>
            )
          ))}
        </ScrollView>
        {(Platform.OS==="android"||Platform.OS==="ios")?
      (
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            onSubmitEditing={sendMessage}
            value={input}
            onChangeText={(text) => setInput(text)}
            placeholder="Signal Message"
          />
          <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
            <Ionicons name="send" size={24} color="#2B58E6" />
          </TouchableOpacity>
        </View>
      ):(<></>)
      }
        </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  recieverText:{
    color:"black",
    fontWeight:"500",
    marginLeft:10,
  },
  sender: {
      marginLeft: 10,
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  senderText:{
    color:"white",
    fontWeight:"500",
    marginLeft:10,
    marginBottom:15
  },
  senderName:{
    left:10,
    paddingRight:10,
    fontSize:10,
    color:"white",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
