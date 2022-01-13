import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    btnContainer:{
        backgroundColor:'#FF8546',
        borderRadius:5,
        textAlign:"center",
        height:36,
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        flexDirection:'row',
        marginTop:5
    },
    txt:{
        fontWeight:'700',
        fontSize:12,
        color:'#FFFFFF',
        marginLeft:5
    }
})