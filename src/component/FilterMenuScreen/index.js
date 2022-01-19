import React, { useState,useEffect } from 'react';
import { Text, View, Picker } from 'react-native';
import url from '../../api/url';
// import { Picker } from '@react-native-picker/picker';

const FilterMenuScreen = ({ service }) => {
    const [cat,setCat]=useState([])
    const [selectedValue, setSelectedValue] = useState({
        district: 'District',
        category: 'Category',
        service: 'Service'
    });

    const getCategories = () => {
        fetch(url + 'AllCategory').then((response) => response.json()).then((responseJson) => {
            setCat(responseJson);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <View>

           <View style={{ flexDirection: 'row', height: 30, marginVertical: 15 }}>
            <View style={{ width: "30%", backgroundColor: '#F5F5F5', borderRadius: 20, justifyContent: 'center' }}>
                <Picker
                    selectedValue={selectedValue.district}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue({
                        district: itemValue
                    })}
                >
                    <Picker.Item label="Colombo" value="colombo" />
                    <Picker.Item label="Kalutara" value="kalutara" />
                    <Picker.Item label="Rathnapura" value="rathnapura" />
                    <Picker.Item label="Galle" value="galle" />
                    <Picker.Item label="Matara" value="matara" />
                    <Picker.Item label="Hambantota" value="hambantota" />
                    <Picker.Item label="Monaragala" value="monaragala" />
                    <Picker.Item label="Badulla" value="badulla" />
                    <Picker.Item label="Nuwara Eliya" value="nuwara-eliya" />
                    <Picker.Item label="Kegalle" value="kegalle" />
                    <Picker.Item label="Gampaha" value="gampaha" />
                    <Picker.Item label="Kandy" value="kandy" />
                    <Picker.Item label="Ampara" value="ampara" />
                    <Picker.Item label="Kurunegala" value="kurunegala" />
                    <Picker.Item label="Matale" value="matale" />
                    <Picker.Item label="Batticaloa" value="batticaloa" />
                    <Picker.Item label="Polonnaruwa" value="polonnaruwa" />
                    <Picker.Item label="Puttalam" value="puttalam" />
                    <Picker.Item label="Anuradhapura" value="anuradhapura" />
                    <Picker.Item label="Trincomalee" value="trincomalee" />
                    <Picker.Item label="Mannar" value="mannar" />
                    <Picker.Item label="Vavuniya" value="vavuniya" />
                    <Picker.Item label="Mullaitive" value="mullaitive" />
                    <Picker.Item label="Kilinochchi" value="kilinochchi" />
                    <Picker.Item label="Jaffna" value="jaffna" />
                </Picker>
            </View>
            <View style={{ width: "45%", backgroundColor: '#F5F5F5', marginHorizontal: "2%", borderRadius: 20 ,justifyContent: 'center'}}>
                <Picker
                    onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
                >
                    {service.map(ser => (
                        <Picker.Item label={ser.title} value={ser.title} />
                    ))}                    
                </Picker>

            </View>
            <View style={{ width: "20%", backgroundColor: '#F5F5F5', borderRadius: 20 ,justifyContent: 'center'}}>
            <Picker
                    selectedValue={selectedValue.district}
                    onValueChange={(itemValue, itemIndex) => console.log(itemValue)}
                >
                    {cat.map(category => (
                        <Picker.Item label={category.name} value={category.name} />
                    ))}
                </Picker>   
            </View>
        </View> 
    </View>
        
    )
}

export default FilterMenuScreen;