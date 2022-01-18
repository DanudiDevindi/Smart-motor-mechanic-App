import React from 'react';
import {Text,View,Image,TouchableOpacity,Alert} from 'react-native';
import { styles } from './styles';
import imgUrl from '../../api/imageURL';
import api from '../../api/jsonServer';

const Servicecard=({service,onEditPress,onDeletePress, type,navigation})=>{
    
    return(
        <View style={styles.CardContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.img} source={{ uri:imgUrl+service.image}}/>
            </View>
            <View style={styles.txtContainer}>
                <Text style={styles.title}>{service.title}</Text>
                <Text style={styles.position}>{service.description}</Text>
                <Text style={styles.blueTxt}>{service.category} for {service.service_type}</Text>
                <Text style={styles.rate}>Rs. {service.price}</Text>
                {service.isApproved==="yes"?
                <Text style={{marginTop:10,fontWeight:'700',fontSize:18,color:'green'}}>Admin Service Approved</Text>:
                <Text style={{marginTop:10,fontWeight:'700',fontSize:18,color:'red'}}>Wait for Admin Approve</Text>}
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

export default Servicecard;