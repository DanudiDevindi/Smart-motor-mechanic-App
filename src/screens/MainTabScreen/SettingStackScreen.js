import React from "react";
import { StyleSheet, Text,} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createStackNavigator } from '@react-navigation/stack';
import LeftHeaderImage from "../../component/LeftHeaderImage";
import SettingScreen from '../SettingScreen';
const SettingStack = createStackNavigator();

const SettingStackScreen =({navigation})=>(
    <SettingStack.Navigator screenOptions={{
      headerStyle:{
          backgroundColor:'white',
      },
      headerTintColor:'black',
      headerTitleStyle:{
          fontWeight:'bold'
      }     
  
  }}>
      <SettingStack.Screen 
          name="Setting" 
          component={SettingScreen}
          options={{
              title:'',
              headerLeft:()=>(
                <Text style={{fontWeight:"700",fontSize:24,color:'black',left:24}}>Setting Page</Text>
              ),
              headerRight:()=>(
                <LeftHeaderImage
                onPress={()=>navigation.navigate('Home1')}
                />
              )
          }}
      />  
  </SettingStack.Navigator>
  );

export default SettingStackScreen;