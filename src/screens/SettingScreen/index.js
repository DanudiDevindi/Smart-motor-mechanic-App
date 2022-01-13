import React, { useState } from "react";
import {Text,View,TouchableOpacity, Alert,ScrollView } from "react-native";
import {styles} from './styles';

const SettingScreen = () => {
  return (    
    <ScrollView style={styles.container}>
      <View style={styles.paragaphContainer}>
        <Text style={styles.title}>About Us:</Text>
        <Text style={styles.description}>Best iPhone repair center to get your smart phone fixed. We fix cracked screens, water damaged iPhones, speaker damage, and much more. No need to walk around with a broken iPhone. We got you covered. </Text>
        <Text style={styles.description}>At Phone Repair and More we take care of all customers that need Samsung repair services in Maharagama Colombo. There is nothing like the pain and agony of a damaged Samsung phone. Reach out to the Samsung repair experts to quickly get your phone fixed today.</Text>
      </View>   
      <View style={styles.paragaphContainer}>
        <Text style={styles.title}>Contact Us:</Text>
        <Text style={styles.description}>Best iPhone repair center to get your smart phone fixed. We fix cracked screens, water damaged iPhones, speaker damage, and much more. No need to walk around with a broken iPhone. We got you covered. </Text>
      </View>
      <View style={styles.paragaphContainer}>
        <Text style={styles.bigTitle}>FAQ</Text>
        <Text style={styles.title}>How I can apply for coupons code ?</Text>
        <Text style={styles.description}>Best iPhone repair center to get your smart phone fixed. We fix cracked screens, water damaged iPhones, speaker damage, and much more. No need to walk around with a broken iPhone. We got you covered. </Text>
        <Text style={styles.description}>At Phone Repair and More we take care of all customers that need Samsung repair services in Maharagama Colombo. There is nothing like the pain and agony of a damaged Samsung phone. Reach out to the Samsung repair experts to quickly get your phone fixed today.</Text>
        <Text style={styles.title}>How I can apply for coupons code ?</Text>
        <Text style={styles.description}>Best iPhone repair center to get your smart phone fixed. We fix cracked screens, water damaged iPhones, speaker damage, and much more. No need to walk around with a broken iPhone. We got you covered. </Text>
        <Text style={styles.description}>At Phone Repair and More we take care of all customers that need Samsung repair services in Maharagama Colombo. There is nothing like the pain and agony of a damaged Samsung phone. Reach out to the Samsung repair experts to quickly get your phone fixed today.</Text>
      </View>
      <View style={{flex:1,marginTop:20,marginLeft:40}}>
         <TouchableOpacity onPress={()=>console.log("Rate this app")}><Text style={{fontSize:20,color:'#FF8546'}}>Rate this App</Text></TouchableOpacity>
       </View>
      <View style={{marginBottom:50}}>

      </View>
    </ScrollView>
  );
};

export default SettingScreen;