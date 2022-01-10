import React from 'react';
import {Text,View,TextInput} from 'react-native';
import { styles } from './styles';

const InputField =({title,placeholder, numberOfLines,keyboardType,onChangeText,value,secureTextEntry})=>{
    return(
        <View style={styles.container}>
            <Text style={styles.txt}>{title}</Text>
            {secureTextEntry===true?
            <TextInput 
                
            clearButtonMode="always"
            numberOfLines={numberOfLines}
            placeholder={placeholder} 
            keyboardType={keyboardType}
            style={styles.txtInput} 
            onChangeText={onChangeText} 
            value={value} 
            secureTextEntry={secureTextEntry}
        />:
        <TextInput 
                multiline={true}
                clearButtonMode="always"
                numberOfLines={numberOfLines}
                placeholder={placeholder} 
                keyboardType={keyboardType}
                style={styles.txtInput} 
                onChangeText={onChangeText} 
                value={value} 
                secureTextEntry={secureTextEntry}
            />
        }
            
        </View>
    )
}

export default InputField;