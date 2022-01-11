import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import CheckBoxx from '../../component/CheckBoxx';
import BigButton from '../../component/BigButton';
// import Approval from '../../component/Approval';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SmallButton from '../../component/SmallButton';
import url from '../../api/url';
import axios from 'axios';

const PaymentScreen = ({ route, navigation }) => {


    const { service_typeID } = route.params;
    const [visibleCoupon, isVisibleCoupon] = useState(false)
    const [visiblePay, isVisiblePay] = useState(false)
    const [visibleBank, isVisibleBank] = useState(false)
    const [amount, setAmount] = useState(0)
    const [paymentID, setPaymentID] = useState(0)
    const [data, setData] = useState({
      entered_cord: '',
      cord_error: '',
      discount_amount: 0,
      discount_type: '',
      isValidCord: false,
      payment_duration: '',
      payment_duration_err: '',
      payment_method: '',
      payment_method_eerr: '',
      server_err: '',
      showIndicator: false
      // amount: 0
    });

    const applyCoupon = () => {
        console.log("apply Coupon")
        console.log(data.entered_cord)
        if(data.entered_cord===""){
          setData({
            ...data,
            cord_error:'Please Enter Coupon Cord',
            isValidCord:false
          })
        }else{
          fetch(url + 'getCoupon/' + data.entered_cord).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
            if (responseJson.err === false) {
              setData({
                ...data,
                cord_error: "Coupon Code Applied for your Payment",
                isValidCord: true,
                discount_amount: responseJson.discount,
                discount_type: responseJson.discount_type
              })  
            } else {
              setData({
                ...data,
                cord_error: responseJson.message,
                isValidCord:false
              })
            }
          }).catch((error) => {
            console.log(error);
          });
        }
       
      }
  

}