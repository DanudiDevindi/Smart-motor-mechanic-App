import React from "react";
import { StyleSheet, Text,} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createStackNavigator } from '@react-navigation/stack';
import LeftHeaderImage from "../../component/LeftHeaderImage";
import NotificationScreen from '../NotificationScreen';
import MenuScreen from "../MenuScreen";

const NotificationStack = createStackNavigator();

const NotificationStackScreen =({navigation})=>(
    <NotificationStack.Navigator screenOptions={{
      headerStyle:{
          backgroundColor:'white',
      },
      headerTintColor:'black',
      headerTitleStyle:{
          fontWeight:'bold'
      }     
  
  }}>
      <NotificationStack.Screen 
          name="Notification" 
          component={NotificationScreen}
          options={{
              title:'',
              headerLeft:()=>(
                <Text style={{fontWeight:"700",fontSize:24,color:'black',left:24}}>Notification Page</Text>
              ),
              headerRight:()=>(
                <LeftHeaderImage
                onPress={()=>navigation.navigate('Home1')}
                />
              )
          }}
      />
       <NotificationStack.Screen 
          name="Menu" 
          component={MenuScreen}
          options={{
              title:'',
              headerLeft:()=>(
                <Text style={{fontWeight:"700",fontSize:24,color:'black',left:24}}>Notification & Messages</Text>
              ),
              headerRight:()=>(
                <LeftHeaderImage
                onPress={()=>navigation.navigate('Home1')}
                />
              )
          }}
      />
           
  </NotificationStack.Navigator>
  );

export default NotificationStackScreen;