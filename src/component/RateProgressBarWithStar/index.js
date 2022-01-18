import React,{useState} from 'react';
import { Text, View } from 'react-native';
import PercentageBar from '../../component/PercentageBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RateProgressBarWithStar = ({ percentage, starCount }) => {
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 8, }}>
            <View style={{ flex: 0.6 }}>
                <PercentageBar
                    height={10}
                    backgroundColor={'grey'}
                    completedColor={'grey'}
                    percentage={percentage}
                />
            </View>
            <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <MaterialIcons name={item <= starCount ? "star" : "star-border"} size={15} color="#FF8546" key={item} />
                        )

                    })
                }

            </View>
        </View>
    )
}

export default RateProgressBarWithStar;