import React from 'react';
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native';

const PopupCloseBtn = ({route,navigation}) => {
    return (
        <TouchableOpacity style={styles.closeBtnView}>
            <AntDesign name="close" size={25} color="black" />
        </TouchableOpacity>
    )
}

export default PopupCloseBtn;

const styles=StyleSheet.create({
    closeBtnView:{
        alignItems:'flex-end',
        marginTop:20,
        marginRight:20
    },
})