import React, { useState } from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import WelComeMsg from '../../component/WelComeMsg';
import InputField from '../../component/InputField';
import BigButton from '../../component/BigButton';
import CheckBoxx from '../../component/CheckBoxx';
import BottomMsg from '../../component/BottomMsg';
import { AuthContext } from '../../context/context';
import api from '../../api/jsonServer';
import ErrorMsg from '../../component/ErrorMsg';
import LoadingIndicator from '../../component/LocationIndicator';
import {AddUser} from '../../Firebase/Users';
import Firebase from '../../Firebase/firebaseSDK';
import { LoginUser } from '../../Firebase/LoginUser';

const SignINScreen = ({ navigation }) => {
    const [data, setData] = useState({
        username: '',
        username_err: '',
        password: '',
        password_err: '',
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        server_err: '',
        // showIndicator: false,
        isLoading:false
    });

    const { signIn } = React.useContext(AuthContext);

    const loginHandle = () => {
        console.log(new Date())
        if (data.email == '' || data.password === '') {
            setData({
                ...data,
                username_err: data.username === "" ? "Please Enter user name" : "",
                password_err: data.password === "" ? "Please Enter password" : "",
            });
        } else {
            setData({
                ...data,
                isLoading: true
            })
            LoginUser(data.username,data.password).then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
            api.post('/user_login', data).then((response) => {
                if (response.data.err === false) {
                    const token = response.data.token;
                    const id = response.data.id;
                    const foundUser = [token, id]
                    signIn(foundUser);
                } else {
                    if (response.data.err === false) {
                        if(response.data.active==="yes"){
                            const token = response.data.token;
                            const id = response.data.id;
                            const foundUser = [token, id]
                            signUp(foundUser);
                        }else{
                            setData({
                                ...data,
                                server_err: "Account is not Active",
                                isLoading:false
                            }); 
                        }                        
                    } else {
                        setData({
                            ...data,
                            server_err: "Invalid email or password",
                            isLoading:false
                        });
                    }
                }
            }).catch((err) => {
                setData({
                    ...data,
                    server_err: "Server Error",
                    isLoading: false
                });
            })
        }
    }

    

    if(data.isLoading){
        return (
         <LoadingIndicator/>   
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                {/* <TouchableOpacity onPress={paypalIntegrate}><Text>Paypal</Text></TouchableOpacity> */}
                <WelComeMsg
                    title="Hello! Welcome"
                    msg="Please sign up to Continue"
                />
                <InputField
                    title="Email"
                    placeholder="Enter Email"
                    onChangeText={(val) => setData({
                        ...data,
                        username: val,
                        username_err: ''
                    })}
                />
                <ErrorMsg msg={data.username_err} />
                <InputField
                    title="Password"
                    placeholder="Enter Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    onChangeText={(val) => setData({
                        ...data,
                        password: val,
                        password_err: ''
                    })}
                />
                <ErrorMsg msg={data.password_err} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.5 }}>
                        <CheckBoxx txt="Remember me" />
                    </View>
                    <TouchableOpacity style={{ flex: 0.5, alignItems: 'flex-end' }} onPress={() => navigation.navigate('Reset')}>
                        <Text style={{ fontWeight: '500', color: '#1B17E1', fontSize: 14, top: 5, }}>Forgot  Password ?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <Text style={{ color: 'red', marginBottom: 10 }}>{data.server_err}</Text>
                    <BigButton
                        onPress={loginHandle}
                        txt="Sign In"
                    />
                    <BottomMsg
                        quection="Don’t have an account ?"
                        link="Register"
                        onPress={() => navigation.navigate("SignUp")}
                    />
                </View>
            </View>
        </View>
    )
}

export default SignINScreen;