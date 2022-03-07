import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image, FlatList, TouchableOpacity, ImageBackground, Alert, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import CheckBoxx from '../../component/CheckBoxx';
import BigButton from '../../component/BigButton';
import url from '../../api/url';
import imag_url from '../../api/imageURL';
import axios from 'axios';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ErrorMsg from '../../component/ErrorMsg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const AddServicescreen = ({ route, navigation }) => {

    var { region } = '';
    { route === undefined ? null : region = route.params }
    const [vis, isVisible] = useState(false)
    const [cat, setCat] = useState([]);
    const [service_types, setServiceType] = useState([]);
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
        description: '',
        description_error: '',
        service_type_id: 0,
        service_type: '',
        price_set_as: '',
        service_type_error: '',
        price: 0,
        price_error: '',
        status: '',
        isSelectImage: false,
        image_error: '',
        server_err: '',
        isSucess: false,
        location_err: '',
        showIndicator: false,
        createAt: new Date()
    })

    const getCategories = () => {
        fetch(url + 'AllCategory').then((response) => response.json()).then((responseJson) => {
            setCat(responseJson);
        }).catch((error) => {
            console.log(error);
        });
    }

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

    const saveService = () => {
        // if (data.cat_id === 0 || data.title === '' || data.description === '' || data.service_type === '' || data.isSelectImage===false) {
        if (data.cat_id === 0 || data.title === '' || data.description === '' || data.service_type === '' || region.region === '' || data.isSelectImage === false) {
            setData({
                ...data,
                cat_error: data.cat_id === 0 ? "Please select category" : "",
                title_error: data.title === "" ? "Please enter title" : "",
                description_error: data.description === "" ? "Please add description" : "",
                service_type_error: data.service_type === "" ? "Please select service type" : "",
                location_err: region.region === '' ? "Please select Location" : '',
                image_error: data.isSelectImage === false ? "Please select image" : "",
            });

        } else {
            setData({
                ...data,
                showIndicator: true
            })
            const values = new FormData();
            if (image1.name!==""){
                values.append('files', { uri: image1.uri, name: image1.name, type: image1.type });
            }
            if (image2.name!==""){
                values.append('files', { uri: image2.uri, name: image2.name, type: image2.type });
            }
            if (image3.name!==""){
                values.append('files', { uri: image3.uri, name: image3.name, type: image3.type });
            }
                
            values.append('data', JSON.stringify(data));
            values.append('location', JSON.stringify(region))
            axios.request({
                url: url + 'createService',
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/octet-stream'
                },
                data: values,

            }).then((response) => {
                if (response.data.err === false) {
                    if (response.data.status === "payment_done") {
                        isVisible(true)
                    } else if (response.data.status === "payment_not_done") {
                        navigation.navigate("Payment", { service_typeID: data.service_type_id })
                    }
                    setData({
                        ...data,
                        server_err: response.data.message,
                        isSucess: true,
                        location_err: '',
                        showIndicator: false,
                        cat_id: 0,
                        cat_name: '',
                        title: '',
                        description: '',
                        service_type_id: 0,
                        price: 0,
                    });
                } else {
                    setData({
                        ...data,
                        server_err: response.data.message,
                        isSucess: false,
                        showIndicator: false
                    });
                }
            }).catch((error) => {
                setData({
                    ...data,
                    server_err: "Server Error",
                    isSucess: false,
                    showIndicator: false
                });
            })
        }
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
                                    uri: response.assets[0].uri,
                                    type: response.assets[0].type,
                                    name: response.assets[0].fileName
                                })

                            } else if (id === 2) {
                                setImage2({
                                    uri: response.assets[0].uri,
                                    type: response.assets[0].type,
                                    name: response.assets[0].fileName
                                })

                            } else {
                                setImage3({
                                    uri: response.assets[0].uri,
                                    type: response.assets[0].type,
                                    name: response.assets[0].fileName
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
                                    uri: response.assets[0].uri,
                                    type: response.assets[0].type,
                                    name: response.assets[0].fileName
                                })

                            } else if (id === 2) {
                                setImage2({
                                    uri: response.assets[0].uri,
                                    type: response.assets[0].type,
                                    name: response.assets[0].fileName
                                })

                            } else {
                                setImage3({
                                    uri: response.assets[0].uri,
                                    type: response.assets[0].type,
                                    name: response.assets[0].fileName
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

    return (
        <ScrollView style={{ margin: 20 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.title}>Vehicle Category</Text>
                    <FlatList
                        data={cat}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={CatItemView}
                    />
                    <ErrorMsg msg={data.cat_error} />
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.title}>Service Type</Text>
                    <FlatList
                        data={service_types}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={ServiceTypeItemView}
                    />
                    <ErrorMsg msg={data.service_type_error} />
                </View>
            </View>
            <Text style={styles.title}>Add Your Price range (As per {data.price_set_as})</Text>
            <TextInput
                clearButtonMode="always"
                style={[styles.txtInput, { height: 40 }]}
                value={data.price}
                keyboardType="numeric"
                onChangeText={(val) => setData({
                    ...data,
                    price: val,
                    price_error: ''
                })}
            />
            <ErrorMsg msg={data.price_error} />
            <Text style={styles.title}>Add Your Service Title Here</Text>
            <TextInput
                clearButtonMode="always"
                style={styles.txtInput}
                value={data.title}
                onChangeText={(val) => setData({
                    ...data,
                    title: val,
                    title_error: ''
                })}
            />
            <ErrorMsg msg={data.title_error} />
            <Text style={styles.title}>Add a Description</Text>
            <TextInput
                clearButtonMode="always"
                style={styles.txtInput}
                numberOfLines={5}
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
                    <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.navigate("find_location", { ui: 'AddService' })}>
                        <Image style={{ height: "100%", width: "100%" }} source={require("../../assest/images/map.png")} />
                    </TouchableOpacity>
                    <Text style={styles.imageFooterTxt}>Select your service area or location</Text>
                    <ErrorMsg msg={data.location_err} />

                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.title}>Add Service Images 01</Text>
                    <View style={{ marginLeft: 30 }}>
                        <View style={styles.imgContainer}>
                            <TouchableOpacity onPress={() => imageUpload(1)}>
                                <ImageBackground
                                    source={{
                                        uri: image1.uri,
                                    }}
                                    style={{ height: "100%", width: "100%" }}
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
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.title}>Add Service Image 02</Text>
                    <View style={{ marginLeft: 5 }}>
                        <View style={styles.imgContainer}>
                            <TouchableOpacity onPress={() => imageUpload(2)}>
                                <ImageBackground
                                    source={{
                                        uri: image2.uri,
                                    }}
                                    style={{ height: "100%", width: "100%" }}
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
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.title}>Add Service Image 03</Text>
                    <View style={{ marginLeft: 30 }}>
                        <View style={styles.imgContainer}>
                            <TouchableOpacity onPress={() => imageUpload(3)}>
                                <ImageBackground
                                    source={{
                                        uri: image3.uri,
                                    }}
                                    style={{ height: "100%", width: "100%" }}
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
            
            </View>

            <View style={{ marginBottom: 100 }}>
                <BigButton txt="Submit" onPress={saveService} />
                {
                    data.showIndicator ? <ActivityIndicator size="large" color="#25DCE8" style={{ marginTop: 20 }} /> : null
                }
                {data.isSucess ? <Text style={{ color: 'green', marginBottom: 10 }}>{data.server_err}</Text> :
                    <Text style={{ color: 'red', marginBottom: 10 }}>{data.server_err}</Text>
                }

            </View>
            <Modal transparent={true} visible={vis}>
                <View style={styles.modalBg}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeBtnView} onPress={() => isVisible(false)}>
                            <MaterialCommunityIcons name="close-thick" size={35} color="black" />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Feather name="alert-circle" size={98} color="#25DCE8" />
                            <Text style={styles.msgTitle}>Wait for admin Approval</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )


}

export default AddServicescreen;