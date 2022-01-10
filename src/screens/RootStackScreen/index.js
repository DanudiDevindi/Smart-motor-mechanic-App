import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import SplashScreen from "../SplashScreen";
import SignInScreen from "../SignINScreen";
import SignUpScreen from "../SignUPScreen";
import CordScreen from '../CordScreen';
import ResetScreen from '../ResetScreen';
import PasswordScreen from '../PasswordScreen';
import ForgetPasswordScreen from '../ForgetPasswordScreen';

const RootStack=createStackNavigator();

const RootStackScreen=({navigation})=>{
    return(
        <RootStack.Navigator headerMode='none'>
            {/* <RootStack.Screen name="Main" component={MainScreen}/> */}
            <RootStack.Screen name="Splash" component={SplashScreen}/>
            <RootStack.Screen name="SignIn" component={SignInScreen}/>
            <RootStack.Screen name="SignUp" component={SignUpScreen}/> 
            <RootStack.Screen name="Cord" component={CordScreen}/> 
            <RootStack.Screen name="Reset" component={ResetScreen}/> 
            <RootStack.Screen name="Password" component={PasswordScreen}/> 
            <RootStack.Screen name="ForgetPassword" component={ForgetPasswordScreen}/>        
    </RootStack.Navigator> 
    )
         
};
export default RootStackScreen;