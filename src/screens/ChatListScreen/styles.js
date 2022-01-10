import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    CardContainer:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#e6e6e6',
        borderRadius:10,
        height:height/10,
        margin:10
    },
    sideContainer:{
        flex:0.2,
        alignItems:'center',
        justifyContent:'center',       

    },
    txtContainer:{
        flex:0.6,
        marginVertical:10,
        marginHorizontal:5,
    },
    img:{
        width:60,
        height:60,
        borderRadius:10,
        margin:5
    },
   
});