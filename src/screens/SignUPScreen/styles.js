import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:'white',
    },
    inputContainer:{
        justifyContent:'center',
        marginHorizontal:41,
        

    },
    btnContainer:{
      marginHorizontal:41,
    },
});