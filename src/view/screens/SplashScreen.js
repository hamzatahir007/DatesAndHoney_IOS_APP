import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '../../consts/Colors';
// import { SvgUri } from 'react-native-svg';
import SVGImg from '../../assets/splashlogo.svg';


const SplashScreen = ({ navigation }) => {
    setTimeout(() => {
        navigation.navigate('LoginScreen');
        console.log('LoginScreen');
      }, 3000);
    return (
        <View style={styles.container}>
            {/* <Text>Hello</Text> */}
            <SVGImg width={137} height={97} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    }
})