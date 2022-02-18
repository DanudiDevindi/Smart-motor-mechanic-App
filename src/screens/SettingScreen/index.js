import React, { useState } from "react";
import {Text,View,TouchableOpacity, Alert,ScrollView } from "react-native";
import {styles} from './styles';

const SettingScreen = () => {
  return (    
    <ScrollView style={styles.container}>
      <View style={styles.paragaphContainer}>
        <Text style={styles.title}>About Us:</Text>
        <Text style={styles.description}>Smart Motor Mechanic is the industry leader in mobile vehicle repair, maintenance, and inspection, offering 500+ services to consumers and fleets across Sri Lanka. </Text>
        <Text style={styles.description}>Our mission is to leverage technology to service any vehicle, any place, any time. We’ve built the mobility platform of the future, enabling us to service vehicles at the point of need, increase asset yield, and lower total cost.</Text>
      </View>   
      <View style={styles.paragaphContainer}>
        <Text style={styles.title}>Contact Us:</Text>
        <Text style={styles.description}>For fleet services and partnerships, contact: smart@MotorMechanic.com </Text>
        <Text style={styles.description}>For media inquiries, contact: +94 11256324 </Text>
        <Text style={styles.description}>To learn about becoming a technician on our platform visit: www.smartMotorMechanic.com/technician-jobs </Text>
      </View>
      <View style={styles.paragaphContainer}>
        <Text style={styles.bigTitle}>FAQ</Text>
        <Text style={styles.title}> How to add my service as a ‘Service Provider’?</Text>
        <Text style={styles.description}>Click on the ‘Add My Service’ Button.You will be then asked to provide a few details such as your Name, Address, Contact Numbers, NIC details and the nature of your service.Once the above details are entered press the ‘Send’ button. </Text>
        <Text style={styles.title}>I’m busy can I book a service provider?</Text>
        <Text style={styles.description}>Call us on 011 2563245. Within 24 hours Hodabass Customer Service will reply you with the details of available service providers. </Text>
       
      </View>
      <View style={{flex:1,marginTop:20,marginLeft:40}}>
         <TouchableOpacity onPress={()=>console.log("Rate this app")}><Text style={{fontSize:20,color:'#25DCE8'}}>Rate this App</Text></TouchableOpacity>
       </View>
      <View style={{marginBottom:50}}>

      </View>
    </ScrollView>
  );
};

export default SettingScreen;