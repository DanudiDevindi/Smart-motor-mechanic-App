import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:'white',
       justifyContent:'center',
       alignItems:'center'
    },
    txt:{
        fontWeight:'600',
        color:'#4C4C4C',
        fontSize:18,
    },
    txtInput:{
        width:width*0.8,
        borderWidth:1,
        borderColor:'#D6D6D6',
        borderRadius:10,
        fontSize:20,
        marginTop:10,
        paddingHorizontal:15

    }
    // inputContainer:{
    //     // flex:0.8,
    //     justifyContent:'center',
    //     marginHorizontal:41

    // },
    // btnContainer:{
    //     marginTop:80
    // },
});