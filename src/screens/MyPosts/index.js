import React,{useState,useEffect} from 'react';
import {Text,View,FlatList,Alert} from 'react-native';
import {styles} from './styles';
import api from '../../api/jsonServer';
import url from '../../api/url';
import MyPostCard from '../../component/MyPostCard';
import LoadingIndicator from '../../component/LocationIndicator';

const MyPosts=({navigation})=>{
    const [posts,setPosts]=useState([]);
    const [isLoading,setLoading]=useState(false)

    useEffect(() => {
        getData();    
    }, []);
 
    const getData = () => {
        setLoading(true)
        fetch(url+'user_posts').then((response)=>response.json()).then((responseJson)=>{
            setLoading(false)
            setPosts(responseJson);
        }).catch((error)=>{
            console.log(error);
        });
    }

    const ItemView = ({ item }) => { 
        return (
          <MyPostCard
            quec={item}
            onEditPress={()=>navigation.navigate("EditPost",{item})}
            onDeletePress={()=>deleteOnPress(item.qid)}
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
      function deleteOnPress(id){
          console.log("uid "+id)
        Alert.alert(
            "Delete Question",
            "Are you sure want to delete this question?",
            [
                { text: "Yes", 
                    onPress: () => deleteQuestion(id),
                    style:"default"
                },
              {
                text: "Cancel",
                style: "cancel"
              }
              
            ]
          ); 
    }

    function deleteQuestion(id){
        api.get('/deleteUserPost/'+id).then((response)=>{   
            console.log(response.data)       
            if(response.data.err===false){ 
                 
                Alert.alert(
                    "Deleted Question Sucussfully!",
                    "Your Question delete successfully"
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
      
    //   if(isLoading){
    //     return (
    //      <LoadingIndicator/>   
    //     )
    // }
    return(
        <View style={{backgroundColor:'#f2f2f2',margin:20}}>
            <View style={styles.container}>
                <FlatList
                    data={posts}
                    renderItem={ItemView}
                    keyExtractor={ (item, index) => index.toString() } 
                    ItemSeparatorComponent={ItemSeparatorView}  
                />
            </View> 
        </View>       
    )
}

export default MyPosts;