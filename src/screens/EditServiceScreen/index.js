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

    const ItemView = ({ item, index }) => {
        return (
            <View style={{ flex: 0.5 }}>
                <CheckBoxx
                    txt={item.name}
                    value={data.cat_id === item.cat_id}
                    onValueChange={() =>
                        setData({
                            ...data,
                            cat_name: item.name,
                            cat_id: item.cat_id,
                            cat_error: ''
                        })
                    }
                />
            </View>
        )
    }

    const editService = () => {
        if (data.cat_id === 0 || data.title === '' || data.description === '' || data.service_type === '' || data.price === 0) {
            console.log(1)
            setData({
                ...data,
                cat_error: data.cat_id === 0 ? "Please select category" : "",
                title_error: data.title === "" ? "Please enter title" : "",
                description_error: data.description === "" ? "Please add description" : "",
                service_type_error: data.service_type === "" ? "Please select service type" : "",
                price_error: data.price === 0 ? "Please Add Price" : "",
            });
        } else {
            setData({
                ...data,
                showIndicator: true
            })
            const values = new FormData();
            if(data.isImageSelect===true){
                values.append('files', { uri: images.uri, name: images.name, type: images.type });
            }  
            if(region===undefined){
                values.append('location',JSON.stringify(''))
            }else{
                values.append('location',JSON.stringify(region)) 
            } 
                  
            values.append('data', JSON.stringify(data));            
            axios.request({
                url: url + 'edit_service',
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/octet-stream'
                },
                data: values,
            }).then((response) => {
                console.log(3)
                console.log(response)
                if (response.data.err === false) {
                    setData({
                        ...data,
                        server_err: "Service Edit Done...",
                        isSucess: true,
                        showIndicator: false
                    });
                } else {
                    setData({
                        ...data,
                        server_err: "Server Error",
                        isSucess: false,
                        showIndicator: false
                    });
                }
            }).catch((error) => {
                console.log(4)
                console.log(error)
                setData({
                    ...data,
                    server_err: "Connection Error, Please try again",
                    isSucess: false,
                    showIndicator: false
                });
            })
        }
    }

    const CatItemView = ({ item, index }) => {
        return (
            <View style={{ flex: 0.5 }}>
                <CheckBoxx
                    txt={item.name}
                    value={data.cat_id === item.cat_id}
                    onValueChange={() =>
                        setData({
                            ...data,
                            cat_name: item.name,
                            cat_id: item.cat_id,
                            cat_error: ''
                        })
                    }
                />
            </View>
        )
    }
    const ServiceTypeItemView = ({ item, index }) => {
        console.log(item)
        return (
            <View style={{ flex: 0.5 }}>
                <CheckBoxx
                    txt={item.type}
                    value={data.service_type_id === item.service_type_id}
                    onValueChange={() =>
                        setData({
                            ...data,
                            service_type: item.type,
                            service_type_id: item.service_type_id,
                            price_set_as: item.price_set_as,
                            service_type_error: ''
                        })
                    }
                />
            </View>
        )
    }


}

export default EditServiceScreen;

