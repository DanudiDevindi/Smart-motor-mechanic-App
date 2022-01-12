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
    return (
        <ScrollView style={{ margin: 20 }}>
            <Text style={styles.title}>Vehicle Category</Text>
            <Text style={styles.txtInput}>{data.cat_name}</Text>
            <Text style={styles.title}>Service Type</Text>
            <Text style={styles.txtInput}>{data.service_type}</Text>
            <Text style={styles.title}>Add Your Price range (Rs)</Text>
            <TextInput
                style={styles.txtInput}
                value={""+data.price}
                onChangeText={(val) => setData({
                    ...data,
                    price: val,
                    price_error: ''
                })}
            />
            <ErrorMsg msg={data.price_error} />
            <Text style={styles.title}>Add Your Service Title Here</Text>
            <TextInput
                style={[styles.txtInput]}
                value={data.title}
                multiline={true}
                numberOfLines={3}
                onChangeText={(val) => setData({
                    ...data,
                    title: val,
                    title_error: ''
                })}
            />
            <ErrorMsg msg={data.title_error} />
            <Text style={styles.title}>Add a Description</Text>
            <TextInput
                style={styles.txtInput}
                numberOfLines={5}
                multiline={true}
                value={data.description}
                onChangeText={(val) => setData({
                    ...data,
                    description: val,
                    description_error: ''
                })}
            />
            <ErrorMsg msg={data.description_error} />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.title}>Add Location</Text>
                    <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.navigate("find_location", { ui: 'EditService' })}>
                        <Image style={{ height: "100%", width: "100%" }} source={require("../../assest/images/map.png")} />
                    </TouchableOpacity>
                    <Text style={styles.imageFooterTxt}>Select your service area or location</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.title}>Add Images</Text>
                    {/* <View style={{ marginLeft: 30 }}> */}
                    <View style={styles.imgContainer}>
                        <TouchableOpacity onPress={uploadImage}>
                            <ImageBackground
                                source={{
                                    uri: images.uri,
                                }}
                                style={{ height: "100%", width: "100%" }}
                            // imageStyle={{ borderRadius: 15 }}
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
                    </View>
                    <Text style={styles.imageFooterTxt}>Drag or Take a photo</Text>
                    <ErrorMsg msg={data.image_error} />
                </View>
            </View>
            <View style={{ marginBottom: 100, marginTop: 30 }}>
                <BigButton txt="Edit Service" onPress={editService} />
                {
                    data.showIndicator ? <ActivityIndicator size="large" color="#FF8546" style={{ marginTop: 20 }} /> : null
                }
                {data.isSucess ? <Text style={{ color: 'green', marginTop: 10 }}>{data.server_err}</Text> :
                    <Text style={{ color: 'red', marginTop: 10 }}>{data.server_err}</Text>
                }

            </View>
        </ScrollView>
    )

}

export default EditServiceScreen;

