import * as React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import api from '../../api/jsonServer';
import { styles } from './styles';
import ErrorMsg from '../../component/ErrorMsg';
import BigButton from '../../component/BigButton';
import LoadingIndicator from '../../component/LocationIndicator'

const ForgetPasswordScreen=({route,navigation})=>{

    const { email } = route.params;
    const [signup_data, setSignUPData] = React.useState({
        password: '',
        confirm_password: '',
        password_error: '',
        confirm_password_error: '',
        isLoading:false
    });
    const post_data = () => {
        if (signup_data.password === "" || signup_data.confirm_password === "") {
            setSignUPData({
                ...signup_data,
                password_error: signup_data.password === "" ? "Password cannot be empty" : "",
                confirm_password_error: signup_data.confirm_password === "" ? "Password confimation failed" : "",
            });
        } else if (signup_data.password.trim().length <= 8) {
            setSignUPData({
                ...signup_data,
                password_error: "Password must be 8 Charactor length",
            })
        } else if (signup_data.password !== signup_data.confirm_password) {
            setSignUPData({
                ...signup_data,
                confirm_password_error: "Password not match",
            })
        } else {
            console.log(123)
            const data = {
                email: email,
                password: signup_data.password
            }
            setSignUPData({
                ...signup_data,
                isLoading:true
            })
            api.post('/resetForgetPassword', data).then((response) => {
                if (response.data.err === false) {
                    console.log(77777)
                    setSignUPData({
                        ...signup_data,
                        isLoading:false
                    })
                    navigation.navigate("SignIn")
                } else {
                    console.log(8888)
                    
                }
            }).catch((err) => {
                setSignUPData({
                    ...signup_data,
                    msg: response.data.message
                })
            })
        }
    }


}

export default ForgetPasswordScreen;