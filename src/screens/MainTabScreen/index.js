import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabBar from '../../component/TabBar';
import HomeNavigator from './HomeStackScreen';
import PeopleNavigator from './PersonStackScreen';
import HelpNavigator from './HelpStackScreen'
import NotificationScreen from './NotificationStackScreen';
import SettingScreen from './SettingStackScreen';
import ComingSoonScreen from '../ComingSoonScreen';
import MenuNavigator from './MenuStackScreen';

const CustomButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 80,
        height: 80,
        // marginBottom:100,
        borderRadius: 50,
        backgroundColor: "white",
        
      }}
    >
      <View style={{alignItems:'center',width:'100%',height:'100%',borderRadius: 50,justifyContent:'center'}}>
         <Image source={require("../../assest/images/help.png")} style={{height:'100%',width:'100%'}}/>
      </View>     
    </View>
  </TouchableOpacity>
);

const Tab = createBottomTabNavigator();
const TabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator 
    initialRouteName="Home"
    tabBarOptions={{
     activeTintColor: '#1B17E1',
     inactiveTintColor:'#b3b3b3',
     showLabel:false,
     labelStyle:{
       top:-15,
       fontSize:10
     }
   }}
      
    >
      <Tab.Screen
        name='Home'
        component={HomeNavigator}        
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='home' size={size} color={color} /> 
          ),
        }}
      />    
      <Tab.Screen
        name="custom"
        component={ComingSoonScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='shopping-cart' size={size} color={color} /> 
          ),
        }}    
      />
      {/* <Tab.Screen
        name="MenuStack"
        component={MenuNavigator} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='shopping-cart' size={size} color={color} /> 
          ),
        }}    
      /> */}
      <Tab.Screen
              name=" "
              component={HelpNavigator}
              options={{
                tabBarButton: (props) => <CustomButton {...props} />,               
              }}
            />
      <Tab.Screen
        name='People'
        component={PeopleNavigator}   
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='person-outline' size={size} color={color} /> 
          ),
        }}      
      />      
      <Tab.Screen
        name='Setting'
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='settings' size={size} color={color} /> 
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;