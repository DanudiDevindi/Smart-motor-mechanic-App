import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text,Image } from 'react-native';
// import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = ({ color, tab, onPress, icon }) => {
  return (
      <TouchableOpacity  onPress={onPress} style={styles.container}>
      {icon===null?  <Image source={require("../assest/images/help.png")} style={{width:70,height:70,}}/>: 
        <View style={{alignItems:'center',marginTop:30}}>
          <MaterialIcons name={icon} size={28} color={color} /> 
        </View>    
             
      } 
      </TouchableOpacity>     
  );
};

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

export default Tab;