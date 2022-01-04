import React,{useEffect} from 'react';
import {Text,View,ImageBackground,Image,TouchableOpacity, Touchable} from 'react-native';
import {styles} from './styles';

const SplashScreen =({navigation})=>{
    useEffect(() => {
        setTimeout(function(){ navigation.navigate("SignIn") }, 3000);
      }, []);

    return(
        // <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate("SignIn")}>
            <ImageBackground source={require("../../assest/images/splash.png")} style={styles.bgimage} resizeMode="stretch">
                <View style={styles.cardContainer}>
                    <Image style={styles.img} source={require("../../assest/images/logo-01.png")}/>
                    <Text style={styles.largeTxt}>SMART MOTOR MECHANIC</Text>
                    <Text style={styles.smallTxt}>we will make best solution for your life</Text>                    
                </View>
            </ImageBackground>
        //</TouchableOpacity>
    )
}
export default SplashScreen;