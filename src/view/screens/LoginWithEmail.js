import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, ToastAndroid, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import SVGImg1 from '../../assets/arrowleft.svg';
import { TextInput } from 'react-native-paper';
const { height, width } = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginWithEmail = ({ navigation, route }) => {
  const { name, DateOfBirth, Gender, GenderDetial } = route.params;
  const CurrentUser = auth().currentUser.email;

  // const [name, setname] = useState();
  const [email, setemail] = useState(CurrentUser ? CurrentUser : '');
  const [password, setpassword] = useState('');

  const [inputemail, setInputEmail] = useState(false);
  const [inputpassword, setInputPassword] = useState(false);

  console.log(CurrentUser);


  const EMAIL_REGEX = /@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const OnhandleSubmit = async (email) => {
    // console.log(email, password);
    if (email === '' || !email === EMAIL_REGEX.test(email)) {
      Toast.show('That email address is invalid!', Toast.SHORT)
      setInputEmail(true)
    }
    else {
      setInputEmail(false);
      setInputPassword(false);
      RegesterUserWithEamil();
    }
  }

  const RegesterUserWithEamil = async () => {
    navigation.navigate('QuestionTypeofRelationScreen', { email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender, GenderDetial: GenderDetial })
    // console.log('regester here');
    // await auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(() => {
    //     console.log('User account created & signed in!');
    //     Toast.show('Login Successfully!', Toast.SHORT)
    //     navigation.navigate('QuestionPhotoScreen')
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //       Toast.show('That email address is already in use!', Toast.SHORT)
    //     }
    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //       Toast.show('That email address is invalid!', Toast.SHORT)
    //     }

    //     console.error(error);
    //   });
  }


  const onSkippAll = () => {
    if (email === '' || !email === EMAIL_REGEX.test(email)) {
      Toast.show('Invalid email address!', Toast.SHORT)
      setInputEmail(true)
    }
    else {
      navigation.navigate('QuestionClingyScreen', { Cuddling: null, email: email, InLife: null, InBed: null, MovieType: null, NextLongestRelationship: null, LongestRelationship: null, DealBreaker: null, DealMakers: null, PartnerBuildType: null, BuildType: null, EyeColor: null, HairColor: null, PartnerMaxHeightType: null, PartnerMinHeightType: null, PartnerMaxHeight: null, PartnerMinHeight: null, Height: null, languages: null, ExerciseStatus: null, Exercise: null, FavFood: null, Diet: null, ConvertedReligionDetail: null, ConvertedReligion: null, Relagion: null, ParentReligion: null, religionType: null, foodtype: null, KosherType: null, RelationshipType: null, Education: null, CompanyName: null, PositioninCompany: null, CompanyType: null, InstaUsername: null, Drink: null, Drugs: null, Marijauna: null, Vape: null, Smoke: null, Lookingfor: null, PartnerNature: null, IntroandExtro: null, PoliticalPartnerView: null, PoliticalView: null, filterMinAge: null, filterMaxAge: null, Experince: null, InTenYear: null, Bio: null, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: null })
    }
  }


  const GetEmail = async () => {
    let checkToken = await AsyncStorage.getItem('AppleLoginAuth');
    if (checkToken) {
      const parsedToken = JSON.parse(checkToken);

      // Assuming your object structure has a 'name' property
      setemail(parsedToken.email);
    }

  }
  useEffect(() => {
    GetEmail()
  }, [])

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>
          <View style={{
            alignItems: 'center',
            // paddingTop: 10,
            height: 60,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <View style={{
              flex: 1,
            }}>
              <SVGImg1 width={20} height={20} onPress={() => navigation.goBack()} />
            </View>
          </View>

          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black
            }}>What's is your Email?</Text>
          </View>


          <View style={{
            paddingTop: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              color: COLORS.black
            }}>Enter active email address</Text>
          </View>


          <View style={{ marginTop: 40, }}>
            <View style={styles.NumberInput}>
              <TextInput
                value={email}
                error={inputemail}
                underlineColor={COLORS.transparent}
                activeUnderlineColor={COLORS.transparent}
                onFocus={() => setInputEmail(false)}
                placeholder={'Enter email address'}
                height={200}
                keyboardType='default'
                // error={inputfirstName}
                onChangeText={email => setemail(email)
                }
                style={styles.TextInput}
              />
            </View>
            {/* <View style={styles.NumberInput}>
              <TextInput
                value={password}
                error={inputpassword}
                onFocus={() => setInputPassword(false)}
                placeholder={'Enter password'}
                // error={inputfirstName}
                secureTextEntry={true}
                onChangeText={password => setpassword(password)
                }
                style={styles.TextInput}
              />
            </View> */}
          </View>
        </View>


        <View style={styles.footer}>
          <View style={{
            marginBottom: 5,
          }}>
            <CustomeButton onpress={() => OnhandleSubmit(email)}
              title={'Continue'} width={width/1.1} />
          </View>
          {/* <View style={{
            paddingTop: 0,
          }}>
            <CustomeButton onpress={() => onSkippAll()}
              title={'Skip All'} bcolor={COLORS.light} />
          </View> */}

          <View style={{
            paddingTop: 0,
            // width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>
      </View>



    </SafeAreaView>
  )
}

export default LoginWithEmail

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  contentContainer: {
    height: '80%',
    alignItems: 'center',
  },
  footer: {
    height: '20%'
  },
  NumberInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
    // width:'100%'
    // marginHorizontal: 10,
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