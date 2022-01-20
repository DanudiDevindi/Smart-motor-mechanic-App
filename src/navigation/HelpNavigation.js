import React from "react";
import { StyleSheet, Text,} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createStackNavigator } from '@react-navigation/stack';
import LeftHeaderImage from "../component/LeftHeaderImage";
import AddQuecScreen from '../screens/AddQuecScreen';
const QuectionStack = createStackNavigator();

const HelpNavigator =({navigation})=>(
    <QuectionStack.Navigator 
        initialRouteName="AddQuection"
        screenOptions={{
            headerStyle:{
                backgroundColor:'white',
            },
            headerTintColor:'black',
            headerTitleStyle:{
                fontWeight:'bold'
            }    
        }}
    >
        <QuectionStack.Screen 
            name="AddQuection" 
            component={AddQuecScreen}
            options={{
                title:'',
                headerLeft:()=>(
                    <Text style={{fontWeight:"700",fontSize:24,color:'black',left:24}}>Add Quection</Text>                                    
                ),
                headerRight:()=>(
                    <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home')}
                    />
                )  
            }}
        /> 
    </QuectionStack.Navigator>
);

export default HelpNavigator;

