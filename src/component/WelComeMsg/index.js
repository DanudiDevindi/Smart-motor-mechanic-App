import React from 'react';
import {Text,View} from 'react-native';
import { styles } from './styles';

const WelComeMsg=({msg})=>{
    return(
        <View style={styles.container}>
            <Text style={styles.largeTitle}>Hello, Welcome !</Text>
            <Text style={styles.smallTitle}>{msg}</Text>
        </View>
    )
}

export default WelComeMsg;