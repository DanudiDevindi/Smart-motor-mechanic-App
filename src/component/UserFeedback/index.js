import React,{useState} from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserFeedback = ({ item }) => {
    console.log(item.rate)
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    return (
        <View style={{ backgroundColor: '#f2f2f2', borderRadius: 10 }}>
            <View style={{ margin: 15 }}>
                <Text style={{color:'black'}}>{item.username}</Text>
                <View style={{ flexDirection: 'row',marginVertical:5 }}>
                {
                    maxRating.map((item1, key) => {
                        return (
                            <MaterialIcons name={item1 <= item.rate ? "star" : "star-border"} size={20} color="#25DCE8" key={item1} />
                        )

                    })
                }

            </View>                
                <Text style={{fontSize:18}}>{item.comment}</Text>
            </View>
        </View>
    )
}

export default UserFeedback;