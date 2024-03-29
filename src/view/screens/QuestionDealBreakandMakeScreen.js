import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, ToastAndroid, ScrollView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../consts/Colors'
import CustomeButton from '../components/CustomeButton';
import SVGImg1 from '../../assets/arrowleft.svg';
import ProgressBar from '../components/ProgressBar';
import Toast from 'react-native-simple-toast';



const QuestionDealBreakandMakeScreen = ({ navigation, route }) => {
  const { InstaUsername, languages, PartnerEthnicity, Ethnicity, PartnerBuildType, BuildType, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height, EyeColor, HairColor, Interest, CompanyName, PositioninCompany, CompanyType, Clingy, Cuddling, ExerciseStatus, FavFood, Diet, Relagion, ParentReligion, religionType, KosherType, foodtype, RelationshipType, Education, Smoke, Vape, Marijauna, Drugs, Drink, image1, image2, image3, image4, image5, PoliticalView, Bio, Kids, filterMinAge, filterMaxAge, PartnerGender, Lookingfor, email, name, DateOfBirth, Gender } = route.params;
  const [dealBreaker, setdealBreaker] = useState(null);
  const [dealMaker, setdealMaker] = useState(null);

  // console.log(email,  PartnerBuildType, BuildType, EyeColor, HairColor, PartnerMaxHeightType, PartnerMinHeightType, PartnerMaxHeight, PartnerMinHeight, Height,  languages, ExerciseStatus, Exercise, FavFood, Diet, ConvertedReligionDetail, ConvertedReligion, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, CompanyName, PositioninCompany, CompanyType, Lookingfor, PartnerNature, IntroandExtro, PoliticalPartnerView, PoliticalView, filterMinAge, filterMaxAge, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, InTenYear, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername );

  const onPartnerConditionScreen = () => {
    if (!dealBreaker || !dealMaker) {
      if (!dealBreaker) {
        Toast.show("Please enter major deal breakers!", Toast.SHORT);
      }
      else if (!dealMaker) {
        Toast.show("Please enter major deal makers!", Toast.SHORT);
      }
    }
    else {
      const data = {
        ...route?.params,
        DealBreaker: dealBreaker,
        DealMakers: dealMaker,
        selection3: route?.params?.selection3 + 1,
      }
      navigation.navigate('QuestionIntroandExtroScreen', data)
      // console.log(dealBreaker, dealMaker);
      // navigation.navigate('QuestionIntroandExtroScreen', { DealBreaker: dealBreaker, DealMakers: dealMaker, InstaUsername: InstaUsername, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
    }
  }


  const onSkipScreen = () => {
    console.log('Skip Screen');
    navigation.navigate('QuestionIntroandExtroScreen', { DealBreaker: null, DealMakers: null, InstaUsername: InstaUsername, languages: languages, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeightType: PartnerMaxHeightType, PartnerMinHeightType: PartnerMinHeightType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, EyeColor: EyeColor, HairColor: HairColor, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, Clingy: Clingy, Cuddling: Cuddling, ExerciseStatus: ExerciseStatus, FavFood: FavFood, Diet: Diet, Relagion: Relagion, ParentReligion: ParentReligion, religionType: religionType, KosherType: KosherType, foodtype: foodtype, RelationshipType: RelationshipType, Education: Education, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, PoliticalView: PoliticalView, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender })
  }



  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>



        <View style={styles.contentContainer}>

          <View style={{
            alignItems: 'center',
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
            <View style={{
              flex: 3,
              flexDirection: "row",
              alignItems: 'center',
              justifyContent:'center'
            }}>
              <Image source={require('../../assets/notify.png')} resizeMode='contain'
                style={{
                  width: 15,
                  height: 15,
                }} />
              <Text style={{
                color: COLORS.black,
                marginLeft: 5
              }}>Response is Not Public</Text>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'flex-end'
            }}>
            </View>
          </View>
          <ProgressBar progress={'25'} />

          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{
              alignItems: 'center'
            }}>
              <View style={{
                paddingTop: 20,
                alignItems: 'center'
              }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.black
                }}>Major deal Breakers</Text>
              </View>

              <View style={{
                paddingTop: 20,
              }}>
                <TextInput
                  placeholder='Type Here!'
                  placeholderTextColor={COLORS.gray}
                  multiline
                  value={dealBreaker}
                  onChangeText={dealBreaker => setdealBreaker(dealBreaker)}
                  numberOfLines={8}
                  style={styles.TextInput} />
              </View>
            </View>


            <View style={{
              alignItems: 'center'
            }}>
              <View style={{
                paddingTop: 20,
                alignItems: 'center'
              }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.black
                }}>Major deal Makers</Text>
              </View>

              <View style={{
                paddingTop: 20,
              }}>
                <TextInput
                  placeholder='Type Here!'
                  multiline
                  numberOfLines={8}
                  value={dealMaker}placeholderTextColor={COLORS.gray}
                  onChangeText={dealMaker => setdealMaker(dealMaker)}
                  style={styles.TextInput} />
              </View>

            </View>




            <View style={{ paddingTop: 80 , alignSelf:'center'}}>

              <View style={{
                // flexDirection: 'row'
                paddingBottom: 40
              }}>
                <View style={{ marginBottom: 5 }}>
                  <CustomeButton onpress={() => onPartnerConditionScreen()}
                    title={'Continue'} />
                </View>
                {/* <View style={{ marginHorizontal: 0 }}>
                  <CustomeButton onpress={() => onSkipScreen()}
                    title={'Skip'} bcolor={COLORS.light} />
                </View> */}
                <View style={{
                  paddingTop: 5,
                }}>
                  <Text style={{ textAlign: 'center', fontSize: 10,color:COLORS.black, }}>
                    By continue you agree our Terms and Privacy Policy.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

      </View>



    </SafeAreaView>
  )
}

export default QuestionDealBreakandMakeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: '100%'

  },
  contentContainer: {
    // alignItems: 'center',
    justifyContent: 'center',
  },
  NumberInput: {
    marginTop: 60,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20
  },
  TextInput: {
    padding: 10,
    backgroundColor: COLORS.light,
    color: COLORS.black,
    width: 320,
    borderRadius: 10,
    height: 200,
    textAlignVertical: 'top',
  },
})