import React, { useState, useEffect } from 'react';
import { Text, View, Image, SafeAreaView, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './styles';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import url from '../../api/url';
import imgUrl from '../../api/imageURL';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import LoadingIndicator from '../../component/LocationIndicator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailsAboutTechnicianScreen = ({ route }) => {
    const { id } = route.params;
    console.log("Id "+id)
    const [visi, isVisible] = useState(false);

    const [data, setData] = useState({
        name: "",
        image: '',
        position: "",
        verified: "",
        place: "",
        contact: "",
        address: "",
        description: "",
        isImageZoom: false,
        isLoading: false,
        server_err: ''
    });

    const [region, setRegion] = useState({
        latitude: 1.009,
        longitude: 1.05,
        address: '',
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {

        console.log("GetData()")
        setData({
            ...data,
            isLoading: true
        })
        fetch(url + 'techDetails/' + id).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson)
            var img = responseJson.image;
            if (img === "") {
                img = 'profile.jpg'
            }
            setData({
                ...data,
                name: responseJson.name,
                image: img,
                contact: responseJson.contact_no,
                position: responseJson.position,
                city: responseJson.city,
                address: responseJson.address,
                description: responseJson.description,
                isLoading: false
            });
            console.log(data)
        }).catch((error) => {
            setData({
                ...data,
                isLoading: true,
                server_err: 'Server error. Please try Later'
            })
        });
    }

    const _closeOnPress = () => {
        isVisible(false)
    }
    // const imageZoom=()=>{
    //     console.log(123)
    //     setData({
    //         ...data,
    //         isImageZoom:true
    //     })

    // }
    if (data.isLoading) {
        return (
            <LoadingIndicator />
        )
    }
    return (
        <ScrollView styles={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.imgContainer}>
                    {/* <TouchableOpacity onPress={imageZoom}> */}
                    <Image source={{ uri: imgUrl + data.image }} style={styles.img} />
                    {/* </TouchableOpacity>                                       */}
                </View>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.position}>{data.position}</Text>
                <Text style={styles.place}>{data.city}</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{ margin: 15 }}>
                    <Text style={styles.findAreaTxt}>Find the service area or location</Text>
                            <TouchableOpacity onPress={()=>isVisible(true)}>
                            <Image source={require("../../assest/images/map.png")} resizeMode="contain" style={styles.mapImg} />

                            </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.findAreaTxt}>Contact Me</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Feather name="phone" size={13} />
                                <Text style={styles.contactTxt}>{data.contact}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={styles.findAreaTxt}>Address</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Ionicons name="location-outline" size={13} />
                                <Text style={styles.contactTxt}>{data.address}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.findAreaTxt}>Description</Text>
                    <Text style={styles.des}>{data.description}</Text>
                </View>
            </View>
            
            <Modal transparent={true} visible={visi} >
                <View style={styles.modalBg}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeBtnView} onPress={_closeOnPress}>
                            <MaterialCommunityIcons name="close-thick" size={30} color="black" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 15, color: 'black', margin: 15 }}>{region.address}</Text>
                        <MapView style={styles.map}
                            initialRegion={{
                                latitude: region.latitude,
                                longitude: region.longitude,
                                latitudeDelta: region.latitudeDelta,
                                longitudeDelta: region.longitudeDelta,
                            }}
                            provider="google"
                        >
                            <Marker
                                draggable={true}
                                coordinate={{
                                    latitude: region.latitude,
                                    longitude: region.longitude,
                                }}
                                pinColor='black'
                            >
                                <Callout>
                                    <Text>I'm here</Text>
                                </Callout>
                            </Marker>
                            <Circle center={{ latitude: region.latitude, longitude: region.longitude, }} radius={1000} />
                        </MapView>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default DetailsAboutTechnicianScreen;