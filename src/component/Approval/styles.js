import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
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
        // marginTop:5,
        marginRight:20
    },
    bottonView:{
        alignItems:'center',
      },
      msgTitle:{
        fontWeight:'500',
        fontSize:24,
        lineHeight:22.7,
        textAlign:'center',
        color:'#726E6E',
        marginHorizontal:80,
        marginTop:30
      },
});