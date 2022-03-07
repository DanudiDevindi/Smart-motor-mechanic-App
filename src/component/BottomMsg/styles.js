import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
        flexDirection:'row', 
        justifyContent:'center',
        marginTop:24  
    },
    quection:{
        fontWeight:'700',
        fontSize:13, 
        color:'#616161' ,
        marginRight:10    
    },
    link:{
        fontWeight:'700',
        fontSize:14,
        color:'#616161'
    }
});