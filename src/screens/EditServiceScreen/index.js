import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image, FlatList, TouchableOpacity, ImageBackground, Alert, ScrollView ,ActivityIndicator} from 'react-native';
import { styles } from './styles';
import CheckBoxx from '../../component/CheckBoxx';
import BigButton from '../../component/BigButton';
import url from '../../api/url';
import imag_url from '../../api/imageURL';
import axios from 'axios';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ErrorMsg from '../../component/ErrorMsg';

const EditServiceScreen = ({ route, navigation }) => {

    var { region } = route.params;
    const { item } = route.params;
    console.log(item)
    const [cat, setCat] = useState([]);
    const [service_types, setServiceType] = useState([]);
    const [images, setImages] = useState({
        uri: imag_url + item.image,
        type: "",
        name: "",
        isSelectImage:false,
        image_error: ''
    });
    const [data, setData] = useState({
        service_id: item.service_id,
        cat_id: item.cat_id,
        cat_name: item.category,
        cat_error: '',
        title: item.title,
        title_error: '',
        description: item.description,
        description_error: '',
        service_type: item.service_type,
        service_type_error: '',
        price: item.price,
        price_error: '',
        status: item.status,
        image: imag_url + item.image,
        image_error: '',
        longitude: item.longitude,
        latitude: item.latitude,
        server_err: '',
        isSucess: false,
        showIndicator: false,
        isLocationSelect:false,
        isImageSelect:false
    })
    const getServiceTypes = () => {
        fetch(url + 'AllService_types').then((response) => response.json()).then((responseJson) => {
            setServiceType(responseJson);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        getCategories();
        getServiceTypes();
    }, []);
    const getCategories = () => {
        fetch(url + 'AllCategory').then((response) => response.json()).then((responseJson) => {
            setCat(responseJson);
        }).catch((error) => {
            console.log(error);
        });
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
                            console.log(response)
                            setImages({
                                uri: response.uri,
                                type: response.type,
                                name: response.fileName
                            })
                            setData({
                                ...data,
                                image_error: '',
                                isImageSelect:true
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
                                uri: response.uri,
                                type: response.type,
                                name: response.fileName
                            })
                            setData({
                                ...data,
                                image_error: '',
                                isImageSelect:true
                            })
                        }),
                    style: 'cancel'
                }
            ],
            { cancelable: false }
        );
    }


}

export default EditServiceScreen;

