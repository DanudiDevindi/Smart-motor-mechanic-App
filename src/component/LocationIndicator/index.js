import React from 'react';
import { Text, ActivityIndicator, View, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

const LoadingIndicator = () => {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size='large' color="#25dce8"/>
        </View>
    )
}

export default LoadingIndicator;