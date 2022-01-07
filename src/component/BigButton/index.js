import React from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import { styles } from './styles';

const BigButton =({onPress,txt})=>{
    return(
        <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
            <Text style={styles.txt}>{txt}</Text>
        </TouchableOpacity>
    );
}

export default BigButton;