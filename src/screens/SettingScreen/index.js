import React, { useState } from "react";
import {Text,View,TouchableOpacity, Alert,ScrollView } from "react-native";
import {styles} from './styles';

const SettingScreen = () => {
  return (    
    <ScrollView style={styles.container}>
      <View style={styles.paragaphContainer}>
        <Text style={styles.title}>About Us:</Text>
        <Text style={styles.description}>sample test sample test sample test sample test sample test sample test sample test sample testsample test </Text>
        <Text style={styles.description}>sample testsample testsample test sample test sample test sample test sample test sample test sample test sample test</Text>
      </View>   
      <View style={styles.paragaphContainer}>
        <Text style={styles.title}>Contact Us:</Text>
        <Text style={styles.description}>sample test sample test sample test sample test sample test sample test sample test sample test sample test sample test </Text>
      </View>
      <View style={styles.paragaphContainer}>
        <Text style={styles.bigTitle}>FAQ</Text>
        <Text style={styles.title}>How I can apply for coupons code ?</Text>
        <Text style={styles.description}>sample test sample test sample test sample test sample test sample test sample test sample test sample test </Text>
        <Text style={styles.description}>sample test sample test sample test sample test sample test sample testsample test sample test sample test sample test sample test</Text>
        <Text style={styles.title}>How I can apply for coupons code ?</Text>
        <Text style={styles.description}>sample test sample test sample test sample test sample test sample test sample test </Text>
        <Text style={styles.description}>sample test sample testsample test sample test sample test sample test sample test sample test sample test</Text>
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