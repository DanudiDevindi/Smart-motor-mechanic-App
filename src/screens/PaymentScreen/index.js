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

      const getAmountAsDuration = (duration) => {
        console.log(duration)
        fetch(url + 'getAmountAsDuration/' + duration).then((response) => response.json()).then((responseJson) => {
          setAmount(responseJson.amount)
          console.log(44555)
          console.log(responseJson)
          setPaymentID(responseJson.payment_id)
          // var disAmount;
          //   if(responseJson.discount_type==="percentage"){
          //       disAmount=responseJson.discount*responseJson.amount
          //       setData({
          //         ...data,
          //         discount_amount: disAmount,
          //       })
          //   }
    
        })
      }

      const paymentProcess = () => {
        console.log(amount)
        console.log(data)
        var finalAmount = amount - data.discount_amount;
        var data1 = {
          payment_id: paymentID,
          payment_method: data.payment_method,
          paid_amount: finalAmount
        }
    
        console.log(data1)
    
        const values = new FormData();
        values.append('data', JSON.stringify(data1));
        axios.request({
          url: url + 'createUserPayment',
          method: 'POST',
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/octet-stream'
          },
          data: values,
    
        }).then((response) => {
          console.log(response.data)
          if (response.data.err === false) {
            //check fully amount recover with coupon or not
            if (finalAmount > 0) {
              //check payment method
              if (data.payment_method === "paypal") {
                //go to paypal screen
                console.log("Paypal")
              } else {
                //popup with bank details
                console.log("bank details")
                isVisibleBank(true)
              }
            } else {
              isVisiblePay(true)
            }
          }else{
    
          }
    
        }).catch((error) => {
          console.log(error)
          setData({
            ...data,
            server_err: "Server Error",
            showIndicator: false
          });
        });
      }

      function currencyFormat(num) {
        console.log("num")
        console.log(num)
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }
     const bankModalClose=()=>{
        isVisibleBank(false)
        navigation.navigate("MyServices")
       }
       const payModalClose=()=>{
        isVisiblePay(false)
        navigation.navigate("MyServices")
       }
       



  

}