import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    btnContainer:{
        backgroundColor:'#FF8546',
        borderRadius:5,
        textAlign:"center",
        height:46,
        alignItems:'center',
        justifyContent:'center'
    },
    txt:{
        fontWeight:'700',
        fontSize:14,
        color:'#FFFFFF'
    }
})