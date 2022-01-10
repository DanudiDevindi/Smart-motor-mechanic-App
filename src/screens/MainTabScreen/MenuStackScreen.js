import React from "react";
import { StyleSheet, Text,TouchableOpacity,Image} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createStackNavigator } from '@react-navigation/stack';
import LeftHeaderImage from "../../component/LeftHeaderImage";
import HomeScreen from '../HomeScreen';
import MenuScreen from "../MenuScreen";

const MenuStack = createStackNavigator();

const MenuStackScreen=({navigation})=>(
  
    <MenuStack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor:'white',
        },
        headerTintColor:'black',
        headerTitleStyle:{
            fontWeight:'bold'
        }     
  
    }}>
        <MenuStack.Screen 
            name="Menu" 
            component={MenuScreen}
            options={{
                title:'',
                headerLeft:()=>(
                  <Text style={{fontWeight:"700",fontSize:24,color:'black',left:24}} >Notification & Messages</Text>
                ),
              
            }}
        /> 
    </MenuStack.Navigator>
  );

  export default MenuStackScreen;