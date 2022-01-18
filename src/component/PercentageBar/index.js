import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const PercentageBar = ({
  navigation,
  percentage,
  height,
  backgroundColor,
  completedColor,
}) => {
  return (
    <View style={{ justifyContent: 'center',flexDirection:'row',marginHorizontal:15 }}>
      <View
        style={{ width: '100%', height: height, marginVertical: 10, borderColor: backgroundColor, borderWidth: 2, flexDirection: 'row',alignItems:'center' }}
      >
        <View
          style={{
            width: percentage,
            height: height,
            backgroundColor: completedColor,
          }}
        />
      </View>
      <Text style={{marginLeft:10,fontSize:12,marginTop:5,color:'black'}}>{parseInt(percentage)}%</Text>
    </View>

  );
};
export default PercentageBar