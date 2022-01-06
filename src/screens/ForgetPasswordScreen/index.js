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

    if(signup_data.isLoading){
        return (
         <LoadingIndicator/>   
        )
    }
    return(
        <View style={styles.container}>
        <View >
            {/* <Text style={styles.txt}>Enter Verification cord</Text> */}
            <Text style={styles.txt}>New Password</Text>
             <TextInput
                placeholder="Enter New Password"
                style={styles.txtInput}
                autoCapitalize="none"
                onChangeText={(val) => setSignUPData({
                    ...signup_data,
                    password: val,
                    password_error: ''
                })}
             />
             <ErrorMsg msg={signup_data.password_error} />
             <Text style={styles.txt}>Re-Type Password</Text>
                    <TextInput
                        placeholder="Confirm New Password"
                        style={styles.txtInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setSignUPData({
                            ...signup_data,
                            confirm_password: val,
                            confirm_password_error: ''
                        })}
                    />
                     <ErrorMsg msg={signup_data.confirm_password_error} />
             <View style={{marginTop:20}}>
                 <BigButton
                     onPress={post_data}
                     txt="Confirm Cord"
                 />
             </View>                
        </View>
     </View>
    )


}

export default ForgetPasswordScreen;