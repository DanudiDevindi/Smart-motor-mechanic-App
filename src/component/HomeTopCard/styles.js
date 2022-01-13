import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
        flex:0.25,
        borderRadius:5,
        backgroundColor:'black',
        height:178,
        marginTop:24,
        marginRight:5
    },    
    txt:{
        color:'white',
        fontSize:16,
        fontWeight:'800',
        textAlign:'center',
    },
    bgImage:{
        width:'100%',
        height:'100%',
        flex:1,
    }
})