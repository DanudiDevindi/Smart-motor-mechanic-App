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

 return (
    <ScrollView style={styles.container}>
      {/* <View style={{ flex: 1, alignItems: 'flex-end', marginTop: 20, marginRight: 40 }}>
        <TouchableOpacity onPress={() => isVisibleCoupon(true)}><Text style={{ fontSize: 20, color: '#FF8546' }}>Apply Coupon</Text></TouchableOpacity>
      </View> */}
      <View style={styles.choosePaymentContainer}>
        <Text style={styles.title}>Choose your Payment Methode</Text>
        <View style={{ marginLeft: 30, flexDirection: 'row' }}>
          <View style={{ flex: 0.5 }}>
            <CheckBoxx
              txt="Use Paypal"
              value={data.payment_method === "paypal"}
              onValueChange={() =>
                setData({
                  ...data,
                  payment_method: "paypal",
                  payment_method_eerr: ''
                })
              }
            />
          </View>
          <View style={{ flex: 0.5 }}>
            <CheckBoxx
              txt="Bank Transfer"
              value={data.payment_method === "bank_tranfer"}
              onValueChange={() =>
                setData({
                  ...data,
                  payment_method: "bank_tranfer",
                  payment_method_eerr: ''
                })
              }
            />
          </View>
        </View>
        <Text style={styles.title}>Choose Payment duration</Text>
        <View style={{ marginLeft: 30, flexDirection: 'row', marginBottom: 30 }}>
          <View style={{ flex: 0.5 }}>
            <CheckBoxx
              txt="1 Month"
              value={data.payment_duration === "1"}
              onValueChange={() => {
                setData({
                  ...data,
                  payment_duration: "1",
                  payment_duration_err: ''
                })

                getAmountAsDuration(1)
              }}
            />
            <CheckBoxx
              txt="3 Months"
              value={data.payment_duration === "3"}
              onValueChange={() => {
                setData({
                  ...data,
                  payment_duration: "3",
                  payment_duration_err: ''
                })
                getAmountAsDuration(3)
              }}
            />
          </View>
          <View style={{ flex: 0.5 }}>
            <CheckBoxx
              txt="6 Months"
              value={data.payment_duration === "6"}
              onValueChange={() => {
                setData({
                  ...data,
                  payment_duration: "6",
                  payment_duration_err: ''
                })
                getAmountAsDuration(6)
              }}
            />
            <CheckBoxx
              txt="12 Months"
              value={data.payment_duration === "12"}
              onValueChange={() => {
                setData({
                  ...data,
                  payment_duration: "12",
                  payment_duration_err: ''
                })
                getAmountAsDuration(12)
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.choosePaymentContainer}>
        <Text style={styles.title}>Apply your Coupon Code</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.6, margin: 20 }}>
            <TextInput 
               style={{ backgroundColor: '#FFF0E8', paddingLeft: 30, color: 'black', fontSize: 20, fontWeight: "bold" }} 
               placeholder="Coupon Cord"
                  onChangeText={(val) => setData({
                    ...data,
                    entered_cord: val,
                    cord_error: ''
                  })}
                  value={data.entered_cord}
            />

          </View>
          <View style={{ flex: 0.4, margin: 20 }}>
            <BigButton txt="Apply" onPress={applyCoupon} />
          </View>   

        </View>
        {data.isValidCord===true ?
        <Text style={{fontSize:18,marginBottom:20,marginLeft:20, color:"green"}}>{data.cord_error}</Text>:
        <Text style={{fontSize:18,marginBottom:20,marginLeft:20, color:"red"}}>{data.cord_error}</Text>
      }
        
      </View>
      <View style={styles.choosePaymentContainer}>
        <Text style={{ color: '#FF8546', fontWeight: '700', fontSize: 20, margin: 20 }}>Summery</Text>
        <View style={{ flexDirection: 'row', marginBottom: 20, }}>
          <View style={{ flex: 0.5 }}>
            <Text style={styles.summeryTxt}>Service Chargers</Text>
            <Text style={styles.summeryTxt}>Discount Amount</Text>
            <Text style={styles.summeryTxt}>Final Payment</Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Text style={styles.summeryTxt}>Rs</Text>
            <Text style={styles.summeryTxt}>-Rs</Text>
            <Text style={styles.summeryTxt}>Rs</Text>
          </View>
          <View style={{ flex: 0.3,alignItems:'flex-end' }}>
            <Text style={styles.summeryTxt}>{currencyFormat(amount)}</Text>
            {data.discount_type === "percentage" ? <Text style={styles.summeryTxt}>{currencyFormat(data.discount_amount * amount / 100)}</Text> :
              <Text style={styles.summeryTxt}>{currencyFormat(data.discount_amount)}</Text>
            }
            {data.discount_type === "percentage" ? <Text style={styles.summeryTxt}>{currencyFormat(amount - data.discount_amount * amount / 100)}</Text> :
              <Text style={styles.summeryTxt}>{currencyFormat(amount - data.discount_amount)}</Text>
            }
          </View>
        </View>
      </View>
      <View style={{ marginHorizontal: 20, marginBottom: 70, marginTop: 10 }}>
        <BigButton txt="Payment" onPress={paymentProcess} />
      </View>
      <Modal transparent={true} visible={visibleCoupon}>
        <View style={styles.modalBg}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeBtnView} onPress={() => isVisibleCoupon(false)}>
              <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <View style={{ marginHorizontal: 20 }}>
                <Text style={styles.txt}>Please Enter Your Coupon Code</Text>
                <TextInput
                  style={styles.msgTitle}
                  placeholder="Enter Coupon Cord"
                  onChangeText={(val) => setData({
                    ...data,
                    entered_cord: val,
                    cord_error: ''
                  })}
                  value={data.username}
                />
                <BigButton txt="Apply" onPress={applyCoupon} />
                <Text>{data.cord_error}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={visiblePay}>
        <View style={styles.modalBg}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeBtnView} onPress={payModalClose}>
              <AntDesign name="close" size={15} color="black" />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Feather name="alert-circle" size={98} color="#726E6E" />
              <Text style={styles.msgTitle}>Wait for admin Approval</Text>
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={visibleBank}>
        <View style={styles.modalBg}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeBtnView} onPress={bankModalClose}>
              <AntDesign name="close" size={15} color="black" />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name="creditcard" size={45} color="#FF8546" />
              <Text style={styles.bankDMsg}>Send bankslip to +94 777777777 Whatsapp or Send email to findcrewsl@gmail.com</Text>
              <Text style={styles.accountDetails}>Account Name : ****************</Text>
              <Text style={styles.accountDetails}>Account Name : ****************</Text>
              <Text style={styles.accountDetails}>Bank : ********************</Text>
              <Text style={styles.accountDetails}>Branch : *****************</Text>
              <Text style={{fontSize:25,color:'green',fontWeight:'bold',marginTop:20}}>Wait for Admin Approval</Text>
              {/* <Feather name="alert-circle" size={98} color="#726E6E" />
              <Text style={styles.msgTitle}>Bank Details</Text> */}
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )


  

}

export default PaymentScreen;