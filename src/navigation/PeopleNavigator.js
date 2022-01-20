import React from "react";
import { StyleSheet, Text,} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createStackNavigator } from '@react-navigation/stack';
import LeftHeaderImage from "../component/LeftHeaderImage";
import MyProfileScreen from '../screens/MyProfileScreen';
import AddServiceScreen from '../screens/AddServiceScreen';
import MyServices from '../screens/MyServices';
import EditServiceScreen from '../screens/EditServiceScreen';
// import Add_ques_popup from '../screens/Add_ques_popup';
import PaymentScreen from '../screens/PaymentScreen';
const PeopleStack = createStackNavigator();

const PersonNavigator =({navigation})=>(
    <PeopleStack.Navigator 
        initialRouteName="MyProfile"
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
        <PeopleStack.Screen 
            name="MyProfile" 
            component={MyProfileScreen}
            options={{
                title:'',
                headerLeft:()=>(
                    <Text style={{fontWeight:"700",fontSize:24,color:'black',left:24}}>My Profile</Text>                                    
                ),
                headerRight:()=>(
                    <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home')}
                    />
                )  
            }}
        />  
        <PeopleStack.Screen 
            name="AddService" 
            component={AddServiceScreen}
            options={{
                title:'Add Service',
                headerLeft:()=>(
                    <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.navigate("MyProfile")}/>                                    
                ),
                headerRight:()=>(
                    <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home')}
                    />
                )
            }}
        /> 
         <PeopleStack.Screen 
            name="MyServices" 
            component={MyServices}
            options={{
                title:'My Services',
                headerLeft:()=>(
                    <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.navigate("MyProfile")}/>                                    
                ),
                headerRight:()=>(
                    <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home')}
                    />
                )
            }}
        /> 
         <PeopleStack.Screen 
            name="EditService" 
            component={EditServiceScreen}
            options={{
                title:'Edit Service',
                headerLeft:()=>(
                    <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.navigate("MyServices")}/>                                    
                ),
                headerRight:()=>(
                    <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home')}
                    />
                )
            }}
        /> 
       <PeopleStack.Screen 
            name="Payment" 
            component={PaymentScreen}
            options={{
                title:'Payment',
                headerLeft:()=>(
                    <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.goBack()}/>                                    
                ),
                headerRight:()=>(
                    <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home')}
                    />
                )  
            }}
        />
    </PeopleStack.Navigator>
);

export default PersonNavigator;

