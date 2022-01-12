import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground, Text, View, SafeAreaView, TouchableOpacity, Alert, Image, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import SmallButton from '../../component/SmallButton';
import InputField from '../../component/InputField';
import BigButton from '../../component/BigButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import imag_url from '../../api/imageURL';
import api from "../../api/jsonServer";
import url from '../../api/url';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ErrorMsg from '../../component/ErrorMsg';
import { AuthContext } from '../../context/context';

const ChangePasswordScreen = () => {
    const [data,setData]=useState({
        currentPassword:'',
        currentPasswordErr:'',
        new_password:'',
        new_passwordErr:'',
        confirm_password:'',
        confirm_passwordErr:'',
        server_err:'',
        showIndicator: false,
        isSucess:false
    })

    const editHandle = () => {
        console.log(data)
        if (data.currentPassword === '' || data.new_password === '' || data.confirm_password === '') {
          setData({
            ...data,
            currentPasswordErr: data.currentPassword === '' ? "Please Enter Current Password" : "",
            new_passwordErr: data.new_password === "" ? "Please Enter New Password" : "",  
            confirm_passwordErr: data.confirm_password === "" ? "Please Confirm Password" : ""  
          });
        } else if (data.new_password.trim().length < 5) {
            console.log(4)
            setData({
                ...data,
                new_passwordErr: "Password must be 5 Charactor length",
            })
        }else {            
            if(data.new_password===data.confirm_password){
                if(data.new_password===data.currentPassword){
                    setData({
                        ...data,
                        new_passwordErr: "Sorry. Should be different new password with current Password",
                        showIndicator:false,
                        isSucess:false
                    });
                }else{
                    setData({
                        ...data,
                        showIndicator: true
                      })
                      api.post('/edit_password', data).then((response) => {
                        console.log(response.data)
                        console.log(1)
                        if (response.data.err === false) {
                            setData({
                                ...data,
                                server_err: response.data.msg,
                                showIndicator:false,
                                isSucess:true
                            });
                        } else {
                            setData({
                                ...data,
                                server_err:response.data.msg,
                                showIndicator:false,
                                isSucess:false
                            });
                        }
                    }).catch((err) => {
                        console.log(err)
                        setData({
                            ...data,
                            server_err: "Connection Error. Please try again",
                            showIndicator:false,
                            isSucess:false
                        });
                    })

                }
                
            }else{
                setData({
                    ...data,
                    confirm_passwordErr:"Confirmation Not Match"
                })
            }          
        }    
      }
    return (
        <View style={styles.bottomContainer}>
            <View style={{ flexDirection: 'row', marginBottom: 15}}>
                <Ionicons name="key-outline" size={15} color="#8E8B8B" />
                <Text style={{ fontWeight: '500', fontSize: 12.48, color: '#726E6E', marginLeft: 10 }}>Change Password</Text>
            </View>
            <InputField
                title="Current Password"
                placeholder="Current Password"
                onChangeText={(val) => setData({
                    ...data,
                    currentPassword: val,
                    currentPasswordErr: ''
                })}
                value={data.currentPassword}
            />
            <ErrorMsg msg={data.currentPasswordErr} />
            <InputField
                title="New Password"
                placeholder="New Password"
                onChangeText={(val) => setData({
                    ...data,
                    new_password: val,
                    new_passwordErr: ''
                })}
                value={data.new_password}
            />
            <ErrorMsg msg={data.new_passwordErr} />
            <InputField
                title="Confirm Password"
                placeholder="Confirm Password"
                onChangeText={(val) => setData({
                    ...data,
                    confirm_password: val,
                    confirm_passwordErr: ''
                })}
                value={data.confirm_password}
            />
            <ErrorMsg msg={data.confirm_passwordErr} />
            <View style={{ marginBottom: 40 }}>
                <BigButton txt="Save Changes" onPress={editHandle} />
                {
                    data.showIndicator ? <ActivityIndicator size="large" color="#FF8546" style={{ marginTop: 20 }} /> : null
                }
                {data.isSucess ? <Text style={{ color: 'green', marginBottom: 10 }}>{data.server_err}</Text> :
                    <Text style={{ color: 'red', marginBottom: 10 }}>{data.server_err}</Text>
                }

            </View>
        </View>
    )

}

export default ChangePasswordScreen;