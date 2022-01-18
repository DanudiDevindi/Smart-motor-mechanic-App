import React,{useEffect,useState} from 'react';
import {Text,View} from 'react-native';
import moment from "moment";

const Answer =({answerDetails,isCreated})=>{
    const [timeDiff,setTimeDiff]=useState('')
    console.log(12)
    
    const time_calculate=()=>{
        console.log(4445555)
        var secondTime=Date.now();
        var firstTime=answerDetails.createAt
        var diff = moment.duration(moment(secondTime).diff(moment(firstTime)));
        var years=moment().diff(firstTime, 'years')
        var days = parseInt(diff.asDays());
        var hours = parseInt(diff.asHours());
        hours = hours - days*24;
        var minutes = parseInt(diff.asMinutes());
        minutes = minutes - (days*24*60 + hours*60)
        console.log("yrs "+years+' months '+days+" hours "+hours+" min "+minutes)
        if(years>0){
            setTimeDiff(years+' years ago')
        }
        else if(days>0){
            setTimeDiff(days+' days ago')
        }else if(hours>0){
            setTimeDiff(hours+' hours ago')
        }else if(minutes>0){
            console.log(minutes)
            setTimeDiff(minutes+' minutes ago')
        }else{
            setTimeDiff('Just now') 
        }    
    }
    useEffect(() => {
        time_calculate()
    }, []);
    return(
        <View style={{backgroundColor:'white',marginTop:10,borderRadius:15}}>
            {isCreated===true?
                <View style={{margin:10}}>
               
                <Text style={{fontWeight:'500',fontSize:12,color:'#858484'}}>{answerDetails.user_name}</Text>
                <Text style={{fontWeight:"600",fontSize:10,color:"#C4C4C4"}}>Answered {timeDiff}</Text>
                <Text style={{fontWeight:'500', fontSize:16,color:"#505050",marginTop:8}}>{answerDetails.answer}</Text>
            </View>:
            <View style={{margin:10}}>
               
            <Text style={{fontWeight:'500',fontSize:12,color:'#858484'}}>{answerDetails.user_name}</Text>
            <Text style={{fontWeight:"600",fontSize:10,color:"#C4C4C4"}}>Answered {timeDiff}</Text>
            <Text style={{fontWeight:'500', fontSize:16,color:"#505050",marginTop:8}}>{answerDetails.answer}</Text>
        </View>
            }
            
        </View> 
    )
}

export default Answer;