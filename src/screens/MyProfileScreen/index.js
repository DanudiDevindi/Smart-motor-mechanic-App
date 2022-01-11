import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground, Text, View,TouchableOpacity, Alert, Image, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import SmallButton from '../../component/SmallButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import imag_url from '../../api/imageURL';
import api from "../../api/jsonServer";
import { AuthContext } from '../../context/context';
import Feather from 'react-native-vector-icons/Feather';

const MyProfileScreen = ({ route, navigation }) => {
  const { signOut } = useContext(AuthContext);
  var region = '';
  { route.params === undefined ? null : region = route.params }
  const [images, setImages] = useState({
    uri: imag_url + "/upload_image.png",
    type: "",
    name: "",
    isSelectImage: false,
    image_error: '',
  });

  const [data, setData] = useState({
    username: '',
    username_error: '',
    password: '',
    password_error: '',
    new_password: '',
    new_password_error: '',
    contact_no: '',
    contact_no_error: '',
    position: '',
    position_error: '',
    address: '',
    address_error: '',
    description: '',
    description_error: '',
    server_err: '',
    isSucess: false,
    latitude: 6.927079,
    longitude: 79.861244,
    isLocationAvalable: false,
    location_err: '',
    showIndicator: false
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    api.get("/user_details").then((res) => {
      var locationSelect;
      { res.data.city === "" ? locationSelect = false : locationSelect = true }
      setData({
        ...data,
        username: res.data.name,
        password: res.data.password,
        contact_no: res.data.contact_no,
        position: res.data.position,
        address: res.data.address,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
        description: res.data.description,
        city: res.data.city,
        image: res.data.image,
        isLocationSelect: locationSelect
      });
      if (res.data.image !== "") {
        setImages({
          ...images,
          uri: imag_url + res.data.image,
        })
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 20,marginHorizontal:20 }}>
        <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row' }}>
          <View style={{ flex: 0.8 }}></View>
          <View style={{ flex: 0.2 }}>
            <SmallButton txt="LOGOUT" onPress={() => signOut()} />
          </View>
        </View>
        <View style={styles.topContainer}>
        <View style={styles.imgContainer}>
          <View style={{ height: 150, borderRadius: 100, backgroundColor: "#C4C4C4", width: 150,}}>
            <ImageBackground
              source={{
                uri: images.uri,
              }}
              style={{ height: "100%", width: "100%" }}
              imageStyle={{ borderRadius: 100 }}
            />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <Text style={{ fontWeight: '400', fontSize: 12, color: 'black' }}>You can add your services here</Text>
          <SmallButton txt="ADD SERVICE" onPress={() => navigation.navigate("AddService", { region: '' })} />
          <SmallButton txt="MY SERVICE" onPress={() => navigation.navigate("MyServices")} />
          <SmallButton txt="MY QUECTION" onPress={() => navigation.navigate("MyPosts")} />
        </View>
      </View>
      <View style={{ alignItems: 'center', marginTop: 15 }}>
        <Text style={styles.name}>{data.username}</Text>
        {data.position === "" ? null : <Text style={styles.position}>{data.position}</Text>}
        {data.city === "" ? null : <Text style={styles.place}>{data.city}, Sri Lanka</Text>}
      </View>
      <View style={{ flexDirection: 'row',marginTop:10 }}>
          <View style={{ flex: 0.47 }}>
            <SmallButton txt="EDIT PROFILE" onPress={() => navigation.navigate("EditProfile")} />
          </View><View style={{ flex: 0.06 }}></View>
          <View style={{ flex: 0.47 }}>
            <SmallButton txt="CHANGE PASSWORD" onPress={() => navigation.navigate("ChangePassword")} />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={{ margin: 15 }}>
          <Text style={styles.findAreaTxt}>Find the service area or location</Text>
          <TouchableOpacity onPress={() => isVisible(true)}>
            <Image source={require("../../assest/images/map.png")} resizeMode="contain" style={styles.mapImg} />

          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.findAreaTxt}>Contact Me</Text>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Feather name="phone" size={13} />
                <Text style={styles.contactTxt}>{data.contact}</Text>
              </View>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.findAreaTxt}>Address</Text>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Ionicons name="location-outline" size={13} />
                <Text style={styles.contactTxt}>{data.address}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.findAreaTxt}>Description</Text>
          <Text style={styles.des}>{data.description}</Text>
          </View>
        </View>
      
      
      </View>

      
     

      {/* <View style={{ marginHorizontal: 40, }}> */}
       
      {/* </View> */}

      {/* </View> */}
    </ScrollView>
  )
}

export default MyProfileScreen;