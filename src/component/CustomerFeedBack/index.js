import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, FlatList,ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import BigButton from '../BigButton';
import api from '../../api/jsonServer';
import RateProgressBarWithStar from '../RateProgressBarWithStar';
import url from '../../api/url';
import UserFeedback from '../UserFeedback';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomerFeedBack = ({ service_id }) => {
    console.log("servi ID")
    console.log(service_id)
    const [isLoading,setLoading]=useState(false)
    const [data, setData] = useState({
        defaultRating: 1,
        comment: '',
        comment_err: '',
        server_err: '',
        isSucess: false
    });
    const [summeryRate, setSummeryRate] = useState({
        finalRate: 0,
        star1Perntage: '0.000001%',
        star2Perntage: '0.000001%',
        star3Perntage: '0.000001%',
        star4Perntage: '0.000001%',
        star5Perntage: '0.000001%'
    })
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [feedbacks, setFeedbacks] = useState([])
    const [visi, isVisible] = useState(false);

    useEffect(() => {
        getServiceRateSummery ()
        
      }, []);

    const getServiceRateSummery = () => {
        setLoading(true)
        fetch(url + 'getRateSummery/' + service_id).then((response) => response.json()).then((responseJson) => {
          setLoading(false)
            console.log(responseJson)
            setSummeryRate({
                // ...summeryRate,
                finalRate: responseJson.finalRate,
                star1Perntage: responseJson.star1Perntage,
                star2Perntage: responseJson.star2Perntage,
                star3Perntage: responseJson.star3Perntage,
                star4Perntage: responseJson.star4Perntage,
                star5Perntage: responseJson.star5Perntage,
    
            })
        }).catch((error) => {
            console.log(error);
        });
    }
    const submitRate = () => {
        let rateData = {
            comment: data.comment,
            rate: data.defaultRating,
            service_id: service_id
        }
        setLoading(true)
        api.post('/createServiceRate', rateData).then((response) => {
            setLoading(false)
            if (response.data.err === false) {
                getServiceRateSummery ()
                setData({
                    ...data,
                    server_err: response.data.msg,
                    isSucess: true,
                    comment: ''
                    // showIndicator: false
                });
            } else {
                setData({
                    ...data,
                    server_err: response.data.msg,
                    isSucess: false,
                    comment: ''
                    // showIndicator: false
                });
            }
        })
    }

    const modalClose = () => {
        isVisible(false);
        setData({
            ...data,
            defaultRating: 1,
            comment: '',
            comment_err: '',
            server_err: '',
        })
    }

    const ItemView = ({ item }) => {
        return (
            <UserFeedback item={item} />
        )

    }

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    marginTop: 10,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    }

    const getUserfeedback = () => {
        setLoading(true)
        fetch(url + 'getServiceRate/' + service_id).then((response) => response.json()).then((responseJson) => {
            setLoading(false)
            console.log(responseJson)
            setFeedbacks(responseJson)
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 100 }}>
            <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold' }}>Customer Feedback</Text>
            <View style={{ flexDirection: 'row', height: 150, marginTop: 10 ,marginBottom:20}}>
                <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 45, fontWeight: 'bold', color: '#FF8546' }}>{parseInt(summeryRate.finalRate)}</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        {
                            maxRating.map((item, key) => {
                                return (
                                    <MaterialIcons name={item <= summeryRate.finalRate ? "star" : "star-border"} size={15} color="#FF8546" key={item} />
                                )
                            })
                        }
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FF8546' }}>Service</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FF8546' }}>Rating</Text>
                </View>
                <View style={{ flex: 0.7, marginVertical: 10 }}>
                    <RateProgressBarWithStar
                        starCount={5}
                        percentage={summeryRate.star5Perntage}
                    />
                    <RateProgressBarWithStar
                        starCount={4}
                        percentage={summeryRate.star4Perntage}
                    />
                    <RateProgressBarWithStar
                        starCount={3}
                        percentage={summeryRate.star3Perntage}
                    />
                    <RateProgressBarWithStar
                        starCount={2}
                        percentage={summeryRate.star2Perntage}
                    />
                    <RateProgressBarWithStar
                        starCount={1}
                        percentage={summeryRate.star1Perntage}
                    />
                </View>
            </View>
            <BigButton
                onPress={() => isVisible(true)}
                txt="Rate the service"

            />
            <TouchableOpacity style={{ marginTop: 20 }} onPress={getUserfeedback}>
                <Text style={{ fontSize: 17, color: 'blue' }}>View User's Comment</Text>
            </TouchableOpacity>
            <FlatList
                style={{ marginBottom: 160 }}
                data={feedbacks}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
            />


            <Modal transparent={true} visible={visi} >
                <View style={styles.modalBg}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeBtnView} onPress={modalClose}>
                        <MaterialCommunityIcons name="close-thick" size={35} color="black" />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            {
                                maxRating.map((item, key) => {
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            key={item}
                                            onPress={() => setData({ ...data, defaultRating: item })}
                                        >
                                            {item <= data.defaultRating ?
                                                <MaterialIcons name="star" size={50} color="#FF8546" /> :
                                                <MaterialIcons name="star-border" size={50} color="#FF8546" />
                                            }
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <View style={{ marginHorizontal: 20 }}>
                            <View style={{ marginVertical: 20, borderColor: "#FF8546", marginTop: 30, borderRadius: 20, borderWidth: 2 }}>
                                <TextInput
                                    style={{ fontSize: 20, paddingHorizontal: 20 }}
                                    placeholder="Your Feedback here"
                                    value={data.comment}
                                    onChangeText={(val) => setData({
                                        ...data,
                                        comment: val,
                                        comment_err: ''
                                    })}
                                />
                            </View>
                            <BigButton
                                onPress={submitRate}
                                txt="Rate Service"

                            />
                            {
                                isLoading ?  <ActivityIndicator size="large" color="#FF8546" style={{marginTop:20}}/>:null
                            }
                            {data.isSucess ? <Text style={{ color: 'green', marginTop: 10, fontSize: 20 }}>{data.server_err}</Text> :
                                <Text style={{ color: 'red', marginTop: 10, fontSize: 20 }}>{data.server_err}</Text>
                            }
                        </View>


                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CustomerFeedBack;