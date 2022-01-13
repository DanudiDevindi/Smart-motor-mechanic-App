import React from 'react';
import {Text,View,ImageBackground,TouchableOpacity} from 'react-native';
import { styles } from './styles';

const HomeTopCard = ({vehi,vehiCount,img,onPress})=>{
    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <ImageBackground style={styles.bgImage} source={img} imageStyle={{opacity: 0.6}}>
                <View style={{marginTop:"10%"}}>
                <Text style={styles.txt}>{vehi}</Text>
                <Text style={styles.txt}>({vehiCount})</Text>
                </View>
                
            </ImageBackground>            
        </TouchableOpacity>
        
    )
}

export default HomeTopCard;