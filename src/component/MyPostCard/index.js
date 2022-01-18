import React from 'react';
import {Text,View,Image,TouchableOpacity,Alert} from 'react-native';
import { styles } from './styles';
import imgUrl from '../../api/imageURL';
import api from '../../api/jsonServer';

const MyPostCard=({quec,onEditPress,onDeletePress})=>{
    
    return(
        <View style={styles.CardContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.img} source={{ uri:imgUrl+quec.image}}/>
            </View>
            <View style={styles.txtContainer}>
                <Text style={styles.title}>{quec.title}</Text>
                <Text style={styles.position}>{quec.quection}</Text>
                {/* <Text style={styles.blueTxt}>{quec.category}</Text> */}
                <View style={styles.timeContainer}>
                    <TouchableOpacity onPress={onEditPress}>
                        <Text style={{color:'blue',marginBottom:10,fontSize:20}}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDeletePress}>
                        <Text style={{color:'red',fontSize:20}}>Delete</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        </View>
    )
}

export default MyPostCard;