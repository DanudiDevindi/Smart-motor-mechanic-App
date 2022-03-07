import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground ,ScrollView} from 'react-native';
import { styles } from './styles';
import Servicecard from '../../component/ServiceCard';
import url from '../../api/url';
import api from '../../api/jsonServer';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingIndicator from '../../component/LocationIndicator';

const AllServiceScreen = ({ route, navigation }) => {  
    const vehicle = route.params?.vehicle;
    const [cat, setCat] = useState([]);
    const [serviceTypes, setServiceType] = useState([]);
    const [cities, setCity] = useState([])
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectItem] = useState(null);
    
    const [filter, setFilter] = useState({
        city: '',
        category: '',
        service: '',
        filter_err: '',
    })

    useEffect(() => {
        getData();
        getCategories();
        getServiceType();

    }, []);

    useFocusEffect(useCallback(() => {
        getData();
    }, []));

    const getCategories = () => {
        fetch(url + 'AllCategory').then((response) => response.json()).then((responseJson) => {
            setCat(responseJson);
        }).catch((error) => {
            console.log(error);
        });
    }

    const getServiceType = () => {
        fetch(url + 'AllService_types').then((response) => response.json()).then((responseJson) => {
            setServiceType(responseJson);
        }).catch((error) => {
            console.log(error);
        });
    }

    const getData = () => {
        setIsLoading(true);
        fetch(url + 'allServices/' + vehicle + "/" + page).then((response) => response.json()).then((responseJson) => {
                     
            setPage(page + 1);
            setCity(responseJson.cities)
            setFilteredDataSource([...filteredDataSource, ...responseJson.services]);
            setMasterDataSource([...masterDataSource, ...responseJson.services]);
            setIsLoading(false)
        }).catch((error) => {
            console.log(error);
        });
    }

    const ItemView = ({ item }) => {
        return (
            <Servicecard
                service={item}
                onPress={() => navigation.navigate("ServiceDetails", { item })}
            />
        );
    };

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    console.log(item.user_name)
                    const textData = text.toUpperCase();
                    const user_name = item.user_name ? item.user_name.toUpperCase() : "".toUpperCase();
                    if (user_name.indexOf(textData) > -1) {
                        return user_name.indexOf(textData) > -1;
                    }
                    const category = item.category ? item.category.toUpperCase() : "".toUpperCase();
                    if (category.indexOf(textData) > -1) {
                        return category.indexOf(textData) > -1;
                    }
                    const title = item.title ? item.title.toUpperCase() : "".toUpperCase();
                    if (title.indexOf(textData) > -1) {
                        return title.indexOf(textData) > -1;
                    }
                    const service_type = item.service_type ? item.service_type.toUpperCase() : "".toUpperCase();
                    if (service_type.indexOf(textData) > -1) {
                        console.log(item.service_type)
                        return service_type.indexOf(textData) > -1;
                    }
                    const address = item.address ? item.address.toUpperCase() : "".toUpperCase();
                    if (address.indexOf(textData) > -1) {
                        return address.indexOf(textData) > -1;
                    }

                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const fileterOnPress = () => {
        setFilteredDataSource([]);
        setMasterDataSource([]);
        setFilter({
            ...filter,
            filter_err: ""
        });
        const data = {
            filter: filter,
            page: page
        }

        api.post('allServicesWithFilter', data).then((response) => {
            setFilteredDataSource(response.data);
            setMasterDataSource(response.data);

        }).catch((err) => {
            console.log(err)
        })
        // }
    }
    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    marginTop: 18,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const handleReadMore = () => {
        getData();
    }

    const renderFooter = () => {
        return (
            <View style={styles.loader}>
                {isLoading ? <ActivityIndicator size="small" /> : null}
            </View>
        )
    }

    const EmptyListMessage = () => {
        return (
            <View style={styles.emptyListStyle}>
                <Text>Not Found Service Records</Text>
            </View>
        );
    };

    function testing(itemValue) {
        setFilter({
            ...filter,
            city: itemValue,
            isSelectPicker: true
        })
    }

    // const handleEnd=()=>{
    //     return(
    //         <View style={{marginTop:200}}>

    //         </View>
    //     )
    // }

    const onRefresh=()=>{
        setData([]);
        getData()
    }

    // if(isLoading){
    //     return (
    //      <LoadingIndicator/>   
    //     )
    // }
    return (
        <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity style={{ height: 50, width: '100%', marginBottom: 10 }} onPress={()=>navigation.navigate('near_location')}> 
                {/* <TouchableOpacity style={{ height: 50, width: '100%', marginBottom: 10 }} onPress={viewServeiceProvice}> */}
                    <ImageBackground source={require("../../assest/images/map.png")} resizeMode="stretch" style={{ height: '100%', width: '100%', opacity: 0.6, justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginLeft: 15 }}>NEAREST SERVICE PROVIDERS</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginBottom: 10, backgroundColor: '#F5F5F5', borderRadius: 15 }}>
                    <TextInput placeholder="Search here" style={styles.serchInPutTxt} onChangeText={text => searchFilterFunction(text)} />
                </View>
                <View style={{ flexDirection: 'row', height: 90 }}>
                    <View style={{ width: "28%" }}>
                        <Text>City</Text>
                        <View style={{ backgroundColor: '#F5F5F5', borderRadius: 20, justifyContent: 'center' }}>
                            <Picker
                                // mode='dropdown'
                                selectedValue={filter.city}
                                style={{fontSize:1}}
                                onValueChange={(itemValue, itemIndex) =>
                                    testing(itemValue)
                                }
                            >
                                <Picker.Item label="All" value="" />
                                {cities.map(city => (
                                    <Picker.Item label={city} value={city} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={{ width: "28%", marginHorizontal: "2%" }}>
                        <Text>Service Type</Text>
                        <View style={{ borderRadius: 20, justifyContent: 'center', backgroundColor: '#F5F5F5', }}>
                            <Picker
                                selectedValue={filter.service}
                                // mode='dropdown'
                                onValueChange={(itemValue, itemIndex) =>
                                    setFilter({
                                        ...filter,
                                        service: itemValue
                                    })
                                }
                            >
                                <Picker.Item label="All" value="" />
                                {serviceTypes.map(serviceType => (
                                    <Picker.Item label={serviceType.type} value={serviceType.type} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={{ width: "28%" }}>
                        <Text>Service category</Text>
                        <View style={{ backgroundColor: '#F5F5F5', borderRadius: 20, justifyContent: 'center' }}>
                            <Picker
                                // mode='dropdown'
                                selectedValue={filter.category}
                                onValueChange={(itemValue, itemIndex) =>
                                    setFilter({
                                        ...filter,
                                        category: itemValue
                                    })
                                }
                            >
                                <Picker.Item label="All" value="" />
                                {cat.map(category => (
                                    <Picker.Item label={category.name} value={category.name} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity style={{ width: "15%", justifyContent: 'center', marginLeft: 20 }} onPress={fileterOnPress}>
                        <MaterialCommunityIcons name="filter-menu" size={25} color='#25DCE8' />
                    </TouchableOpacity>
                </View>
                {/* {isLoading ? <ActivityIndicator /> : null} */}
                <FlatList                
                    style={{ marginBottom: 60 }}
                    extraData={selectedItem}
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                    enableEmptySections={true}
                    // refreshControl={
                    //     <RefreshControl
                    //     colors={["#9Bd35A", "#689F38"]}
                    //     refreshing={isLoading}
                    //     onRefresh={onRefresh} 
                    //     />
                    // }
                    // onEndReached={handleEnd}
                    // onEndReachedThreshold={0}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={EmptyListMessage}
                />
                
                
            </View>
        </ScrollView>
    )
}

export default AllServiceScreen;