import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    CardContainer:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#e6e6e6',
        borderRadius:10,
        // height:height/5,

    },
    imageContainer:{
        flex:0.4,
        alignItems:'center',
        justifyContent:'center',        

    },
    img:{
        width:'85%',
        height:'85%',
        borderRadius:10
    },
    txtContainer:{
        flex:0.6,
        marginVertical:10,
        marginLeft:20,
        marginRight:10
    },
    title:{
        fontWeight:'700',
        fontSize:20,
        // lineHeight:17.9,
        color:'#383838',
        // marginVertical:10
    },
    blueTxt:{
        fontWeight:'800',
        fontSize:10,
        lineHeight:10,
        color:'#1B17E1',
        marginTop:5

    },
    city:{
        fontWeight:'500',
        fontSize:15,
        color:'#726E6E',
        marginTop:5
    },
    rate:{
        fontWeight:'800',
        fontSize:18,
        color:'#25DCE8',
        marginTop:15
    },
    time:{
        color:'#726E6e',
        fontWeight:'800',
        fontSize:11,
        lineHeight:12.35,
        
    },
    
    timeContainer:{
        alignItems:'flex-end'

    }

});