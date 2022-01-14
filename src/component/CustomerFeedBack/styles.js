import {StyleSheet,Dimensions} from 'react-native';

const {width,height}=Dimensions.get("screen");

export const styles=StyleSheet.create({ 
    container:{
        flex:1,padding:10,
        justifyContent:'center'

    },
    customRatingBar:{
        justifyContent:'center',
        flexDirection:'row'
    },
    modalBg:{
        backgroundColor:'#000000aa',
        flex:1,
        alignItems:'center',
        justifyContent:'center'
        
        
    },
    modalView:{ 
        height:350,
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
    progress: {
        margin: 10,
        backgroundColor:'red'
      },

});