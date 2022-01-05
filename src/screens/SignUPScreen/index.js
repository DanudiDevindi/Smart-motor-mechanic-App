import React, { useContext } from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { AuthContext } from '../../context/context';
import WelComeMsg from '../../component/WelComeMsg';
import InputField from '../../component/InputField';
import BigButton from '../../component/BigButton';
import CheckBoxx from '../../component/CheckBoxx';
import BottomMsg from '../../component/BottomMsg';
import api from '../../api/jsonServer';
import ErrorMsg from '../../component/ErrorMsg';
import Feather from "react-native-vector-icons/Feather";
import moment from "moment";
import LoadingIndicator from '../../component/LocationIndicator';
import { SignUpUser } from '../../Firebase/SignUp';
import {AddUser} from '../../Firebase/Users';
import Firebase from '../../Firebase/firebaseSDK'

const SignINScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        contact_no: '',
        username: '',
        contact_no_error: '',
        confirm_password: '',
        username_error: '',
        email_error: '',
        password_error: '',
        confirm_password_error: '',
        server_err: '',
        secureTextEntry: true,
        showIndicator:false,
        createAt:Date.now()
    });

    const { signUp } = React.useContext(AuthContext);

    const post_data = () => {
        
        let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (data.email === '' || data.password === '' || data.username === '' || data.confirm_password === '' || data.contact_no==='') {
            console.log(1)
            setData({
                ...data,
                username_error: data.username === "" ? "Username cannot be empty" : "",
                email_error: data.email === "" ? "Email cannot be empty" : "",
                password_error: data.password === "" ? "Password cannot be empty" : "",
                confirm_password_error: data.confirm_password === "" ? "Password confimation failed" : "",
                contact_no_error:data.contact_no===""?"Contact No cannot be empty":"",
            });
        } else if (!regEmail.test(data.email)) {
            console.log(2)
            setData({
                ...data,
                email_error: "Invalid Email address",
            });
        } else if(!phoneno.test(data.contact_no)){
            console.log(3)
            console.log(phoneno)
            setData({
                ...data,
                contact_no_error: "Enter Valid number",
            });

        }else if (data.password.trim().length < 5) {
            console.log(4)
            setData({
                ...data,
                password_error: "Password must be 5 Charactor length",
            })
        } else if (data.password !== data.confirm_password) {
            console.log(5)
            setData({
                ...data,
                confirm_password_error: "Password not match",
            })
        } else {
            setData({
                ...data,
                showIndicator:true
            })
            SignUpUser(data.email,data.password).then((res)=>{
                console.log(res)
                var userUID=Firebase.auth().currentUser.uid;
                console.log(userUID)
                AddUser(data.username,data.email,'',userUID).then(()=>{
                    console.log("sucess")
                }).catch((error)=>{
                    console.log(error)
                })
            }).catch((err)=>{
                console.log(err)
            })
            api.post('/user-register', data).then((response) => {
                console.log(response.data)
                console.log(1)
                if (response.data.err === false) {
                    setData({
                        ...data,
                        server_err: "",
                        showIndicator:false
                    });
                    const data1={
                        email:data.email,
                        type:'sign',
                        cord:response.data.cord,
                        name:data.username
                    }
                    navigation.navigate('Cord',{signData:data1});
                    
                } else {
                    setData({
                        ...data,
                        server_err:response.data.msg,
                        showIndicator:false
                    });
                }
            }).catch((err) => {
                console.log(err)
                setData({
                    ...data,
                    server_err: "Connection Error. Please try again",
                    showIndicator:false
                });
            })
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }
    if(data.showIndicator){
        return (
         <LoadingIndicator/>   
        )
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <WelComeMsg
                    title="Hello! Welcome"
                    msg="Please sign up to Continue"
                />
                <InputField
                    title="Full Name"
                    placeholder="Full Name"
                    onChangeText={(val) => setData({
                        ...data,
                        username: val,
                        username_error: ''
                    })}
                />
                <ErrorMsg msg={data.username_error} />
                <InputField
                    title="E mail"
                    placeholder="E mail"
                    onChangeText={(val) => setData({
                        ...data,
                        email: val,
                        email_error: ''
                    })}

                />
                <ErrorMsg msg={data.email_error} />
                <InputField
                    title="Contact Number"
                    placeholder="Contact Number"
                    keyboardType="numeric"
                    onChangeText={(val) => setData({
                        ...data,
                        contact_no: val,
                        contact_no_error: ''
                    })}
                />
                <ErrorMsg msg={data.contact_no_error} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.9 }}>
                        <InputField
                            title="Password"
                            placeholder="Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            onChangeText={(val) => setData({
                                ...data,
                                password: val,
                                password_error: ''
                            })}
                        />
                    </View>
                    <TouchableOpacity onPress={updateSecureTextEntry} style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                        {data.secureTextEntry ? <Feather name="eye-off" color="green" size={25} /> : <Feather name="eye" color="grey" size={25} />}
                    </TouchableOpacity>
                </View>

                <ErrorMsg msg={data.password_error} />
                <InputField
                    title="Confirm password"
                    placeholder="Confirm password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    onChangeText={(val) => setData({
                        ...data,
                        confirm_password: val,
                        confirm_password_error: ''
                    })}
                />

                <ErrorMsg msg={data.confirm_password_error} />
            </View>
            <View style={styles.btnContainer}>
                <Text style={{ color: 'red', marginBottom: 10 }}>{data.server_err}</Text>
                <BigButton
                    onPress={post_data}
                    txt="Sign In"
                />
                <BottomMsg
                    quection="Already have an account ?"
                    link="Sing  in"
                    onPress={() => navigation.navigate("SignIn")}
                />
            </View>
        </ScrollView>
    )
}
export default SignINScreen;

