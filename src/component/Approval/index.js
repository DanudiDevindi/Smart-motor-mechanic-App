import React,{useState} from 'react';
import {Text,View,Modal,TouchableOpacity} from 'react-native';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';


const Approval =({visible})=>{
    console.log(visible)
    const [vis,isVisible]=useState(visible)
    return(
        <Modal transparent={true} visible={visible}>   
            <View style={styles.modalBg}>      
                <View style={styles.modalView}>
                    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                        <Feather name="alert-circle" size={98} color="#726E6E"/>
                        <Text style={styles.msgTitle}>Wait for admin Approval</Text>
                    </View>
                    <TouchableOpacity style={styles.closeBtnView} onPress={()=>isVisible(false) }>
                        <AntDesign name="close" size={15} color="black" /> 
                    </TouchableOpacity> 
                </View>
            </View>
        </Modal>
    )
}

export default Approval;