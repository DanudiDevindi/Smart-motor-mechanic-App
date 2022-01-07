import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({  
    container:{
        // flex:1,
        flexDirection:'row',
    },
    checkBox:{
        color:'green',
        borderRadius:5
    },
    txt:{
        fontWeight:'500',
        fontSize:14,
        color:'#999999',
        top:5
    }
})