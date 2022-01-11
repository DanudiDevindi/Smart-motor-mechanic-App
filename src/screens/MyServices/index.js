import React,{useState,useEffect} from 'react';
import {Text,View,FlatList,SafeAreaView,Alert} from 'react-native';
import {styles} from './styles';
import api from '../../api/jsonServer';
import url from '../../api/url';
import MyServicesCard from '../../component/MyServicesCard';

const MyServices=({navigation})=>{
    const [services,setService]=useState([]);

    useEffect(() => {
        getData();    
    }, []);
 
    const getData = () => {
        fetch(url+'user_service').then((response)=>response.json()).then((responseJson)=>{
            setService(responseJson);
        }).catch((error)=>{
            console.log(error);
        });
    }
    function deleteOnPress(id){
        Alert.alert(
            "Delete Service",
            "Are you sure want to delete this service?",
            [
                { text: "Yes", 
                    onPress: () => deleteService(id),
                    style:"default"
                },
              {
                text: "Cancel",
                style: "cancel"
              }
              
            ]
          ); 
    }

    function deleteService(id){
        api.get('/deleteUserService/'+id).then((response)=>{   
            console.log(response.data)       
            if(response.data.err===false){ 
                 
                Alert.alert(
                    "Deleted Service Sucussfully!",
                    "Your Service delete successfully"
                    [
                        { text: "OK", 
                            style:"default",
                            onPress:getData()
                        }
                      
                    ]
                  );            
            }else{
                console.log("Server error")
                // alert('Sorry! Server error');  
            }
        })
    }

    const ItemView = ({ item }) => { 
        return (
          <MyServicesCard
            service={item}
            onEditPress={()=>navigation.navigate("EditService",{item})}
            onDeletePress={()=>deleteOnPress(item.service_id)}
            type="service"
          />   
        );
    };

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    marginTop:18,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
      };
      
    return(
        <View style={{backgroundColor:'#f2f2f2',margin:20}}>
            <View style={styles.container}>
                <FlatList
                    data={services}
                    renderItem={ItemView}
                    keyExtractor={ (item, index) => index.toString() } 
                    ItemSeparatorComponent={ItemSeparatorView}  
                />
            </View> 
        </View>       
    )
}

export default MyServices;