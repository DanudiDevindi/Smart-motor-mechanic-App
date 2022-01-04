// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!...</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React,{useEffect,useState,useReducer} from 'react';
import {View,ActivityIndicator} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from "./src/screens/RootStackScreen";
import TabNavigator from './src/screens/MainTabScreen';
import LoadingIndicator from './src/component/LocationIndicator';

import {AuthContext} from "./src/context/context";
import { AsyncStorage } from 'react-native';
const Stack = createStackNavigator();

export default function App() {
  const initialLoginState={
    isLoading:true,
    id:null,
    userToken:null
};

const loginReducer=(prevState,action)=>{
    switch(action.type){
        case "LOGIN": return {
            ...prevState,
            userToken:action.token,
            id:action.id,
            isLoading:false
        };
        case "LOGOUT": return {
            ...prevState,
            id:null,
            userToken:null,
            isLoading:false
        };
        case "REGISTER": return {
            ...prevState,
            userToken:action.token,
            id:action.id,
            isLoading:false
        };
        case "RETRIVE_TOKEN": return {
            ...prevState,
            userToken:action.token,
            isLoading:false
        };
    }

};

const [loginState,dispatch]=React.useReducer(loginReducer,initialLoginState);

const authContext=React.useMemo(()=>({
    signIn:async(foundUser)=>{
        const userToken=String(foundUser.token);
        const id=foundUser.id;
        try{
            await AsyncStorage.setItem('userToken',userToken)
        }catch(e){
            console.log(e);
        }
        dispatch({type:'LOGIN',id:id,token:userToken})
    },
    signOut:async()=>{
        try{
            await AsyncStorage.removeItem('userToken');
        }catch(err){
            console.log(err)
        }
        dispatch({type:'LOGOUT'})
    },
    signUp:async(foundUser)=>{
        console.log("founduser "+foundUser)
        const userToken=String(foundUser.token);
        const id=foundUser.id;
        try{;
            await AsyncStorage.setItem('userToken',userToken)
        }catch(e){
            console.log(e);
        }
        dispatch({type:'REGISTER',id:id,token:userToken})
    }
}),[]);

useEffect(()=>{
   setTimeout(async()=>{
        let userToken;
        userToken=null;
        try{
            userToken=await AsyncStorage.getItem('userToken');
            console.log("userToken8888")
            console.log(userToken)
        }catch(err){
           console.log(err)
        }           
        dispatch({type:'REGISTER',token:userToken})
   },1000);
},[])


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken===null ?<RootStackScreen/> :<TabNavigator/>}
      </NavigationContainer>
    </AuthContext.Provider>  
  );
}
