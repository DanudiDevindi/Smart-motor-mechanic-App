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
                            cat_error: ""
                        })
                    }
                />
            </View>
        )
    }

    const saveQuection = () => {
        if (data.cat_id === 0 || data.title === '' || data.quection === '' || region.region === '' || data.isSelectImage === false) {
            setData({
                ...data,
                cat_error: data.cat_name === "" ? "Please select category" : "",
                title_error: data.title === "" ? "Please enter title" : "",
                quection_error: data.quection === "" ? "Please enter quection" : "",
                region_error: region.region === '' ? "Please select location" : "",
                image_error: data.isSelectImage === false ? "Please select image" : "",
            });
        } else {
            setData({
                ...data,
                isLoading: true
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
            // values.append('files', { uri: images.uri, name: images.name, type: images.type });
            values.append('data', JSON.stringify(data));
            values.append('location', JSON.stringify(region));
            axios.request({
                url: url + 'createQuection',
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/octet-stream'
                },
                data: values,

            }).then((response) => {
                if (response.data.err === false) {
                    
                    setData({
                        ...data,
                        server_err: "",
                        isSucess: true,
                        isLoading: false,
                        cat_id: 0,
                        cat_name: '',
                        title: '',
                        quection: '',
                        quection_error: '',
                        image: '',
                        latitude: 6.927079,
                        longitude: 79.861244,
                    });
                    Alert.alert(
                        "Sucess Message",
                        "Great! Your Quection added successfully....",
                        [
                            { text: "OK", onPress: () => navigation.navigate("Home1") }
                        ]
                    );
                    console.log("Send notifcation")
                    SendNotification(response.data.uid,response.data.user_name, data.title,data.cat_name)
                    .then(() => {
                        console.log("sucess")            
                    }).catch((err) => {
                      console.log(err)
                    })
                } else {
                    setData({
                        ...data,
                        server_err: "Server Error",
                        isSucess: false,
                        isLoading: false
                    });
                }
            }).catch((error) => {
                console.log(error)
                setData({
                    ...data,
                    server_err: "Server Error11",
                    isSucess: false,
                    isLoading: false
                });
            })
        }


    }


    return (
        <ScrollView style={{ margin: 20 }}>
            <Text style={styles.title}>Vehicle Category</Text>
            <View style={{ flexDirection: 'row', marginLeft: 60 }}>
                <FlatList
                    data={cat}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                />
            </View>
            <ErrorMsg msg={data.cat_error} />
            <Text style={styles.title}>Add Your Question Title Here</Text>
            <TextInput
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
                style={styles.txtInput}
                numberOfLines={5}
                value={data.quection}
                onChangeText={(val) => setData({
                    ...data,
                    quection: val,
                    quection_error: ''
                })}
            />
            <ErrorMsg msg={data.quection_error} />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.title}>Add Location</Text>
                    <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.navigate("find_location", { ui: 'AddQuection' })}>
                        <Image style={{ height: "100%", width: "100%" }} source={require("../../assest/images/map.png")} />
                    </TouchableOpacity>
                    <Text style={styles.imageFooterTxt}>Select your service area or location</Text>
                    <ErrorMsg msg={data.region_error} />
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.title}>Add Images 01</Text>
                    <View style={{ marginLeft: 10 }}>
                        <View style={styles.imgContainer}>
                            <TouchableOpacity onPress={() => imageUpload(1)}>
                                <ImageBackground
                                    source={{
                                        uri: image1.uri,
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
            </View>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.title}>Add Service Image 02</Text>
                    <View style={{ marginLeft: 30 }}>
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
                {
                    data.isLoading ? <ActivityIndicator size="large" color="#FF8546" style={{ marginTop: 20 }} /> : null
                }
                {data.isSucess ? <Text style={{ color: 'green', marginBottom: 10 }}>{data.server_err}</Text> :

                    <Text style={{ color: 'red', marginBottom: 10 }}>{data.server_err}</Text>
                }
                <BigButton txt="Submit" onPress={saveQuection} />
            </View>

        </ScrollView>
    )

}

export default AddQuecScreen;