import React from 'react';
import {Text,View} from 'react-native';

const ErrorMsg=({msg})=>{
    return(
        <Text style={{color:'red',marginBottom:5,fontSize:18}}>{msg}</Text>
    )    
}

export default ErrorMsg;