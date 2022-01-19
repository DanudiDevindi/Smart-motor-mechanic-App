import React, { useState } from "react";
import {Text, StyleSheet, View,TouchableOpacity, Alert, ImagePickerIOS } from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImagePicker = (txt) => {
  const showAlert = () =>{
    Alert.alert(
      'Service Image',
      'Take Image or Choose Image',
      [
        {
          text: 'Choose from Library',
          onPress: () => launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
              console.log(response)
            })
            
        },
        {
          text: 'Take Photo',
          onPress: () => launchCamera(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
              console.log(response)
            },),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
 }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress = {showAlert} style = {styles.button}>
         <Text>{txt}</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default ImagePicker;