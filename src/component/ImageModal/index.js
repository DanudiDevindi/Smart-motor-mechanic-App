import React,{useState,useEffect} from 'react';
import {Text,View,Modal,TouchableOpacity,Image} from 'react-native';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather'

const Approval =({visible,image})=>{
    console.log(visible)
    const [vis,isVisible]=useState(true)

    useEffect(() => {
        isVisible(visible)
        
      }, []);
    console.log(vis)
    return(
        <Modal transparent={true} visible={vis}>   
            <View style={styles.modalBg}>      
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeBtnView} onPress={()=>isVisible(false) }>
                        <AntDesign name="close" size={15} color="black" /> 
                    </TouchableOpacity> 
                    <Image style={styles.img} source={{ uri:image}}/>
                </View>
            </View>
        </Modal>
    )
}

export default Approval;