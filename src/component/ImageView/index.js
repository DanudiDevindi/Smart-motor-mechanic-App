import React from 'react';
import { Text, View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen");
import AppIntroSlider from 'react-native-app-intro-slider';
import imgUrl from '../../api/imageURL';
var images = []

const ImageView = ({ img1, img2, img3 }) => {
    if (img2 !== "" && img3 !== "") {
        images.push(img1)
        images.push(img2)
        images.push(img3)
    } else if (img2 !== "" && img3 === "") {
        images.push(img1)
        images.push(img2)
    } else if (img2 === "" && img3 === "") {
        images.push(img1)
    }
    const ItemView = ({ item }) => {
        console.log(item)
        return (
            <View style={{flexDirection:'row'}}>
                <View style={{flex:0.1,backgroundColor:'red'}}>

                </View>
                <View style={{flex:0.8}}>
                    <Image
                        style={{ height: height*.8, width: width}}
                        source={{ uri: imgUrl + item }}
                        resizeMode="stretch" 
                    />
                </View>
                <View style={{flex:0.1}}>

                </View>
            </View>

        )
    }
    return (
        <FlatList
        data={images}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={true}
        bounces={false}
        pagingEnabled//when scrolling to get full page
        onMomentumScrollEnd={() => console.log(456)}
    />
    )

}

export default ImageView;



const styles = StyleSheet.create({
    // container:{
    //     marginBottom:2
    // },
    txt: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4C4C4C',
    },
    txtInput: {
        borderWidth: 1,
        borderColor: '#D6D6D6',
        lineHeight: 18,
        borderRadius: 10,
        fontSize: 15,
        // height:46,
        marginTop: 5,
        paddingHorizontal: 15
    }
});
