import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
    },
    paragaphContainer:{
        marginHorizontal:20,
        marginTop:20,
        backgroundColor:'#F5F5F5',
        borderRadius:5
    },
    bigTitle:{
       fontWeight:'700',
       fontSize:25,
       color:'#726E6E' ,
       marginTop:10,
       marginLeft:10
    },
    title:{
        margin:10,
        color:'#726E6E',
        fontWeight:'700',
        fontSize:15
    },
    description:{
        marginHorizontal:10,
        marginBottom:10,
        color:'black',
        fontWeight:'400',
        fontSize:13,
        lineHeight:15.51
    }
});

