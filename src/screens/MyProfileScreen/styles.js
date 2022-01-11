import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white' ,
             
    },
    topContainer:{
        flex:0.3,
        flexDirection:'row',
        // marginHorizontal:40,
        marginTop:20  

    },
    bottomContainer:{
        // flex:0.4,
        borderRadius:10,
        // marginHorizontal:11,
        marginTop:15,
        marginBottom:50,
        backgroundColor:'#EEEEEE'
    },    
    imgContainer:{
        flex:0.5,
        alignItems:'center'
    },
    btnContainer:{
        flex:0.5,
    },
    addPhotoTxt:{
        fontWeight:'700',
        fontSize:15,
        color:'#383838',
        marginTop:5
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
     findAreaTxt:{
        fontWeight:'bold',
        fontSize:17,
        color:'black'
    },
    
});