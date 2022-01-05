import React,{useState,useEffect} from 'react';
import {Text,View,TextInput} from 'react-native';
import { styles } from './styles';
import BigButton from '../../component/BigButton';
import { AuthContext } from '../../context/context';
import api from '../../api/jsonServer';
import ErrorMsg from '../../component/ErrorMsg';
import LoadingIndicator from '../../component/LocationIndicator';

const CordScreen=({route,navigation})=>{

    const {signData} = route.params;
    const [data,setData]=useState({
        cord:'',
        errorCord:'Please check emails',
        isLoading: false

    });
    const { signUp } = React.useContext(AuthContext);

    const cordVerifyHandle=()=>{
        if(data.cord===''){
            setData({
                ...data,
                errorCord:"Please enter cord",
            }); 
        }else{
            setData({
                ...data,
                errorCord:signData.message,
            }); 
            console.log("signData "+signData.cord)
            console.log("data "+data.cord)
            if(signData.cord===data.cord){                
                if(signData.type==="sign"){
                    api.put('updateActive/'+signData.email).then((response)=>{
                        setData({
                            ...data,
                            isLoading:true
                        })
                        if(response.data.err===false){
                            setData({
                                ...data,
                                isLoading:false
                            })
                            console.log(response.data)
                            const token=response.data.token;
                            const id=response.data.id;
                            const foundUser=[token,id]
                            signUp(foundUser);
                        }else{
                            setData({
                                ...data,
                                errorCord:"Server error..Please  try again",
                                isLoading:false
                            }); 
                        }
                    });  
                }else if(signData.type==="forget"){
                    navigation.navigate('ForgetPassword',{email:signData.email});
                }                
            }else{
                setData({
                    ...data,
                    errorCord:"Sorry you entered code invalid. Please check again",
                });
            }
        }     

    }


}


export default CordScreen;