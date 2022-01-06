import React,{useState,useEffect} from 'react';
import {Text,View,Modal,TouchableOpacity,ImageBackground} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ComingSoonScreen=({route,navigation})=>{
    const [visi, isVisible] = useState(false);
    
    useFocusEffect(() => {
        isVisible(true)
    });
    const _closeOnPress = () => {
        isVisible(false)
        navigation.navigate("Home")
    }

    return(
        <Modal transparent={true} visible={visi} >
                <View style={styles.modalBg}>
                    <View style={styles.modalView}>                       
                        <ImageBackground source={require("../../assest/images/splash.png")} style={styles.bgimage} resizeMode="stretch">
                            <TouchableOpacity style={styles.closeBtnView} onPress={_closeOnPress}>
                                <MaterialCommunityIcons name="close-thick" size={35} color="black" />
                            </TouchableOpacity>
                            <View style={styles.cardContainer}>
                                <Text style={styles.largeTxt}>COMING SOON</Text>                  
                            </View>
                        </ImageBackground>                       
                        
                    </View>
                </View>

        </Modal>

    )
}

export default ComingSoonScreen;