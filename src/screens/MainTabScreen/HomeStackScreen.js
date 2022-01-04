import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createStackNavigator } from '@react-navigation/stack';
import LeftHeaderImage from "../../component/LeftHeaderImage";
import AllServicesScreen from '../AllServicesSreen';
import DetailsAboutTechnicianScreen from '../DetailsAboutTechnicianScreen';
import HomeScreen from '../HomeScreen';
import ChatScreen from '../ChatScreen';
import ChatListScreen from '../ChatListScreen';
import ServiceDetailsScreen from '../ServiceDetailsScreen';
import Find_Location from '../Find_Location';
import NearLocation from '../NearLocation';
import NotificationScreen from "../NotificationScreen";

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (

  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold'
    }

  }}>
    <HomeStack.Screen
      name="Home1"
      component={HomeScreen}
      options={{
        title: '',
        headerLeft: () => (
          <View>
            {/* <Image source={require("../../assest/images/logo_with_name.png")} style={{width:25,height:25,}}/> */}
            <Text style={{ fontWeight: "700", fontSize: 24, color: 'black', left: 24 }} >Home Page</Text>
          </View>

        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', marginRight: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate("ChatList")}>
              <Ionicons name="chatbox-ellipses-outline" color="black" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
              <AntDesign name="bells" color="black" size={25} style={{ marginLeft: 10 }} />
            </TouchableOpacity>

          </View>
        )
      }}
    />
    <HomeStack.Screen
      name="AllServices"
      component={AllServicesScreen}
      options={{
        title: 'Service Page',
        headerLeft: () => (
          <AntDesign name="left" size={20} color="black" style={{ marginLeft: 20 }} onPress={() => navigation.navigate("Home1")} />
        ),
        headerRight: () => (
          <LeftHeaderImage
            onPress={() => navigation.navigate('Home1')}
          />
        )
      }}
    />
    <HomeStack.Screen
      name="ServiceDetails"
      component={ServiceDetailsScreen}
      options={{
        title: '',
        headerLeft: () => (
          <AntDesign name="left" size={20} color="black" style={{ marginLeft: 20 }} onPress={() => navigation.navigate("AllServices")} />
        ),
        headerRight: () => (
          <LeftHeaderImage
            onPress={() => navigation.navigate('Home1')}
          />
        )
      }}
    />
    <HomeStack.Screen
      name="find_location"
      component={Find_Location}
      options={{
        title: '',
        headerLeft: () => (
          <Text></Text>
          // <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.goBack()}/>
        ),
        headerRight: () => (
          <LeftHeaderImage
            onPress={() => navigation.navigate('Home1')}
          />
        )
      }}
    />
    <HomeStack.Screen
      name="near_location"
      component={NearLocation}
      options={{
        title: '',
        headerLeft: () => (
          <AntDesign name="left" size={20} color="black" style={{ marginLeft: 20 }} onPress={() => navigation.navigate("AllServices")} />
        ),
        headerRight: () => (
          <LeftHeaderImage
            onPress={() => navigation.navigate('Home1')}
          />
        )
      }}
    />
    {/* <HomeStack.Screen 
            name="mapView" 
            component={Find_Location}
            options={{
              title:'',
                // headerLeft:()=>(
                //   <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.goBack()}/>
                // ),
                headerRight:()=>( 
                  <LeftHeaderImage
                  onPress={()=>navigation.navigate('Home1')}
                  />
                )
            }}
        />  */}
    <HomeStack.Screen
      name="AboutTechinian"
      component={DetailsAboutTechnicianScreen}
      options={{
        title: '',
        headerLeft: () => (
          <AntDesign name="left" size={20} color="black" style={{ marginLeft: 20 }} onPress={() => navigation.navigate("ServiceDetails")} />
        ),
        headerRight: () => (
          <LeftHeaderImage
            onPress={() => navigation.navigate('Home1')}
          />
        )
      }}
    />
    <HomeStack.Screen
      name="ChatList"
      component={ChatListScreen}
      options={{
        title: 'Chats',
        headerLeft: () => (
          <AntDesign name="left" size={20} color="black" style={{ marginLeft: 20 }} onPress={() => navigation.navigate("Home1")} />
        ),
        headerRight: () => (
          <LeftHeaderImage
            onPress={() => navigation.navigate('Home1')}
          />
        )
      }}
    />
     <HomeStack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{
        title: '',
        headerLeft: () => (
          <AntDesign name="left" size={20} color="black" style={{ marginLeft: 20 }} onPress={() => navigation.navigate("ChatList")} />
        ),
        headerRight: () => (
          <LeftHeaderImage
            onPress={() => navigation.navigate('Home1')}
          />
        )
      }}
    />
    <HomeStack.Screen
      name="Notification"
      component={NotificationScreen}
      options={{
        title: 'Notifications',
        headerLeft: () => (
          <AntDesign name="left" size={20} color="black" style={{ marginLeft: 20 }} onPress={() => navigation.navigate("Home1")} />
        ),
        headerRight: () => (
          <LeftHeaderImage
            onPress={() => navigation.navigate('Home1')}
          />
        )
      }}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;