import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
        marginBottom:40
    },
    largeTitle:{
        fontWeight:'400',
        fontSize:28,
        color:'#000000',
        marginBottom:10
    },
    smallTitle:{
        fontSize:13,
        color:'#000000'
    }
    
})