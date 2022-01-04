import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
        flex:1 
    },
    bgimage:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    cardContainer:{
        justifyContent:'center',
        alignItems:'center'

    },
    img:{
        width:158,
        height:152
    },
    largeTxt:{
        marginTop:40,
        fontWeight:'700',
        fontSize:48, 
        color:'#000000'       
    },
    smallTxt:{
        // marginTop:22,
        marginTop:10,
        fontSize:15,
        fontWeight:'700',
        color:'#EEEEEE'
    }
});