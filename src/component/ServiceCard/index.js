import React,{useState,useEffect} from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import { styles } from './styles';
import imgUrl from '../../api/imageURL';
import moment from "moment";

const Servicecard=({service,onPress})=>{
    const [timeDiff,setTimeDiff]=useState('')
    useEffect(() => {
        time_calculate()
    }, []);

    const time_calculate=()=>{
        var secondTime=Date.now();
        var firstTime=service.createAt
        var diff = moment.duration(moment(secondTime).diff(moment(firstTime)));
        var years=moment().diff(firstTime, 'years')
        var days = parseInt(diff.asDays());
        var hours = parseInt(diff.asHours());
        hours = hours - days*24;
        var minutes = parseInt(diff.asMinutes());
        minutes = minutes - (days*24*60 + hours*60)
        if(years>0){
            setTimeDiff(years+' years ago')
        }
        else if(days>0){
            setTimeDiff(days+' days ago')
        }else if(hours>0){
            setTimeDiff(hours+' hours ago')
        }else if(minutes>0){
            setTimeDiff(minutes+' minutes ago')
        }else{
            setTimeDiff('Just now') 
        }    
    }
    return(
        <TouchableOpacity style={styles.CardContainer} onPress={onPress}>
            <View style={styles.imageContainer}>
                <Image style={styles.img} source={{ uri:imgUrl+service.image}}/>
            </View>
            <View style={styles.txtContainer}>
                <Text style={styles.title}>{service.title}</Text>
                <Text style={styles.blueTxt}>Verified Member</Text>
                <Text style={styles.city}>{'Horana'}</Text>                
                <Text style={styles.rate}>Rs. {service.price} per {service.price_set_as}</Text>
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{timeDiff}</Text>
                    {service.isTop ?<Text style={styles.blueTxt}>TOP Service</Text>: null}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Servicecard;