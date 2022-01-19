import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const MapInput = () => {
  return (
    <GooglePlacesAutocomplete
    
      placeholder='Search Places'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyA-YsvR40ps5OedaFV3TH7TEcnYfAQoAOE',
        language: 'en',
      }}
      styles={{
        container:{flex:0,position:'absolute',zindex:0,top:10,justifyContent:'center',width:'100%',marginHorizontal:10},
        listView:{backgroundColor:'white'}
      }}
    />
  );
};

export default MapInput;
