import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LeftHeaderImage from "../component/LeftHeaderImage";
import AllServicesScreen from '../screens/AllServicesSreen';
import DetailsAboutTechnicianScreen from '../screens/DetailsAboutTechnicianScreen';
import EditServiceDetailsScreen from '../screens/EditServiceDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import Find_Location from '../screens/Find_Location';

const HomeStack = createStackNavigator();

const HomeNavigator = ({navigation}) => {
  return (
    <HomeStack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor:'white',
        },
        headerTintColor:'black',
        headerTitleStyle:{
            fontWeight:'bold'
        }     
  
    }}>
      <HomeStack.Screen 
            name="Home1" 
            component={HomeScreen}
            options={{
                title:'',
                headerLeft:()=>(
                  <Text style={{fontWeight:"700",fontSize:24,color:'black',left:24}} >Home Page</Text>
                ),
                headerRight:()=>(
                  <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home')}
                  />
                )
            }}
        />  
        <HomeStack.Screen 
            name="AllServices" 
            component={AllServicesScreen}
            options={{
              title:'Service Page',
                headerLeft:()=>(
                  <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.navigate("Home1")}/>
                ),
                headerRight:()=>(
                  <LeftHeaderImage
                    onPress={()=>navigation.navigate('Home')}
                  />
                )
            }}
        /> 
        <HomeStack.Screen 
            name="ServiceDetails" 
            component={ServiceDetailsScreen}
            options={{
              title:'',
                headerLeft:()=>(
                  <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.navigate("AllServices")}/>
                ),
                headerRight:()=>(
                  <LeftHeaderImage
                  onPress={()=>navigation.navigate('Home')}
                  />
                )
            }}
        />  
        <HomeStack.Screen 
            name="find_location" 
            component={Find_Location}
            options={{
              title:'',
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
         <HomeStack.Screen 
            name="mapView" 
            component={Find_Location}
            options={{
              title:'',
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
        <HomeStack.Screen 
            name="AboutTechinian" 
            component={DetailsAboutTechnicianScreen}
            options={{
              title:'',
                headerLeft:()=>(
                  <AntDesign name="left" size={20} color="black" style={{marginLeft:20}} onPress={()=>navigation.navigate("ServiceDetails")}/>
                ),
                headerRight:()=>(
                  <LeftHeaderImage
                  onPress={()=>navigation.navigate('Home')}
                  />
                )
            }}
        />
        
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeNavigator;