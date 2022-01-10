import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
      marginHorizontal:14 ,
      marginTop:14,
    },
    serchInPutTxt:{
      fontWeight:"600",
      fontSize:14,
      color:'black',
      marginLeft:8,
    },
    serchTxt:{
      fontWeight:'700',
      fontSize:14,
      color:'#FFFFFF',
     
    },
    modalBg:{
      backgroundColor:'#000000aa',
      flex:1,
      alignItems:'center'
      
      
  },
  modalView:{ 
      height:"100%",
      width:"100%",
      borderRadius:10,
      marginTop:25,
      backgroundColor:"rgba(255, 255, 255, 0.93)"     
  },
  closeBtnView:{
      alignItems:'flex-end',
      marginTop:20,
      marginRight:20
  },
  map: {
    width: "100%",
    height: '100%',
  }
});