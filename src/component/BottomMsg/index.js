import React from 'react';
import {Text,View,TouchableOpacity, Touchable} from 'react-native';
import { styles } from './styles';

const BottomMsg=({quection,link,onPress})=>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.quection}>{quection}</Text>
            <Text style={styles.link}>{link}</Text>
        </TouchableOpacity>
    )
}

export default BottomMsg;