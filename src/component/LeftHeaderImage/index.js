import React from 'react';
import {Text,View,Image,TouchableOpacity,} from 'react-native';

const LeftHeaderImage=({onPress})=>{
    
    return(
        <TouchableOpacity onPress={onPress} style={{width:65,height:40,right:20}}>
            <Image source={require("../../assest/images/logo-01.png")} style={{width:'100%',height:'100%'}}/>
        </TouchableOpacity>        
    )
}

export default LeftHeaderImage;