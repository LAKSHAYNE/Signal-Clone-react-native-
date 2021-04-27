import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { db } from '../firebase';

const AddChatScreen = ({navigation}) => {

    const [input, setInput] = useState("");

    const createChat=async ()=>{
        await db.collection('chats').add({
            chatName:input
        }).then(()=>{
            navigation.goBack();
        }).catch((err)=>alert(err))
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add a new chat",
            headerBackTitle: "Chats",
        })
    },[navigation])

    return (
        <View style={styles.container}>
        <Input placeholder="Enter a chat name" value={input} 
            onChangeText={(text)=>setInput(text)}
            leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="black" />
            }
        />
        <Button disabled={!input} containerStyle={styles.b} onPress={createChat} title="Create new chat"/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%"
    }
})
