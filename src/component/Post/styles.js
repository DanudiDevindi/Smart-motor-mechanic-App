import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    constainer:{
        borderRadius:10,
        backgroundColor:'#F4F4F4',
        marginTop:20,
    },
    name:{
        fontSize:11,
        fontWeight:"500",
        color:'#616161'
    },
    post_date:{
        fontSize:11,
        fontWeight:"500",
        color:'#A1A1A1'
    },
    title:{
        fontWeight:"bold",
        fontSize:18,
        color:'#25DCE8'
    },
    map:{
        flex:1,
        // width:width,
        // height:height
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
    img:{ 
        height: "75%", 
        width: "100%", 
        borderRadius: 6 
    },
    quectionContainer:{ 
        flex: 0.8, 
        backgroundColor: '#E3E3E3', 
        borderRadius: 5 
    },
    quection:{ 
        fontWeight: "600", 
        fontSize: 13, 
        lineHeight: 15.32, 
        color: 'black', margin: 12 
    },
    btnContainer:{
        flex: 0.5, 
        alignItems: 'flex-start', 
        marginRight: 5 
    }
    
});