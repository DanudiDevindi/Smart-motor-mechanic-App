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


    return (
        <ScrollView style={{ margin: 20 }}>
            <Text style={styles.title}>Vehicle Category</Text>
            <Text style={styles.txtInput}>{data.cat_name}</Text>
            {/* <View style={{ flexDirection: 'row', marginLeft: 60 }}>
                <FlatList
                    data={cat}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                />
            </View> */}
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
                multiline={true}
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
                    <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.navigate("find_location", { ui: 'EditPost' })}>
                        <Image style={{ height: "100%", width: "100%" }} source={require("../../assest/images/map.png")} />
                    </TouchableOpacity>
                    <Text style={styles.imageFooterTxt}>Select your service area or location</Text>
                    <ErrorMsg msg={data.region_error} />
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.title}>Add Images</Text>
                    <View style={{ marginLeft: 10 }}>
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
            </View>

            <View style={{ marginBottom: 100 }}>
                {
                    data.isLoading ? <ActivityIndicator size="large" color="#25DCE8" style={{ marginTop: 20 }} /> : null
                }
                {data.isSucess ? <Text style={{ color: 'green', marginBottom: 10 }}>{data.server_err}</Text> :

                    <Text style={{ color: 'red', marginBottom: 10 }}>{data.server_err}</Text>
                }
                <BigButton txt="Submit" onPress={editQuection} />
            </View>

        </ScrollView>
    )

}

export default EditPostScreen;