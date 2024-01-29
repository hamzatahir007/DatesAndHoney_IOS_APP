import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import SVGImg from '../../../assets/tik.svg';
import SVGImg1 from '../../../assets/arrowleft.svg';
import Toast from 'react-native-simple-toast';
import ProgressBar from '../../components/ProgressBar';
const { width, height } = Dimensions.get("window");


const PoliticalData = [
  {
    id: '1',
    name: 'Conservative',
  },
  {
    id: '2',
    name: 'Liberal',
  },
  {
    id: '3',
    name: 'Libertarians',
  },
  {
    id: '4',
    name: 'Non Political',
  },
  {
    id: '5',
    name: 'Middle of the Road',
  },
]

const SelectionOneQuestionPoliticalviewScreen = ({ navigation, route }) => {
  const [political, setpolitical] = useState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  // console.log(update);



  const onPoliticalPartnerview = () => {
    if (selectedCategoryIndex !== null) {
      console.log(PoliticalData[selectedCategoryIndex].name);
      const selectedPolitics = PoliticalData[selectedCategoryIndex].name;
      const update = {
        ...route.params,
        PoliticalView: selectedPolitics,
        selection1: 1
      }
      navigation.navigate('SelectionOneQuestionPhotoScreen', update)
    }
    else {
      Toast.show("Please select Political view!", Toast.SHORT);
    }
  }

  // const onSkip = () => {
  //   navigation.navigate('QuestionPhotoScreen', { PoliticalView: null, selection1: selection1, Bio: Bio, Kids: Kids, filterMinAge: filterMinAge, filterMaxAge: filterMaxAge, PartnerGender: PartnerGender, Lookingfor: Lookingfor, email: email, name: name, DateOfBirth: DateOfBirth, Gender: Gender, })
  // }

  const ListMusic = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {PoliticalData.map((political, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setValue(index)}>
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              ...styles.NumberInput
            }}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>
                  {political.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end',
              }}>
                {value == index ? (
                  <SVGImg width={20} height={20} />
                ) : (<View></View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

      </View>
    )
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingHorizontal: 20,
              height: 60
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

            <ProgressBar progress={'14.3'} />
            <View style={{
              paddingTop: 0,
              alignItems: 'center'
            }}>
              <Image source={require('../../../assets/vote.png')}
                resizeMode='contain' style={{
                  height: height / 8
                }} />
            </View>


            <View style={{
              alignItems: 'center',
              paddingVertical: 20,
              paddingHorizontal: 70,
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black,
                textAlign: 'center',
              }}>Political Views</Text>
            </View>
            <View style={{
              alignItems: 'center'
            }}>
              <ListMusic data={PoliticalData} value={selectedCategoryIndex}
                setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
            </View>
          </ScrollView>
        </View>


        {/* <ScrollView showsVerticalScrollIndicator={false}> */}

        <View style={styles.footer}>

          <View style={{
            alignItems: 'center',
            paddingBottom: 50
          }}>

            <View>
              <View style={{ marginBottom: 5 }}>
                <CustomeButton onpress={() => onPoliticalPartnerview()}
                  title={'Continue'} />
              </View>
              {/* <View style={{ marginHorizontal: 0 }}>
                  <CustomeButton bcolor={COLORS.light} onpress={() => onSkip()}
                    title={'Skip'} />
                </View> */}
            </View>

            <View style={{
              paddingTop: 5,
            }}>
              <Text style={{ textAlign: 'center', fontSize: 10 ,color:COLORS.gray}}>
                By continue you agree our Terms and Privacy Policy.
              </Text>
            </View>

          </View>
        </View>
      </View>



    </SafeAreaView >
  )
}

export default SelectionOneQuestionPoliticalviewScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: '80%',
    // alignItems: 'center',
    // backgroundColor:COLORS.main
  },
  footer: {
    height: '20%',
    alignItems: 'center'
  },
  NumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: height / 18,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})