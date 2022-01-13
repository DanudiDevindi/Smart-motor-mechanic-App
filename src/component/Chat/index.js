import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import { Text, View, Modal, TouchableOpacity, TextInput, FlatList,ScrollView } from 'react-native';
import { styles } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SenderMessage, ReceiverMessage } from '../../Firebase/Message'
import Firebase from '../../Firebase/firebaseSDK';

const Chat = ({ serviceProviderID,serviceProviderName,serviceProviderImage,userId,userName,userImage}) => {
  const [data, setData] = useState({
    msg: '',
    allMsg: []
  })

  useEffect(() => {
    getAllMsg()
  }, []);

  const getAllMsg = () => {
    try {
      Firebase.
        database()
        .ref('messages')
        .child(serviceProviderID)
        .child(userId)
        .on("value", (dataSnapshot) => {
          let messages = [];
          dataSnapshot.forEach(e => {
            console.log("e")
            console.log(e.val())
            messages.push({
              user:{
                id:e.val().user.id,
                name:e.val().user.name,
                image:e.val().user.image
              },
              serviceProvider:{
                id:e.val().serviseProvider.id,
                name:e.val().serviseProvider.name,
                image:e.val().serviseProvider.image
              },
              msg:e.val().msg
            })
          });
          setData({
            ...data,
            allMsg: messages.reverse(),
            msg:''
          })
          console.log(data.allMsg)
        })
    } catch (error) {
      return error;
    }
  }

  const handleMessage = async () => {
    if (data.msg !== "") {
      SenderMessage(serviceProviderID,serviceProviderName,serviceProviderImage,userId,userName,userImage,data.msg).
        then(() => {
          getAllMsg()

        }).catch((err) => {
          console.log(err)
        })

      ReceiverMessage(serviceProviderID,serviceProviderName,serviceProviderImage,userId,userName,userImage, data.msg).
        then(() => {
          getAllMsg()

        }).catch((err) => {
          console.log(err)
        })
    }
  }

  const ItemView = ({ item }) => {
    return (
      <View style={[styles.chat, { alignSelf: userId === item.user.id ? 'flex-end' : 'flex-start' }]}>
        <View style={{ borderRadius: 10, backgroundColor: userId === item.user.id ? '#ffb999' : 'white', marginBottom:5}}>
          <Text style={{color:'black',padding:10}}>
            {item.msg}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        inverted
        style={{ marginBottom: 60 }}
        data={data.allMsg}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
      />
      <View style={styles.container}>
        <View style={styles.txtInputContainer}>
          <TextInput
          style={{paddingLeft:15}}
            placeholder="Enter Message"
            placeholderTextColor="grey"
            value={data.msg}
            onChangeText={(val) => setData({
              // ...msg,
              ...data,
              msg: val
            })}
          />
        </View>
        <TouchableOpacity style={styles.sendIconContainer} onPress={handleMessage}>
          <MaterialCommunityIcons name="send" size={30} />
        </TouchableOpacity>
      </View>
    </View>


  )
}

export default Chat;