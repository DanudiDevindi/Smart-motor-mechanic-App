import React, { useState,useEffect } from 'react';
import { Text, View,PermissionsAndroid } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { getPreciseDistance } from 'geolib';
import imgUrl from '../../api/imageURL';
import url from '../../api/url';

const NearLocation = () => {
    var nearService = []
    const [region, setRegion] = useState({
        latitude: 6.93194,
        longitude: 79.84778,
        address: '',
        latitudeDelta: 0.922,
        longitudeDelta: 0.421,
        showAddress: false,
        locationStatus: '',
        isGetCurrentLocation: false
    });
    const [reports, setReports] = useState([])
    const [service,setServices]=useState([])

    useEffect(() => {
        currentLocationPermission() 
        getServices();        
    }, []);

    const getServices=()=>{
        fetch(url + 'allServices').then((response) => response.json()).then((responseJson) => {
            setServices(responseJson)
            setReports(responseJson)
        }).catch((error) => {
            console.log(error);
        });
    }
    
    const subscribeLocationLocation = () => {
        console.log("subcribeLocation1")
        watchID = Geolocation.watchPosition(
            (position) => {
                console.log("subcribeLocation2")
                // console.log(position)
                //getting the Longitude from the location json        
                const currentLongitude = JSON.stringify(position.coords.longitude);
                console.log("subcribeLocation3")
                // console.log(currentLongitude)

                //getting the Latitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                console.log("subcribeLocation4");
                // console.log(currentLatitude)

                setRegion({
                    ...region,
                    locationStatus: 'You are Here',
                    longitude: parseFloat(currentLongitude),
                    latitude: parseFloat(currentLatitude)
                })
                console.log("subcribeLocation5")
                
                // console.log(region)
            },
            (error) => {
                console.log("subcribeLocation6");
                // console.log(error)
                setRegion({
                    ...region,
                    locationStatus: error.message
                })
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };

    const getOneTimeLocation = () => {
        console.log("getoneTimeLocation1")
        setRegion({
            ...region,
            locationStatus: 'Getting Location ...'
        })
        // console.log(region)
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                console.log("getoneTimeLocation2")
                // console.log(position)

                //getting the Longitude from the location json
                const currentLongitude = JSON.stringify(position.coords.longitude);
                console.log("getoneTimeLocation3")
                // console.log(currentLongitude)

                //getting the Latitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                console.log("getoneTimeLocation4");
                // console.log(currentLatitude)

                setRegion({
                    ...region,
                    longitude: parseFloat(currentLongitude),
                    latitude: parseFloat(currentLatitude),
                    locationStatus: 'You are Here',
                    latitudeDelta: 0.922,
                    longitudeDelta: 0.421,
                })
                console.log("getoneTimeLocation5")
                // console.log(region)
            },
            (error) => {
                console.log("getoneTimeLocation6")
                setRegion({
                    ...region,
                    locationStatus: error.message
                })
                // setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };

    const currentLocationPermission = async () => {
        console.log("currentLocationPermission1")
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                console.log("currentLocationPermission2")
                getOneTimeLocation();
                subscribeLocationLocation();
            } else {
                console.log("currentLocationPermission3")
                try {
                    console.log("currentLocationPermission4")
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("currentLocationPermission5")
                        //To Check, If Permission is granted
                        getOneTimeLocation();
                        subscribeLocationLocation();
                    } else {
                        console.log("currentLocationPermission6")
                        setRegion({
                            ...region,
                            locationStatus: 'Permission Denied'
                        })
                    }
                } catch (err) {
                    console.log("currentLocationPermission7")
                    console.log(err)
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
        return () => {
            console.log("currentLocationPermission8")
            Geolocation.clearWatch(watchID);
        };

    }

    const viewServeiceProvice = () => {
        console.log("viewServiceProS")
        currentLocationPermission()
        console.log("Services")

        masterDataSource.map(data1 => {

            var pdis = getPreciseDistance(
                { latitude: region.latitude, longitude: region.longitude },
                { latitude: data1.latitude, longitude: data1.longitude },
            );
            // console.log(pdis)
            if (pdis / 1000 < 50) {
                nearService.push(data1)
            }

        })
        console.log("nearRe")
        setReports(nearService)
    }

    const mapMarker = () => {
        console.log("mapmarker")

        return reports.map((report) =>
            <Marker
                key={report.service_id}
                coordinate={{ latitude: report.latitude, longitude: report.longitude }}
                title={report.title}
            >
                {/* <Callout>
                    <View style={{ width: 100, height: 100 }}>
                        <Image style={{ height: 100, width: 100 }} source={{ uri: imgUrl + report.image }} resizeMode="contain" /> 
                         <Text>{report.title}</Text>
                    </View>
                </Callout> */} 
            </Marker >)
    }
    return (
        <MapView style={{flex:1}}
           region={{
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
            }}
            provider="google"
        >
            {mapMarker()}
        </MapView>
    )
}

export default NearLocation;