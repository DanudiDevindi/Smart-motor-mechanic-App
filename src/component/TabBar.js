import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated,Image,ImageBackground,TouchableOpacity,Text } from 'react-native';
// import { useTabBar } from '../contexts/TabBarProvider';
import Tab from './Tab';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width,height } = Dimensions.get('screen');

const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState('Home');
  const { routes } = state;
  const renderColor = currentTab => (currentTab === selected ? '#1B17E1' : '#000000');

//   const { showTabBar } = useTabBar();

  const animation = useRef(new Animated.Value(0)).current;

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  return (
    <View style={styles.wrapper}>
    <ImageBackground source={require('../assest/images/footer.png')} style={{width:width,height:'100%'}}>          
        <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}} >         
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}             
        </View>        
    </ImageBackground> 
    </View>  
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // height:100,
    position: 'absolute',
    bottom: 0,
    // top:0,
    // width:'100%',
    // // height:height,
    // minHeight:height,
    // height:100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: 250,
    borderRadius: 100,
    elevation: 2,
  },
});

export default TabBar;