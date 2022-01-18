import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    CardContainer:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#e6e6e6'

    },
    imageContainer:{
        flex:0.5,
        alignItems:'center',
        justifyContent:'center'

    },
    img:{
        width:'90%',
        height:'90%'
    },
    txtContainer:{
        flex:0.6,
        marginVertical:10,
        marginLeft:10,
        marginRight:10

    },
    title:{
        fontWeight:'700',
        fontSize:15,
        lineHeight:17.9,
        color:'#383838'
    },
    blueTxt:{
        fontWeight:'800',
        fontSize:13,
        lineHeight:15,
        color:'#1B17E1',
        marginTop:5

    },
    position:{
        fontWeight:'500',
        fontSize:15,
        lineHeight:18,
        color:'#726E6E',
        marginTop:10
    },
    priceTxt:{
        fontWeight:'800',
        fontSize:15,
        lineHeight:18,
        color:'#FF8546',
       
    },
    time:{
        color:'#726E6e',
        fontWeight:'800',
        fontSize:9,
        lineHeight:8.35,
        
    },
    rate:{
        fontWeight:'800',
        fontSize:15,
        color:'#FF8546',
        marginTop:7
    },
    timeContainer:{
        alignItems:'flex-end',
        marginVertical:15,
        marginRight:15,
        

    }

});