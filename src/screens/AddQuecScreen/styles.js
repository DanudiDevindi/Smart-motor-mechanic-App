import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, FlatList, ImageBackground, Alert, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CheckBoxx from '../../component/CheckBoxx';
import BigButton from '../../component/BigButton';
import imag_url from '../../api/imageURL';
import url from '../../api/url';
import axios from 'axios';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ErrorMsg from '../../component/ErrorMsg';
import { SendNotification} from '../../Firebase/Notifications'

const AddQuecScreen = ({ route, navigation }) => {

    var { region } = '';
    { route === undefined ? null : region = route.params }
    const [cat, setCat] = useState([])
    const [image1, setImage1] = useState({
        uri: imag_url + "/upload_image.png",
        type: "",
        name: "",
    });
    const [image2, setImage2] = useState({
        uri: imag_url + "/upload_image.png",
        type: "",
        name: "",
    });
    const [image3, setImage3] = useState({
        uri: imag_url + "/upload_image.png",
        type: "",
        name: "",
    });
    const [data, setData] = useState({
        cat_id: 0,
        cat_name: '',
        cat_error: '',
        title: '',
        title_error: '',
        quection: '',
        quection_error: '',
        image: '',
        image_error: '',
        latitude: 6.927079,
        longitude: 79.861244,
        server_err: '',
        region_error: '',
        isSucess: false,
        isLoading: false
    })

    const getCategories = () => {
        fetch(url + 'AllCategory').then((response) => response.json()).then((responseJson) => {
            setCat(responseJson);
        }).catch((error) => {
            console.log(error);
        });
    }

    function imageUpload(id) {
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
                            if (id === 1) {
                                setImage1({
                                    uri: response.uri,
                                    type: response.type,
                                    name: response.fileName
                                })

                            } else if (id === 2) {
                                setImage2({
                                    uri: response.uri,
                                    type: response.type,
                                    name: response.fileName
                                })

                            } else {
                                setImage3({
                                    uri: response.uri,
                                    type: response.type,
                                    name: response.fileName
                                })

                            }
                            setData({
                                ...data,
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
                            if (id === 1) {
                                setImage1({
                                    uri: response.uri,
                                    type: response.type,
                                    name: response.fileName
                                })

                            } else if (id === 2) {
                                setImage2({
                                    uri: response.uri,
                                    type: response.type,
                                    name: response.fileName
                                })

                            } else {
                                setImage3({
                                    uri: response.uri,
                                    type: response.type,
                                    name: response.fileName
                                })

                            }
                            setData({
                                ...data,
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
    useEffect(() => {
        getCategories();
    }, []);

}

export default AddQuecScreen;