import React from "react";
import { StyleSheet, Text,} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createStackNavigator } from '@react-navigation/stack';
import LeftHeaderImage from "../../component/LeftHeaderImage";
import AddQuecScreen from '../../screens/AddQuecScreen';
const HelpStack = createStackNavigator();

const HelpStackScreen =({navigation})=>(
    <HelpStack.Navigator screenOptions={{
      headerStyle:{
          backgroundColor:'white',
      },
      headerTintColor:'black',
      headerTitleStyle:{
          fontWeight:'bold'
      }     
  
  }}>
      <HelpStack.Screen 
          name="AddQuection" 
          component={AddQuecScreen}
          options={{
              title:'',
              headerLeft:()=>(
                  <Text style={{fontWeight:"700",fontSize:24,color:'black',left:24}}>Add Quection</Text>                                    
              ),
              headerRight:()=>(
                  <LeftHeaderImage
                  onPress={()=>navigation.navigate('Home1')}
                  />
              )  
          }}
      />  
  </HelpStack.Navigator>
  );

export default HelpStackScreen;