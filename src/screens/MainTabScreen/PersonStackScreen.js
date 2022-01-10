import React from "react";
import { StyleSheet, Text,} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { createStackNavigator } from '@react-navigation/stack';
import LeftHeaderImage from "../../component/LeftHeaderImage";
import MyProfileScreen from '../MyProfileScreen';
import AddServiceScreen from '../AddServiceScreen';
import PaymentScreen from '../PaymentScreen';
import MyServices from '../MyServices';
import MyPosts from '../MyPosts';
import EditProfileScreen from '../EditProfileScreen';
import ChangePasswordScreen from "../ChangePasswordScreen";
import EditServiceScreen from '../EditServiceScreen';
import EditPostScreen from '../EditPostScreen';
const PeopleStack = createStackNavigator();

const PersonStackScreen =({navigation})=>(
    <PeopleStack.Navigator 
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
                    onPress={()=>navigation.navigate('Home1')}
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
                    onPress={()=>navigation.navigate('Home1')}
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
                    onPress={()=>navigation.navigate('Home1')}
                    />
                )
            }}
        /> 
        <PeopleStack.Screen 
            name="MyPosts" 
            component={MyPosts}
            options={{
                title:'My Question',
                headerLeft:()=>(
                    <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.navigate("MyProfile")}/>                                    
                ),
                headerRight:()=>(
                    <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home1')}
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
                    onPress={()=>navigation.navigate('Home1')}
                    />
                )
            }}
        /> 
         <PeopleStack.Screen 
            name="EditProfile" 
            component={EditProfileScreen}
            options={{
                title:'Edit Profile',
                headerLeft:()=>(
                    <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.navigate("MyProfile")}/>                                    
                ),
                headerRight:()=>(
                    <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home1')}
                    />
                )
            }}
        /> 
         <PeopleStack.Screen 
            name="ChangePassword" 
            component={ChangePasswordScreen}
            options={{
                title:'Change Password',
                headerLeft:()=>(
                    <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.navigate("MyProfile")}/>                                    
                ),
                headerRight:()=>(
                    <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home1')}
                    />
                )
            }}
        /> 
        <PeopleStack.Screen 
            name="EditPost" 
            component={EditPostScreen}
            options={{
                title:'Edit Post',
                headerLeft:()=>(
                    <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.navigate("MyPosts")}/>                                    
                ),
                headerRight:()=>(
                    <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home1')}
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
                    <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.navigate("AddService")}/>                                    
                ),
                headerRight:()=>(
                    <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home1')}
                    />
                )  
            }}
        />  
    </PeopleStack.Navigator>
);

export default PersonStackScreen;

