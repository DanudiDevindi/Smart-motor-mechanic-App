import {StyleSheet,Dimensions} from 'react-native';
const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({
    container:{
       flex:1 ,
        backgroundColor:'white'
    },
    choosePaymentContainer:{
        backgroundColor:'#F4F4F4',
        marginHorizontal:20,
        marginVertical:12
    },
    // paymentDetailContainer:{
    //     flex:0.5,
    //     justifyContent:'center'
    // },
    title:{
        fontWeight:'700',
        fontSize:15,
        color:'#726E6E',
        marginHorizontal:20,
        marginTop:5,
        marginBottom:5,marginTop:25
    },
    txtInput:{
        borderWidth:2, 
        borderColor:'#D6D6D6',
        borderRadius:5,
        height:28,
        marginRight:30,
        marginLeft:5,
        marginBottom:10
    },
    // txt:{
    //     fontWeight:'600',
    //     color:'#4C4C4C',
    //     fontSize:18,
    // },
    txt:{
        fontWeight:'600',
        color:'black',
        fontSize:18,
        marginBottom:10
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
    bottonView:{
        alignItems:'center',
      },
      msgTitle:{
        fontWeight:'500',
        fontSize:24,
        textAlign:'center',
        color:'#726E6E',
        marginBottom:30,
        width:width*0.7,
        borderWidth:1,
        borderColor:'#D6D6D6',
        borderRadius:10,
        paddingHorizontal:15,
      },
      summeryTxt:{
        marginHorizontal:20,
        fontSize:16,
        fontWeight:'600',
        color:'#4C4C4C',
        marginBottom:10
      },
      bankDMsg:{
          color:'grey',
          fontSize:15,
          margin:25,
          lineHeight:22,
          fontWeight:'bold'
      },
      accountDetails:{
          color:'black',
          fontSize:18,
          fontWeight:'700'

      }
});