import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({   
  
    txt:{
        fontSize:14,
        fontWeight:'600',
        color:'#4C4C4C',
    },
    txtInput:{
        borderWidth:1,
        borderColor:'#D6D6D6',
        lineHeight:18,
        borderRadius:10,
        fontSize:15,
        marginTop:5,
        paddingHorizontal:15
    }
});