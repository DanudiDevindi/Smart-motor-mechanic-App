import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    CardContainer:{
        flexDirection:'row',
        marginTop:20,
        marginHorizontal:20,
        
    },
    imageContainer:{
        flex:0.43,
        alignItems:'center',
        justifyContent:'center',
        height:height/4
    },
    img:{
        width:'100%',
        height:'100%',
        borderRadius:5
    },
    txtContainer:{
        flex:0.57,
        // marginVertical:10,
        marginLeft:15,

    },
    title:{
        fontWeight:'700',
        fontSize:20,
        color:'#383838',
        marginBottom:10
    },
    blueSmallTxt:{
        fontWeight:'800',
        fontSize:15,
        color:'#1B17E1',

    },
    city:{
        fontWeight:'500',
        fontSize:15,
        marginTop:12,
        // lineHeight:8.35,
        color:'#726E6E',
        // marginBottom:17
    },
    priceTxt:{
        fontWeight:'800',
        fontSize:11,
        marginTop:8,
        // lineHeight:13.13,
        color:'#FF8546'
    },
    time:{
        color:'#726E6e',
        fontWeight:'800',
        fontSize:9,
        marginTop:5
    },
    rate:{
        fontWeight:'800',
        fontSize:18,
        color:'#FF8546',
    },
    timeContainer:{
        alignItems:'flex-end'

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
        // marginTop:25,
        backgroundColor:"rgba(255, 255, 255, 0.93)"     
    },
    closeBtnView:{
        alignItems:'flex-end',
        marginTop:20,
        marginRight:20
    },

});