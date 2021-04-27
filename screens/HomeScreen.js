import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Home = ({ navigation }) => {

    const [chats, setChats] = useState([])

    const signOut=()=>{
        auth.signOut().then(()=>{
            navigation.replace("Login")
        })
    }

    useEffect(()=>{
        //unsubscribe is for clearing the function afterwards
        const unsubscribe=db.collection('chats').onSnapshot(snapshot=>{
            setChats(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
        })
        return unsubscribe;
    },[])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "yellow",
      headerLeft: () => {
        return(<View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </TouchableOpacity>
        </View>);
      },
      headerRight:()=>(
          <View style={{
              flexDirection:"row",
              justifyContent:"space-between",
              width:80,
              marginRight:20
          }}>
              <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name="camerao" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}
              onPress={()=>navigation.navigate("AddChat")}
              >
              <Entypo name="pencil" size={24} color="black" />
              </TouchableOpacity>
          </View>
      )
    });
  }, [navigation]);

  const enterChat=(id,chatName)=>{
      navigation.navigate("Chat",{
          id:id,
          chatName:chatName
      });
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({id,data:{chatName}})=>(
            <CustomListItem key={id} id={id} chatName={chatName} 
                enterChat={enterChat}
            />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
    container:{
        height:"100%"
    }
});
