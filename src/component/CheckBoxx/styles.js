import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({  
    container:{
       flexDirection:'row',
    },
    checkBox:{
        color:'#25DCE8',
        borderRadius:5
    },
    txt:{
        fontWeight:'500',
        fontSize:14,
        color:'#999999',
        top:5
    }
})