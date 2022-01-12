import React, { useState, useEffect } from 'react';
import { Text, View,TouchableOpacity, TextInput, Image, FlatList, ImageBackground, Alert, SafeAreaView, ScrollView ,ActivityIndicator} from 'react-native';
import { styles } from './styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CheckBoxx from '../../component/CheckBoxx';
import BigButton from '../../component/BigButton';
import imag_url from '../../api/imageURL';
import url from '../../api/url';
import axios from 'axios';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ErrorMsg from '../../component/ErrorMsg';

const EditPostScreen = ({ route, navigation }) => {


    var { region } = route.params;
    console.log("region")
    console.log(region)
    // { route === undefined ? null : region = route.params }
    const { item } = route.params;
    const [cat, setCat] = useState([])
    const [images, setImages] = useState({
        uri: imag_url + item.image,
        type: "",
        name: "",
        isSelectImage:false,
        image_error: ''
    });
    const [data, setData] = useState({
        qid:item.qid,
        cat_id: item.cat_id,
        cat_name: item.category,
        cat_error: '',
        title: item.title,
        title_error: '',
        quection: item.quection,
        quection_error: '',
        image: item.image,
        image_error: '',
        latitude: item.latitude,
        longitude: item.longitude,
        server_err: '',
        region_error: '',
        isSucess: false,
        showIndicator: false,
        isLocationSelect:false,
        isImageSelect:false
    })

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
                            if(response.didCancel){
                                console.log("Canceled")
                                setData({
                                    ...data,
                                    isImageSelect:false
                                })
                            }
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
                            if(response.didCancel){
                                console.log("Canceled")
                                setData({
                                    ...data,
                                    isImageSelect:false
                                })
                            }
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
    useEffect(() => {
    }, []);

    const editQuection = () => {
        if (data.cat_id === 0 || data.title === '' || data.quection === '') {
            console.log(1)
            setData({
                ...data,
                cat_error: data.cat_id === 0 ? "Please select category" : "",
                title_error: data.title === "" ? "Please enter title" : "",
                quection_error: data.quection === "" ? "Please add description" : "",
            });
        } else {
            console.log("Data")
            console.log(data)
            setData({
                ...data,
                showIndicator: true
            })
            const values = new FormData();
            if(data.isImageSelect===true){
                
                console.log("Is Image Select")
                values.append('files', { uri: images.uri, name: images.name, type: images.type });
            }  
            if(region===undefined){
                values.append('location',JSON.stringify(''))
            }else{
                values.append('location',JSON.stringify(region)) 
            } 
                  
            values.append('data', JSON.stringify(data));            
            axios.request({
                url: url + 'edit_post',
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
                        server_err: "Question Edit Done...",
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

}

export default EditPostScreen;