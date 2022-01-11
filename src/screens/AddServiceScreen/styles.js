import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    item: {
        // width:"80%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        flexDirection: "row",
    },
    checkBoxTxt: {
        marginLeft: 20
    },
    container:{
        
    },
    title:{
        fontWeight:'700',
        fontSize:15,
        color:'#726E6E',
        // marginHorizontal:40,
        marginTop:5,
        marginBottom:5,
    },
    txtInput:{
        borderWidth:2, 
        borderColor:'#D6D6D6',
        borderRadius:5,
        paddingLeft:15
        // height:28,
        // marginLeft:60,
        // marginRight:20
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
        // marginBottom:30
    },
    modalBg:{
        backgroundColor:'#000000aa',
        flex:1,
        justifyContent: 'center'
    },
    modalView:{
        backgroundColor:'rgba(255, 255, 255, 0.93)',
        marginHorizontal:28,        
        height:359,
        borderRadius:20      
    },
    closeBtnView:{
        alignItems:'flex-end',
        marginTop:20,
        marginRight:20
    },
    msgTitle:{
        fontWeight:'500',
        fontSize:24,
        // lineHeight:22.7,
        textAlign:'center',
        color:'#726E6E',
        marginBottom:30,
        marginTop:20
      },
});