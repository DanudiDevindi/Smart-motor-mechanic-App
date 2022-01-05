import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:'white',
    //    marginHorizontal:41,
       justifyContent:'center'
    },
    inputContainer:{
        // flex:0.8,
        justifyContent:'center',
        marginHorizontal:41

    },
    btnContainer:{
        marginTop:80
    },
});