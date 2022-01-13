import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
        bottom:0,
        height:50,
        width:'100%',
        position:'absolute',
        flexDirection:'row'
    },
    txtInputContainer:{
        height:40,
        width:'80%',
        borderRadius:10,
        backgroundColor:'#e6e6e6',
        marginLeft:20
    },
    sendIconContainer:{
        width:'20%',
        marginLeft:10,
        justifyContent:'center'
    },
    chat:{
        width:width/2+10,
        marginHorizontal:10
    },
    txtMsg:{
        padding:20
    }
});