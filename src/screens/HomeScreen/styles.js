import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
        // flex:1,
        flexDirection:'row',
        backgroundColor:'#f2f2f2',
    },
    cardContainer:{
        marginRight:8,
        marginLeft:13
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
    title:{
        fontWeight:'700',
        fontSize:15,
        color:'#726E6E',
        marginHorizontal:20,
        marginTop:5,
        marginBottom:5,
    },
    txtInput:{
        borderWidth:2, 
        borderColor:'#D6D6D6',
        borderRadius:5,
        // height:28,
        marginLeft:30,
        marginRight:20
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
        marginBottom:30
    }
});