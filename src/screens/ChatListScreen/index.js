import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
// import { styles } from './styles';
import Firebase from '../../Firebase/firebaseSDK';
import api from "../../api/jsonServer";
import imgUrl from '../../api/imageURL';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");

const ChatListScreen = ({ navigation }) => {
    const [data, setData] = useState({
        msg: '',
        allMsg: [],
        uid: 0
    })
    const [serviceProvider,setServiceProvider]=useState({
        name:'',
        image:''
    })
    useEffect(() => {
        getAllMsg()
    }, []);

    const getAllMsg = async () => {
        await api.get("/allUsersWithUserDetails").then((res) => {
            var users = res.data.users;
            let messages = [];
            users.forEach(user => {
                try {
                    Firebase.
                        database()
                        .ref('messages')
                        .child(res.data.uid)
                        .child(user.uid)
                        .limitToLast(1)
                        .on("value", (dataSnapshot) => {
                            dataSnapshot.forEach(e => {
                                console.log(e.val())
                                messages.push({
                                    user: {
                                        id: e.val().user.id,
                                        name: e.val().user.name,
                                        image: e.val().user.image
                                    },
                                    serviceProvider: {
                                        id: e.val().serviseProvider.id,
                                        name: e.val().serviseProvider.name,
                                        image: e.val().serviseProvider.image
                                    },
                                    msg: e.val().msg
                                })
                            });
                        })
                } catch (error) {
                    return error;
                }
            });
            setData({
                ...data,
                allMsg: messages.reverse(),
                uid:res.data.uid
            })
        })
    }
    const ItemView = ({ item }) => {
        console.log('item1')
        console.log(item.serviceProvider.name)
        var name,image;
        if(data.uid===item.user.id){
            console.log()
            name=item.serviceProvider.name;
            image=item.serviceProvider.image
        }else{
            name=item.user.name;
            image=item.user.image 
        }
        return (
            <TouchableOpacity style={styles.CardContainer} onPress={() => navigation.navigate('ChatScreen', { item,name,image })}>
                <View style={styles.sideContainer}>
                    <Image style={styles.img} source={{ uri: imgUrl + image }} />
                </View>
                <View style={styles.txtContainer}>
                    <Text style={{color:'black',fontSize:15,marginBottom:2}}>{name}</Text>
                    <Text>{item.msg}</Text>                   
                </View>
                <View style={styles.sideContainer}>
                    <Text>12.45pm</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            <FlatList
                inverted
                style={{ marginBottom: 60 }}
                data={data.allMsg}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
            />
        </View>
    )
}

export default ChatListScreen;

const styles = StyleSheet.create({
    CardContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        height: height / 10,
        margin: 10
    },
    sideContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    txtContainer: {
        flex: 0.6,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 10,
        margin: 5
    },
});