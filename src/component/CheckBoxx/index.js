import React from 'react';
import { View, Text} from 'react-native';
import { styles } from './styles';
import CheckBox from '@react-native-community/checkbox';

const CheckBoxx =({txt,value,onValueChange})=>{
    return(
        <View style={styles.container}>
            
            <CheckBox 
               
                disabled={false}
                style={styles.CheckBox}
                value={value}
                onValueChange={onValueChange}
            />
            <Text style={styles.txt}>{txt}</Text>            
        </View>
    )
}

export default CheckBoxx;