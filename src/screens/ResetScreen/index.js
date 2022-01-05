import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { styles } from './styles';
import BigButton from '../../component/BigButton';
import { AuthContext } from '../../context/context';
import api from '../../api/jsonServer';
import ErrorMsg from '../../component/ErrorMsg';
import LoadingIndicator from '../../component/LocationIndicator';


const ResetScreen = ({ route, navigation }) => {

    const [data, setData] = React.useState({
        email: '',
        erroEmail: '',
        isLoading: false
    });

    const resetHandle = () => {
        console.log("Reset01")
        if (data.email === '') {
            console.log("Reset02")
            setData({ erroEmail: "Enter valid email address to prove you are real" })
        } else {
            console.log("Reset03")
            console.log(data.email)
            setData({
                ...data,
                isLoading: true
            })
            api.get('reset/' + data.email + '/forgot').then(response => {
                setData({
                    ...data,
                    isLoading: false
                })
                console.log(response.data)
                if (response.data.err === false) {
                    console.log("Reset04")
                    const data1 = {
                        cord: response.data.cord,
                        email: data.email,
                        type: 'forget'
                    }
                    navigation.navigate('Cord', { signData: data1 });
                } else {
                    console.log("Reset05")
                    setData({ erroEmail: response.data.message })
                }
            }).catch((err) => {
                console.log("Reset06")
                console.log(err)
                // setData({erroEmail:err})
            })
        }
    }




}

export default ResetScreen;