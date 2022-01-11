import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import api from "../../api/jsonServer";
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");
import Firebase from '../../Firebase/firebaseSDK';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotification()
  }, []);

  const getNotification = async () => {
    await api.get("/user_service").then((res) => {
      var services = res.data;
      let notificationList = [];
     services.forEach(service => {
       console.log(service.category)
        try {
          Firebase
            .database()
            .ref('notifications')
            .child(service.category)
            // .limitToLast(1)
            .on("value", (dataSnapshot) => {
              console.log("sataSnap")
              dataSnapshot.forEach(e => {
                  notificationList.push({
                    category:e.val().category,
                    title:e.val().title,
                    userName:e.val().userName
                  })
              });
            })
        } catch (error) {
          return error;
        }
        setNotifications(notificationList)
     });
    })
  }

  const ItemView = ({ item }) => {
    console.log(item)
    return (
      <View style={styles.CardContainer}>
        <View style={{margin:15}}>
        <Text style={{color:'black',fontSize:20}}>{item.userName} have quection regarding {item.category}</Text>
          <Text style={{color:'black',marginTop:10,fontWeight:'bold'}}>Question title is {item.title}</Text>
        </View>

         
      </View>
    )
  }

  return (
    <View>
      <FlatList
        inverted
        style={{ marginBottom: 60 }}
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
      />
    </View>
  )
}

export default NotificationScreen;

const styles = StyleSheet.create({
  CardContainer: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    height: height / 8,
    margin: 10
  },

});