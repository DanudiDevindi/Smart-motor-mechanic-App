import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
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
    bgimage:{
        flex:1,        
    },
    cardContainer:{
        
        alignItems:'center',
        marginTop:width/2,
        flex:1
    },
    largeTxt:{
        fontWeight:'700',
        fontSize:48, 
        color:'#000000'       
    },
    title:{
        fontWeight:'700',
        fontSize:15,
        color:'#726E6E',
        marginTop:5,
        marginBottom:5,
    },
    txtInput:{
        borderWidth:2, 
        borderColor:'#D6D6D6',
        borderRadius:5,
    },
    imgContainer:{
        height:113,
        width:154,
        borderRadius:4,
        borderWidth:1,
        borderColor:'#D6D6D6',
        marginTop:5
    },
    imageFooterTxt:{
        fontWeight:'400',
        fontSize:9.64,
        color:'black',
        
    }
});