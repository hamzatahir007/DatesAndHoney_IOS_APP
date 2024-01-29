import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/reducers/Reducers';
import SVGImg1 from '../../assets/arrowleft.svg';
import { TextInput } from 'react-native-paper';
const { width, height } = Dimensions.get("window");
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';



const NameScreen = ({ navigation, route }) => {
  // const { image1, image2, image3, image4, image5 } = route.params;
  const [name, setname] = useState('');
  const [nameError, setNameError] = useState(false);
  // console.log(image1, image2, image3, image4, image5);

  const OnDateOnBirthScreen = (name) => {
    // console.log('test', name);
    if (name == '' || name.length < 3) {
      if (name == '') {
        Toast.show("Please enter your name!", Toast.SHORT);
        setNameError(true)
      }
      else if (name.length < 3) {
        Toast.show("Fullname should be 3character log!", Toast.SHORT);
        setNameError(true)
      }
    }
    else {
      // var Data = new Object();
      // Data.image1=image1;
      // Data.image2=image2;
      // Data.image3=image3;
      // Data.image4=image4;
      // Data.image5=image5;
      // Data.name=name;
      navigation.navigate('DateOfBirthScreen', { name: name })
    }
    // dispatch({
    //   type: 'ADD_TO_USER',
    //   payload: { ...name },
    // })
  }

  const GetName = async () => {
    let checkToken = await AsyncStorage.getItem('AppleLoginAuth');
    if (checkToken) {
      const parsedToken = JSON.parse(checkToken);

      // Assuming your object structure has a 'name' property
      setname(parsedToken.name);
    }

  }

  
  useEffect(() => {
    GetName()
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>
          <View style={{
            alignItems: 'center',
            // paddingTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            height: 60,
            paddingHorizontal: 20,
          }}>
            <View style={{
              flex: 1,
              // backgroundColor: COLORS.gray2
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
            <View style={{
              flex: 2,
              // backgroundColor: COLORS.gray,
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 20
            }}>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: COLORS.gray2
            }}>
            </View>
          </View>

          <View style={{
            paddingTop: 10
          }}>
            <Image source={require('../../assets/namescreen.png')} resizeMode='contain' style={{
              height: height / 8
            }} />
          </View>


          <View style={{
            paddingTop: 20,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>What's your Name?</Text>
          </View>


          <View style={{
            paddingTop: 0,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>Enter the full name</Text>
          </View>

          <View style={styles.NumberInput}>
            <TextInput
              error={nameError}
              onFocus={() => setNameError(false)}
              value={name}
              placeholder={'Full name'}
              underlineColor={COLORS.transparent}
              activeUnderlineColor={COLORS.transparent}
              // error={inputfirstName}
              onChangeText={name => setname(name)
              }
              style={styles.TextInput}
            />
          </View>

          <View style={{
            top: '20%',
            justifyContent: 'flex-end',
          }}>
            <CustomeButton width={width / 1.1} onpress={() => OnDateOnBirthScreen(name)}
              title={'Continue'} />

            <View style={{
              paddingTop: 10,
              marginBottom: 30
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10 }}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>
          </View>

        </View>


        {/* 
        <View style={styles.footer}>

        </View> */}
      </View>



    </SafeAreaView>
  )
}

export default NameScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  contentContainer: {
    height: '100%',
    alignItems: 'center',
  },
  footer: {
    // height: '20%',
    alignItems: 'center'
  },
  NumberInput: {
    marginTop: 30,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
    marginHorizontal: 10,
    // paddingHorizontal: 20
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
    color: COLORS.gray,
    height: 40,
    width: width / 1.1,
    justifyContent: "center"
  },
})