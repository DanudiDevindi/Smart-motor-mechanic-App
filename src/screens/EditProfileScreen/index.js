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

const EditProfileScreen = ({ route, navigation }) => {
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
    showIndicator: false,
    address:'',
    address_error:''
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

  const editHandle = () => {
    console.log(1)
    console.log(images)
    if (data.username === '' || data.contact_no === '') {
      // if (data.username === '' || data.contact_no === '' || data.position === '' || data.description === '' || data.isLocationSelect===false) {
      console.log(2)
      setData({
        ...data,
        username_error: data.username === '' ? "Please add username" : "",
        contact_no_error: data.contact_no === "" ? "Please enter your contact no" : "",
        // position_error: data.position === "" ? "Please add your position" : "",
        // address_error: data.address === "" ? "Please Enter your address" : "",
        // description_error: data.description === '' ? "Please Enter about yourself" : "",
        // location_err:region===''? "Please select Location":'',     
      });
      // setImages({
      //   ...images,
      //   image_error: images.isSelectImage===false ? "Please select image" : "",
      // })
    } else {
      console.log(3)
      setData({
        ...data,
        showIndicator: true
      })
      console.log(4)
      const values = new FormData();
      if (images.isSelectImage === true) {
        values.append('files', { uri: images.uri, name: images.name, type: images.type });
      }

      values.append('data', JSON.stringify(data));
      values.append('location', JSON.stringify(region));
      axios.request({
        url: url + 'edit_user',
        method: 'POST',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/octet-stream'
        },
        data: values,
      }).then((response) => {
        console.log(5)
        if (response.data.err === false) {
          setData({
            ...data,
            server_err: "User details changed...",
            isSucess: true,
            showIndicator: false,
            location_err: '',
          });
        } else {
          setData({
            ...data,
            server_err: "Server Error1",
            isSucess: false,
            showIndicator: false
          });
        }
      }).catch((error) => {
        console.log(error)
        setData({
          ...data,
          server_err: "Server Error",
          isSucess: false,
          showIndicator: false
        });
      })
    }

  }
  const uploadImage = () => {
    Alert.alert(
      'Service Image',
      'Take Image or Choose Image',
      [
        {
          text: 'Choose from Library',
          onPress: () => launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
              setImages({
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
                image_error: '',
                isSelectImage: true
              })
            })

        },
        {
          text: 'Take Photo',
          onPress: () => launchCamera(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
             
              setImages({
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
                image_error: '',
                isSelectImage: true
              })

            }),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  }

  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
          <TouchableOpacity onPress={uploadImage} style={{ height: 87, borderRadius: 50, backgroundColor: "#C4C4C4", width: 87 }}>
            <ImageBackground
              source={{
                uri: images.uri,
              }}
              style={{ height: "100%", width: "100%" }}
              imageStyle={{ borderRadius: 50 }}
            >
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                <Icon
                  name="camera"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <Text style={styles.addPhotoTxt}>Add a Photo</Text>
          <ErrorMsg msg={images.image_error} />        
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
          <Ionicons name="person-outline" size={15} color="#8E8B8B" />
          <Text style={{ fontWeight: '500', fontSize: 12.48, color: '#726E6E', marginLeft: 10 }}>Edit Account info</Text>
        </View>
        <InputField
          title="Edit Full Name"
          placeholder="Full Name"
          onChangeText={(val) => setData({
            ...data,
            username: val,
            username_error: ''
          })}
          value={data.username}
        />
        <ErrorMsg msg={data.username_error} />
        <InputField
          title="Edit contact Number"
          placeholder="Contact Number"
          onChangeText={(val) => setData({
            ...data,
            contact_no: val,
            contact_no_error: ''
          })}
          value={data.contact_no}
        />
        <ErrorMsg msg={data.contact_no_error} />
        <InputField
          title="Edit Position"
          placeholder="Your Position"
          onChangeText={(val) => setData({
            ...data,
            position: val,
            position_error: ''
          })}
          value={data.position}
        />
        <ErrorMsg msg={data.position_error} />
        <InputField
          title="Edit Description"
          placeholder="Edit Description"
          numberOfLines={5}
          onChangeText={(val) => setData({
            ...data,
            description: val,
            description_error: ''
          })}
          value={data.description}
        />
        <ErrorMsg msg={data.description_error} />
        <InputField
          title="Edit Address"
          placeholder="Edit Address"
          onChangeText={(val) => setData({
            ...data,
            address: val,
            address_error: ''
          })}
          value={data.address}
        />
        <ErrorMsg msg={data.address_error} />
        <Text style={{ fontWeight: '500', fontSize: 12.48, color: '#726E6E' }}>Select Your Location</Text>
        <TouchableOpacity onPress={() => navigation.navigate("find_location", { ui: 'MyProfile' })}>
          <Image source={require("../../assest/images/map.png")} resizeMode="contain" style={styles.mapImg} />
        </TouchableOpacity>
        <ErrorMsg msg={data.location_err} />
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
    </ScrollView>
  )
}

export default EditProfileScreen;