import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
        
    },
    topContainer:{
        // flex:0.6,
        alignItems:'center'


    },
    bottomContainer:{
        // flex:0.4,
        borderRadius:10,
        marginHorizontal:11,
        marginTop:11,
        marginBottom:50
    },
    imgContainer:{
        width:162,
        height:162,
        marginTop:20

    },
    img:{
        height:"100%",
        width:'100%',
        borderRadius:100,
    },
    name:{
      fontWeight:'800',
      fontSize:20,
      color:'black',
      marginTop:10 
    },
    position:{
      fontWeight:'800',
      fontSize:17,
      color:'black' ,
      marginTop:5  
    },
    verified:{
        fontWeight:'800',
        fontSize:13,
        color:"#1B17E1"
    },
    place:{
       fontWeight:"800",
       fontSize:15,
       color:'#999999' 
    },
    findAreaTxt:{
        fontWeight:'bold',
        fontSize:17,
        color:'black'
    },
    mapImg:{
        height:113,
        width:"100%",
        marginTop:5
    },
    des:{
      fontWeight:'400',
      fontSize:15,
      color:'black',
      lineHeight:17.51,
      marginTop:5 
    },
    contactTxt:{
        fontWeight:"700",
        fontSize:15,
        lineHeight:17.32,
        color:"#4B4A4A",
        marginLeft:5,
    },
    modalBg:{
        backgroundColor:'#000000aa',
        flex:1,
        alignItems:'center'
        
        
    },
    modalView:{ 
        height:"94%",
        width:"92%",
        borderRadius:10,
        marginTop:25,
        backgroundColor:"rgba(255, 255, 255, 0.93)"     
    },
    closeBtnView:{
        alignItems:'flex-end',
        marginTop:20,
        marginRight:20
    },
    map:{
        flex:1,
        // width:width,
        // height:height
    },
});