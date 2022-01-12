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

}

export default EditProfileScreen;