import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, Image, ScrollView, Modal, TouchableOpacity, TextInput, Alert, Linking, Platform } from 'react-native';
import { styles } from './styles';
import ServiceDetailTopCard from '../../component/ServiceDetailTopCard';
import SmallButton from '../../component/SmallButton';
import { GiftedChat } from 'react-native-gifted-chat';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import CustomerFeedBack from '../../component/CustomerFeedBack';
import url from '../../api/url';
import api from "../../api/jsonServer";
import LoadingIndicator from '../../component/LocationIndicator';
import imgUrl from '../../api/imageURL';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from '../../component/Chat';

const ServiceDetailsScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(false)
  const [msg, setMsg] = useState("");
  const [chatMsgs, setChatMsgs] = useState([])
  const { item } = route.params;
  console.log("item8888")
  console.log(item)
  const [visi, isVisible] = useState({
    chat: false,
    map: false
  });
  const [region, setRegion] = useState({
    latitude: item.latitude,
    longitude: item.longitude,
    address: item.address,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [userDetails,setUserdetails]=useState({
    uid:0,
    name:'',
    image:''
  })

  useEffect(() => {
    getUserDetails()
  }, []);

  const getUserDetails=()=>{
    api.get("/user_details").then((res) => {
      setUserdetails({
        ...userDetails,
        uid:res.data.uid,
        name:res.data.name,
        image:res.data.image
      })
    })
  }

  function call() {
    let phoneNumber;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${item.contact_no}`;
    } else {
      phoneNumber = `tel:${item.contact_no}`;
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
  const makePhoneCall = () => {
    Alert.alert(
      "Call to Service Provider",
      `${item.contact_no}`,
      [
        { text: "Cancel" },
        { text: "Call", onPress: () => call() }
      ]
    );
  }

  if (isLoading) {
    return (
      <LoadingIndicator />
    )
  }
  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      <ServiceDetailTopCard
        service={item}
        onPress={() => navigation.navigate("AboutTechinian", { id: item.uid })}
      />
      <View style={styles.desContainer}>
        <Text style={styles.desTitle}>Description:</Text>
        <Text style={styles.des}>{item.description}</Text>
      </View>
      <View style={styles.findAreaContainer}>
        <Text style={styles.findAreaTxt}>Find the service area or location</Text>
        {/* <TouchableOpacity onPress={()=>isVisible({...visi,map:true}) }> */}
        <TouchableOpacity onPress={() => isVisible({ ...visi, map: true })}>
          {/* <Image source={require("../../assest/images/map.png")} resizeMode="contain" style={styles.mapImg}/> */}
          <View style={styles.mapImg}>
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
        </TouchableOpacity>
        {userDetails.uid !== item.uid ?
          <View style={styles.btnContainer}>
            <View style={{ flex: 0.5, alignItems: 'flex-start', marginRight: 5 }}>
              <SmallButton icon="call" txt="Call" onPress={makePhoneCall} />
            </View>
            <View style={{ flex: 0.5, alignItems: 'flex-end', marginLeft: 5 }}>
              <SmallButton icon="ios-chatbubbles" txt="Chat" onPress={() => isVisible({ ...visi, chat: true })} />
            </View>
          </View> : null}
        <CustomerFeedBack
          service_id={item.service_id}
        />
      </View>
      <Modal transparent={true} visible={visi.chat}>
        <View style={styles.modalBg}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeBtnView} onPress={() => isVisible({ ...visi, chat: false })}>
              <MaterialCommunityIcons name="close-thick" size={35} color="black" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
              <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: imgUrl + item.image }} />
              <Text style={{ color: 'black', marginLeft: 20, fontSize: 25 }}>{item.user_name}</Text>
            </View>
            <Chat
              serviceProviderID={item.uid}
              serviceProviderName={item.user_name}
              serviceProviderImage={item.userImage}
              userId={userDetails.uid}
              userName={userDetails.name}
              userImage={userDetails.image}
            />

          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={visi.map}>
        <View style={styles.modalBg}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeBtnView} onPress={() => isVisible({ ...visi, map: false })}>
              <MaterialCommunityIcons name="close-thick" size={35} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 15, color: 'black', margin: 15 }}>{region.address}</Text>
            <MapView style={styles.map}
              region={{
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
    </ScrollView>
  )
}

export default ServiceDetailsScreen;