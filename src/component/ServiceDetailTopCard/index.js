import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { styles } from './styles';
import imgUrl from '../../api/imageURL';
import moment from "moment";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageView from '../ImageView';
const ServiceDetailTopCard = ({ service, onPress }) => {
    const [imgVisi, isImgVisible] = useState(false);
    return (
        <View style={styles.CardContainer}  >
            <TouchableOpacity style={styles.imageContainer} onPress={() => isImgVisible(true)}>
                <Image style={styles.img} source={{ uri: imgUrl + service.image }} resizeMode="stretch" />
            </TouchableOpacity >

            <TouchableOpacity style={styles.txtContainer} onPress={onPress}>
                <Text style={styles.title}>{service.title}</Text>
                <Text style={styles.blueSmallTxt}>{service.category} For {service.service_type}</Text>
                <Text style={{ color: 'black' }}>{moment(service.createAt).format("MMMM Do YYYY, h:mm a")}</Text>
                <Text style={styles.city}>{service.city}</Text>
                <Text style={styles.rate}>Rs. {service.price} {service.price_set_as}</Text>
                <Text style={{ fontWeight: '800', fontSize: 15, color: '#1B17E1' }}>For sale by {service.user_name}</Text>
                {/* <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{alignItems:'flex-start'}}>condition:</Text>
                    <Text style={{alignItems:'flex-end'}}>new</Text>
                </View> */}
            </TouchableOpacity>
            <Modal transparent={true} visible={imgVisi}>
                <View style={styles.modalBg}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeBtnView} onPress={() => isImgVisible(false)}>
                            <MaterialCommunityIcons name="close-thick" size={35} color="black" />
                        </TouchableOpacity>
                        <ImageView
                            img1={service.image}
                            img2={service.image2}
                            img3={service.image3}
                        />
                    </View>
                </View>
            </Modal>
        </View>

    )
}

export default ServiceDetailTopCard;