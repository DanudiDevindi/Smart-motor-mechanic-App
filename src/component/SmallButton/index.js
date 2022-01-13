import React from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import { styles } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SmallButton =({onPress,txt,icon})=>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
            <Ionicons name={icon} size={10} color="white"/>
            <Text style={styles.txt}>{txt}</Text>
        </TouchableOpacity>
    );
}

export default SmallButton;