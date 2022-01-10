import React, { useState,useEffect,useCallback } from 'react';
import { Text, SafeAreaView, View,FlatList,ScrollView, RefreshControl,ActivityIndicator } from 'react-native';
import { styles } from './styles';
import HomeTopCard from '../../component/HomeTopCard';
import Post from '../../component/Post';
import url from '../../api/url';
import { useFocusEffect } from '@react-navigation/native';
import LoadingIndicator from '../../component/LocationIndicator';

const HomeScreen = ({ navigation }) => {
    console.log("testing Adding")
    // const [refreshing, setRefreshing] = useState(true);
    const [isLoading,setLoading]=useState(false)
    const [visi, isVisible] = useState(false);
    const [vehi, setVehi] = useState({
        firstVehiCount:0,
        firstVehi:'',
        secondVehiCount:0,
        secondVehi:'',
        thirdVehiCount:0,
        thirdVehi:'',
        totalVehiCount:0
    });

    const [data,setData]=useState([]);

    const ItemView = ({ item }) => { 
        return ( 
          <Post
            postData={item}
          />   
        );
    };

    useEffect(() => {
        getData();  
        getCategory();
    }, []);

    // useFocusEffect(() => {
    //     getData()
    // });
 
    const getData = () => {
        setLoading(true)
        fetch(url+'allQuections').then((response)=>response.json()).then((responseJson)=>{
            console.log(777777)
            setLoading(false)
            setData(responseJson);
        }).catch((error)=>{
            console.log(error);
        });
    }

    useFocusEffect(useCallback(() => {
        getData();
      }, []));
      
    const getCategory=()=>{
        setLoading(true)
        fetch(url + 'AllCategoryWithCount').then((response) => response.json()).then((responseJson) => {
            setLoading(false)
            setVehi({
                ...vehi,
                firstVehiCount:responseJson[0].vehiCount,
                firstVehi:responseJson[0].category,
                secondVehiCount:responseJson[1].vehiCount,
                secondVehi:responseJson[1].category,
                thirdVehiCount:responseJson[2].vehiCount,
                thirdVehi:responseJson[2].category,
                totalVehiCount:responseJson[0].vehiCount+responseJson[1].vehiCount+responseJson[2].vehiCount
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    const onRefresh=()=>{
        setData([]);
        getData()
    }

    if(isLoading){
        return (
         <LoadingIndicator/>   
        )
    }

    return (
        <ScrollView style={{ backgroundColor: '#f2f2f2'}}>
            <View style={{ marginHorizontal: 13,marginBottom:70}}>
                <View style={styles.container}>
                    <HomeTopCard
                        vehi={vehi.firstVehi}
                        vehiCount={vehi.firstVehiCount}
                        img={require("../../assest/images/s1.png")}
                        onPress={() => navigation.navigate("AllServices",{vehicle:vehi.firstVehi})}
                    />
                    <HomeTopCard
                        vehi={vehi.secondVehi}
                        vehiCount={vehi.secondVehiCount}
                        img={require("../../assest/images/s2.png")}
                        onPress={() => navigation.navigate("AllServices",{vehicle:vehi.secondVehi})}
                    />
                    <HomeTopCard
                         vehi={vehi.thirdVehi}
                         vehiCount={vehi.thirdVehiCount}
                         img={require("../../assest/images/s4.png")}
                         onPress={() => navigation.navigate("AllServices",{vehicle:vehi.thirdVehi})}
                    />
                    <HomeTopCard
                        vehi={"All Services"}
                        img={require("../../assest/images/s3.png")}
                        vehiCount={vehi.totalVehiCount}
                        onPress={() => navigation.navigate("AllServices",{vehicle:'all'})}
                    />
                </View>
                {isLoading ? <ActivityIndicator /> : null}
                <FlatList
                style={{marginBottom:40}}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                    enableEmptySections={true}
                    refreshControl={
                        <RefreshControl
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={isLoading}
                        onRefresh={onRefresh} 
                        />
                    }
                />               
                
            </View> 
            {/* <View style={{ marginBottom: 100 }}></View>            */}
        </ScrollView>
    )
}

export default HomeScreen;