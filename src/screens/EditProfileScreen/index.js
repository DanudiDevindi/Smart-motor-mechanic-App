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

}

export default EditProfileScreen;