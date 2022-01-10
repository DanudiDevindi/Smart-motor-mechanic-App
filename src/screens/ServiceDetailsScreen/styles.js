import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    desContainer:{
        marginHorizontal:20,
        backgroundColor:'#F5F5F5',
        marginTop:10
    },
    desTitle:{
        margin:10,
        fontWeight:'700',
        fontSize:18,
        color:'#726E6E'
    },
    des:{
        fontWeight:'400',
        fontSize:18,
        color:'black',
        marginHorizontal:10,
        marginBottom:10,
        lineHeight:22,
        marginTop:5

    },
    findAreaContainer:{
        marginHorizontal:20,
        marginTop:20,
    },
    findAreaTxt:{
        fontWeight:'600',
        fontSize:18,
        color:'black'
    },
    mapImg:{
        height:113,
        width:"100%",
        marginTop:5
    },
    btnContainer:{
        marginHorizontal:20,
        marginBottom:10,
        marginTop:20,
        // height:100,
        flex:1,
        flexDirection:'row',
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