import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,PermissionsAndroid,Alert,TextInput} from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import LoadingIndicator from '../../component/LocationIndicator';
import { useFocusEffect } from '@react-navigation/native';

const Find_Location = ({ route,navigation }) => { 
  const {ui} =route.params; 
  const [isLoading,setLoading]=useState(false)
  const [region, setRegion] = useState({
    latitude: 6.93194,
    longitude: 79.84778,
    address:'',
    latitudeDelta: 0.922,
    longitudeDelta: 0.421,
    showAddress:false,
    locationStatus:'',
    isGetCurrentLocation:false,
    msg:''
  });

  const confirm_Current_location=()=>{
    console.log("confirm_location1")
    console.log(region)
    setRegion({
      ...region,
      showAddress:false
    })
    Alert.alert(
      "Current Location",
      "Current Location set as service Location",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => navigation.navigate(ui,{region:region}) }
      ]
    );   
  }

  const subscribeLocationLocation = () => {
    console.log("subcribeLocation1")
    // setLoading(true)
    watchID = Geolocation.watchPosition(
      (position) => {
        console.log("subcribeLocation2")
        console.log(position)
        //getting the Longitude from the location json        
        const currentLongitude =JSON.stringify(position.coords.longitude);
        console.log("subcribeLocation3")
        console.log(currentLongitude)

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        console.log("subcribeLocation4");
        console.log(currentLatitude)
        // setLoading(false)
        setRegion({
          ...region,
          locationStatus:'You are Here',
          longitude:parseFloat(currentLongitude),
          latitude:parseFloat(currentLatitude),
        })

      },
      (error) => {
        console.log("subcribeLocation6");
        console.log(error)
        setLoading(false)
        setRegion({
          ...region,
          locationStatus:error.message
        })
        console.log(region)
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
      locationStatus:'Getting Location ...'
    })
    console.log(region)
    setLoading(true)
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {  
        console.log("getoneTimeLocation2")
        console.log(position)     

        //getting the Longitude from the location json
        const currentLongitude =JSON.stringify(position.coords.longitude);
        console.log("getoneTimeLocation3")
        console.log(currentLongitude)

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        console.log("getoneTimeLocation4");
        console.log(currentLatitude)
        setLoading(false)
          setRegion({
            ...region,
            longitude:parseFloat(currentLongitude),
            latitude:parseFloat(currentLatitude),
            locationStatus:'You are Here',
            latitudeDelta: 0.922,
    longitudeDelta: 0.421,
          })
          console.log("getoneTimeLocation5")
          console.log(region)
      },
      (error) => {
        console.log("getoneTimeLocation6")
        setRegion({
          ...region,
          locationStatus:error.message
        })
        console.log(region)
        // setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const currentLocationPermission=async()=>{
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
              locationStatus:'Permission Denied'
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

  useFocusEffect(useCallback(() => {
    setRegion({
      ...region,
      isGetCurrentLocation:false
    })
  }, []));

  useEffect(() => {
    currentLocationPermission(); 
  }, []);

  if(isLoading){
    return (
     <LoadingIndicator/>   
    )
}

  return (
    <View style={styles.container}>
      {region.isGetCurrentLocation===false ?
      <View style={{position:'absolute',justifyContent:'center',zIndex: 2,flex:0.8,marginHorizontal:'2.5%',height:'35%',backgroundColor:'white',width:'95%',marginTop:10}}>
          <View style={{flexDirection:'row',marginLeft:10,marginTop:20}}>
            <TouchableOpacity style={{marginHorizontal:10,backgroundColor:'#FF8546',borderRadius:8,flex:0.5,alignItems:'center'}} onPress={()=>setRegion({...region,isGetCurrentLocation:true})}>
              <Text style={{fontSize:15, color:'white',margin:8,fontWeight:'bold'}}>Search Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:10,backgroundColor:'#FF8546',borderRadius:8,flex:0.5,alignItems:'center'}} onPress={confirm_Current_location}>
              <Text style={{fontSize:15,color:'white',margin:8,fontWeight:'bold'}}>Set Current Location</Text>
            </TouchableOpacity>
          </View>
      </View>
       :null}
      {region.showAddress===false?
       <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby:'distance'
        }}
        onPress={(data, details = null) => {
          setRegion({
            ...region,
            address:data.description, 
            latitude:details.geometry.location.lat,
            longitude:details.geometry.location.lng,
            showAddress:true
          })
          // navigation.navigate('AddService',{region:region})
        }}
        query={{
          key: 'AIzaSyA2UeDc9Q7vzFa7hzVlAEXoVCPLAr8Pfvg',
          language: 'en',
          // components:'country:lk',
          types:'establishment',
          radius:3000,
          location:`${region.latitude},${region.longitude}`
        }}
        styles={{
          container:{position:'absolute',marginTop:10,zIndex: 1,flex:0.8,marginHorizontal:'2.5%',width:'95%'},
          listView:{backgroundColor:'white'}
        }}
      />
      :
      <View style={{position:'absolute',marginTop:10,zIndex: 1,flex:0.8,marginHorizontal:'2.5%',width:'95%',height:'35%',backgroundColor:'white'}}>
          <Text style={{color:'black',fontSize:20,marginTop:10,marginLeft:10,fontWeight:'bold'}}>CONFIRM ADDRESS</Text>
          <Text style={{marginHorizontal:10,marginTop:10,fontSize:15}}>{region.address}</Text>
          <View style={{flexDirection:'row',marginLeft:10,marginTop:20}}>
            <TouchableOpacity style={{marginHorizontal:20}} onPress={()=>setRegion({...region,showAddress:false})}>
              <Text style={{fontSize:18, color:'blue'}}>Search Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal:20}} onPress={()=>navigation.navigate(ui,{region:region})}>
              <Text style={{fontSize:18, color:'#FF8546'}}>Confirm Address</Text>
            </TouchableOpacity>
          </View>
      </View> 
      }  
      <MapView style={styles.map} 
      region={{
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
            <Text>{region.address}</Text>
          </Callout>
        </Marker>
        <Circle center={{ latitude: region.latitude, longitude: region.longitude, }} radius={1000} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    alignItems:'center'
  },
  map: {
    width: "100%",
    height: '100%',
  }
})

export default Find_Location;