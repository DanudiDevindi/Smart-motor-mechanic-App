import React, { useState,useEffect } from 'react';
import { Text, View, Image, TextInput, FlatList, TouchableOpacity, ScrollView, Modal,Alert ,Linking,Platform} from 'react-native';
import { styles } from './styles';
import imgUrl from '../../api/imageURL';
import Answer from '../../component/Answer';
import api from '../../api/jsonServer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import SmallButton from '../../component/SmallButton';
import LoadingIndicator from '../../component/LocationIndicator';
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import url from '../../api/url';
import moment from "moment";
// import Moment from 'react-moment';
import { useFocusEffect } from '@react-navigation/native';
import ImageView from '../ImageView';

const Post = ({ postData }) => {
    const [timeDiff,setTimeDiff]=useState('')
    const [isLoading, setLoading] = useState(false)
    const [imgVisi, isImgVisible] = useState(false);
    const [mapVisi, isMapVisible] = useState(false)
    const [isClickSeeMoreBtn, setIsClickSeeMoreBtn] = useState(false);
    const [answers,setAnswers]=useState([])
    const [answer, setAnswer] = useState('');
    const [region, setRegion] = useState({
        latitude: postData.quec.latitude,
        longitude: postData.quec.longitude,
        address: postData.quec.address,
        latitudeDelta: 0.922,
        longitudeDelta: 0.421,
    })
    const [createdAnswer, setCreatedAnswer] = useState({
        answer: '',
        user_name: '',
        server_err: '',
        isSucess: false
    })
    useEffect(() => {
        getAnswers();
    }, []);    

    const getAnswers = () => {
        fetch(url+'allAnswers/'+postData.quec.qid).then((response)=>response.json()).then((responseJson)=>{
            setAnswers(responseJson);
        }).catch((error)=>{
            console.log(error);
        });
    }
    const ItemView = ({ item }) => {
        return (
            <Answer
                answerDetails={item}
                isCreated={false}
            />
        );
    };
    const creteAnswer = () => {
        const data = {
            answer: answer,
            qid: postData.quec.qid
        }
        api.post('/addAnswer', data).then((response) => {
            setLoading(true)
            if (response.data.err === false) {
                setLoading(false)
                setAnswer("")
                getAnswers()
                setCreatedAnswer({
                    answer: response.data.answerdetails.answer,
                    user_name: response.data.answerdetails.name
                })
            } else {
                setLoading(false)
                setCreatedAnswer({
                    ...createdAnswer,
                    server_err: "Connection Failed. Plz try again",
                    isSucess: false
                });
            }
        }).catch((err) => {
            setLoading(false)
            setCreatedAnswer({
                ...createdAnswer,
                server_err: "Connection Failed. Plz try again",
                isSucess: false
            });
        })
    }

    function call (){
        let phoneNumber;
        if (Platform.OS !== "android") {
          phoneNumber = `telprompt:${postData.quec.contact_no}`;
        } else {
          phoneNumber = `tel:${postData.quec.contact_no}`;
        }
        Linking.canOpenURL(phoneNumber)
          .then(supported => {
            if (!supported) {
              Alert.alert("Number is not available");
            } else {
              return Linking.openURL(phoneNumber);
            }
          })
          .catch(err => console.log(err));
      };
    if (isLoading) {
        return (
            <LoadingIndicator />
        )
    }
    
    const makePhoneCall=()=>{
        Alert.alert(
          "Call to Service Provider",
          `${postData.quec.contact_no}`,
          [
            { text: "Cancel"},
            { text: "Call", onPress: () => call()}
          ]
        ); 
      }

    return (
        <View style={styles.constainer}>
            <View style={{ marginHorizontal: 20, marginTop: 1 }}>
                <Text style={styles.title}>{postData.quec.title}</Text>
                <Text style={styles.name}>{postData.quec.name}</Text>
                <Text style={styles.post_date}>{postData.timeDiff}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, height: 150 }}>
                    <TouchableOpacity style={{ flex: 0.3 }} onPress={() => isImgVisible(true)}>
                        <Image style={styles.img} source={{ uri: imgUrl + postData.quec.image }} resizeMode="stretch" />
                    </TouchableOpacity>
                    <View style={{ flex: 0.7, marginLeft: 7 }}>
                        <ScrollView style={styles.quectionContainer} contentContainerStyle={{flex:1}} nestedScrollEnable={true}>
                            <Text style={styles.quection}>{postData.quec.quection}</Text>
                        </ScrollView>
                        <View style={{ flex: 0.3, flexDirection: 'row' }}>
                            <View style={[styles.btnContainer,{alignItems:'flex-start'}]}>
                                <SmallButton icon="md-location" txt="View Location" onPress={()=>isMapVisible(true)} />
                            </View>
                            <View style={[styles.btnContainer,{alignItems:'flex-end'}]}>
                                <SmallButton icon="call" txt="Call" onPress={() => makePhoneCall()} />
                            </View>
                        </View>
                    </View>
                </View>
                {answers.length>0 ? <Text style={{ color: '#A1A1A1', fontSize: 13, fontWeight: '500', marginTop: 10 }}>{answers.length} Answers</Text> : null}
                {isClickSeeMoreBtn === false ?
                    <View>
                        {answers.length > 1 ?
                        <TouchableOpacity onPress={() => setIsClickSeeMoreBtn(true)}>
                            <Text style={{ color: '#1B17E1', fontSize: 12, marginTop: 10 }}>See More Answer</Text>
                        </TouchableOpacity>:null}
                        {answers.length > 0 ?
                            <Answer
                                isCreated={false}
                                answerDetails={answers[answers.length - 1]}
                            /> : null}
                    </View>
                    :
                    <FlatList
                        data={answers}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={ItemView}
                        enableEmptySections={true}
                    />
                }
                <View style={{ flexDirection: 'row', backgroundColor: 'white', marginTop: 10, borderRadius: 15, paddingLeft: 10 }}>
                    <TextInput
                        // style={styles.txtInput} 
                        style={{ flex: 0.9, paddingLeft: 8, }}
                        onChangeText={(val) => setAnswer(val)}
                        clearButtonMode="always"
                        placeholderTextColor="#1B17E1"
                        value={answer}
                        placeholder="Give a Answer here"
                    />
                    {answer === "" ? null :
                        <TouchableOpacity onPress={creteAnswer} style={{ flex: 0.2, justifyContent: 'center', }}>
                            <Text style={{ color: '#1B17E1' }}>Send</Text>
                        </TouchableOpacity>}

                </View>
                {createdAnswer.isSucess ? <Text style={{ color: 'green', marginBottom: 1 }}>{createdAnswer.server_err}</Text> :
                    <Text style={{ color: 'red', marginBottom: 1 }}>{createdAnswer.server_err}</Text>
                }

            </View>

            <Modal transparent={true} visible={mapVisi} >
                <View style={styles.modalBg}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeBtnView} onPress={()=>isMapVisible(false)}>
                            <MaterialCommunityIcons name="close-thick" size={35} color="black" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 15, color: 'black', margin: 15 }}>{region.address}</Text>
                        <MapView style={styles.map}
                            initialRegion={{
                                latitude: region.latitude,
                                longitude: region.longitude,
                                latitudeDelta: region.latitudeDelta,
                                longitudeDelta: region.longitudeDelta,
                            }}
                            provider="google"
                        >
                            <Marker
                                draggable={true}
                                coordinate={{
                                    latitude: region.latitude,
                                    longitude: region.longitude,
                                }}
                                pinColor='black'
                            >
                                <Callout>
                                    <Text>I'm here</Text>
                                </Callout>
                            </Marker>
                            <Circle center={{ latitude: region.latitude, longitude: region.longitude, }} radius={1000} />
                        </MapView>
                    </View>
                </View>
            </Modal>
            <Modal transparent={true} visible={imgVisi}>
                <View style={styles.modalBg}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeBtnView} onPress={()=>isImgVisible(false)}>
                        <MaterialCommunityIcons name="close-thick" size={35} color="black" />
                        </TouchableOpacity>
                        <ImageView
                            img1={postData.quec.image}
                            img2={postData.quec.image2}
                            img3={postData.quec.image3}
                        />
                        {/* <Image style={{ height: '100%', width: '100%' }} source={{ uri: imgUrl + postData.quec.image }} /> */}
                    </View>
                </View>
            </Modal>
        
        </View>
    )
}

export default Post;