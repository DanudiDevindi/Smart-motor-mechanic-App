import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white' ,
             
    },
    topContainer:{
        alignItems:'center',
        marginTop:25
    },
    bottomContainer:{
        marginHorizontal:40,
        marginBottom:50,
        marginTop:50
    },    
    imgContainer:{
        alignItems:'center',
    },
    btnContainer:{
        flex:0.6,
    },
    addPhotoTxt:{
        fontWeight:'600',
        fontSize:15,
        color:'#383838',
        marginTop:10
    },
    mapImg:{
        height:113,
        width:"100%",
        marginTop:5
    },
    name:{
        fontWeight:'bold',
        fontSize:20,
        color:'black',
        marginTop:10 
      },
      position:{
        fontWeight:'bold',
        fontSize:17,
        color:'black' ,
        // marginTop:5  
      },
      place:{
        fontWeight:"800",
        fontSize:13,
        color:'#999999' 
     },
    
});