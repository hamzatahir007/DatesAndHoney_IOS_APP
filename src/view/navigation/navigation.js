import React, { useState, useEffect } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import LoginWithNumberScreen from '../screens/LoginWithNumberScreen';
import LoginWithOTPScreen from '../screens/LoginWithOTPScreen';
import NameScreen from '../screens/NameScreen';
import DateOfBirthScreen from '../screens/DateOfBirthScreen';
import LoginWithEmail from '../screens/LoginWithEmail';
import NotificationScreen from '../screens/NotificationScreen';
import QuestionGenderScreen from '../screens/QuestionGenderScreen';
import QuestionYourInterestScreen from '../screens/QuestionYourInterestScreen';
import QuestionWantKidsScreen from '../screens/QuestionWantKidsScreen';
import QuestionBioScreen from '../screens/QuestionBioScreen';
import QuestionProfessionallyScreen from '../screens/QuestionProfessionallyScreen';
import QuestionMusicScreen from '../screens/QuestionMusicScreen';
import QuestionPoliticalviewScreen from '../screens/QuestionPoliticalviewScreen';
import QuestionPoliticalPartnerviewScreen from '../screens/QuestionPoliticalPartnerviewScreen';
import QuestionIntroandExtroScreen from '../screens/QuestionIntroandExtroScreen';
import QuestionPIntroandExtroScreen from '../screens/QuestionPIntroandExtroScreen';
import QuestionPhotoScreen from '../screens/QuestionPhotoScreen';
import QuestionTypeofRelationScreen from '../screens/QuestionTypeofRelationScreen';
import QuestionSmokeScreen from '../screens/QuestionSmokeScreen';
import QuestionVapeScreen from '../screens/QuestionVapeScreen';
import QuestionMarijuanaScreen from '../screens/QuestionMarijuanaScreen';
import QuestionDrugsScreen from '../screens/QuestionDrugsScreen';
import QuestionDrinkScreen from '../screens/QuestionDrinkScreen';
import QuestionInstagramScreen from '../screens/QuestionInstagramScreen';
import QuestionOccupationScreen from '../screens/QuestionOccupationScreen';
import QuestionInterestScreen from '../screens/QuestionInterestScreen';
import QuestionEducationScreen from '../screens/QuestionEducationScreen';
import QuestionRelationshipScreen from '../screens/QuestionRelationshipScreen';
import QuestionReligionScreen from '../screens/QuestionReligionScreen';
import QuestionMoreAboutChristianScreen from '../screens/QuestionMoreAboutChristianScreen';
import QuestionMoreAboutJewishScreen from '../screens/QuestionMoreAboutJewishScreen';
import QuestionMoreAboutCatholicScreen from '../screens/QuestionMoreAboutCatholicScreen';
import QuestionMoreAboutMuslimScreen from '../screens/QuestionMoreAboutMuslimScreen';
import QuestionDietScreen from '../screens/QuestionDietScreen';
import QuestionPartnerDietScreen from '../screens/QuestionPartnerDietScreen';
import QuestionFavFoodScreen from '../screens/QuestionFavFoodScreen';
import QuestionExersizeScreen from '../screens/QuestionExersizeScreen';
import QuestionExersizePartnerScreen from '../screens/QuestionExersizePartnerScreen';
import QuestionEthnicityScreen from '../screens/QuestionEthnicityScreen';
import QuestionEthnicityPartnerScreen from '../screens/QuestionEthnicityPartnerScreen';
import QuestionDescribeYouScreen from '../screens/QuestionDescribeYouScreen';
import QuestionDescribePartnerScreen from '../screens/QuestionDescribePartnerScreen';
import QuestionDisabilityScreen from '../screens/QuestionDisabilityScreen';
import QuestionDisabilityPartnerScreen from '../screens/QuestionDisabilityPartnerScreen';
import QuestionHeightScreen from '../screens/QuestionHeightScreen';
import Toast from 'react-native-simple-toast';
import QuestionHeightPartnerScreen from '../screens/QuestionHeightPartnerScreen';
import QuestionBuildTypeScreen from '../screens/QuestionBuildTypeScreen';
import QuestionBuildTypePartnerScreen from '../screens/QuestionBuildTypePartnerScreen';
import QuestionReferenceEmailScreen from '../screens/QuestionReferenceEmailScreen';
import QuestionDealBreakandMakeScreen from '../screens/QuestionDealBreakandMakeScreen';
import QuestionPartnerConditionScreen from '../screens/QuestionPartnerConditionScreen';
import QuestionLongestRelationshipScreen from '../screens/QuestionLongestRelationshipScreen';
import QuestionNextRelationshipTimeScreen from '../screens/QuestionNextRelationshipTimeScreen';
import QuestionMovieTypeScreen from '../screens/QuestionMovieTypeScreen';
import QuestionInBedScreen from '../screens/QuestionInBedScreen';
import QuestionInLifeScreen from '../screens/QuestionInLifeScreen';
import QuestionCuddlingScreen from '../screens/QuestionCuddlingScreen';
import QuestionRelationshipLookingScreen from '../screens/QuestionRelationshipLookingScreen';
import QuestionClingyScreen from '../screens/QuestionClingyScreen';
import QuestionCongratulationScreen from '../screens/QuestionCongratulationScreen';

import { useDispatch, useSelector } from 'react-redux';
import { login, mediatorLogin, packages, selectMediatorUser, selectUser, selectWalletAmount, status } from '../../../redux/reducers/Reducers';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DrawerNavigator from './DrawerNavigator';
import QuestionPartnerAge from '../screens/QuestionPartnerAge';
import QuestionDoyouSmoke from '../screens/QuestionDoyouSmoke';
import QuestionConvertedReligion from '../screens/QuestionConvertedReligion';
import QuestionHairColorScreen from '../screens/QuestionHairColorScreen';
import QuestionEyeColorScreen from '../screens/QuestionEyeColorScreen';
import QuestionLanguageScreen from '../screens/QuestionLanguageScreen';
import QuestionMultipleSubstance from '../screens/QuestionMultipleSubstance';


import SelectionOneQuestionGenderScreen from '../screens/SelectionOne/SelectionOneQuestionGenderScreen.js';
import SelectionOneQuestionMoreAboutCatholicScreen from '../screens/SelectionOne/SelectionOneQuestionMoreAboutCatholicScreen.js';
import SelectionOneQuestionMoreAboutChristianScreen from '../screens/SelectionOne/SelectionOneQuestionMoreAboutChristianScreen.js';
import SelectionOneQuestionMoreAboutJewishScreen from '../screens/SelectionOne/SelectionOneQuestionMoreAboutJewishScreen.js';
import SelectionOneQuestionMoreAboutMuslimScreen from '../screens/SelectionOne/SelectionOneQuestionMoreAboutMuslimScreen.js';
import SelectionOneQuestionMultipleSubstance from '../screens/SelectionOne/SelectionOneQuestionMultipleSubstance.js';
import SelectionOneQuestionPhotoScreen from '../screens/SelectionOne/SelectionOneQuestionPhotoScreen.js';
import SelectionOneQuestionPoliticalviewScreen from '../screens/SelectionOne/SelectionOneQuestionPoliticalviewScreen.js';
import SelectionOneQuestionReligionScreen from '../screens/SelectionOne/SelectionOneQuestionReligionScreen.js';
import SelectionOneQuestionConvertedReligion from '../screens/SelectionOne/SelectionOneQuestionConvertedReligion.js';
import SelectionOneQuestionEthnicityScreen from '../screens/SelectionOne/SelectionOneQuestionEthnicityScreen.js';
import SelectionTwoQuestionBioScreen from '../screens/SelectionTwo/SelectionTwoQuestionBioScreen';
import SelectionTwoQuestionBuildTypeScreen from '../screens/SelectionTwo/SelectionTwoQuestionBuildTypeScreen';
import SelectionTwoQuestionClingyScreen from '../screens/SelectionTwo/SelectionTwoQuestionClingyScreen';
import SelectionTwoQuestionCuddlingScreen from '../screens/SelectionTwo/SelectionTwoQuestionCuddlingScreen';
import SelectionTwoQuestionDietScreen from '../screens/SelectionTwo/SelectionTwoQuestionDietScreen';
import SelectionTwoQuestionEducationScreen from '../screens/SelectionTwo/SelectionTwoQuestionEducationScreen';
import SelectionTwoQuestionExersizeScreen from '../screens/SelectionTwo/SelectionTwoQuestionExersizeScreen';
import SelectionTwoQuestionFavFoodScreen from '../screens/SelectionTwo/SelectionTwoQuestionFavFoodScreen';
import SelectionTwoQuestionHeightScreen from '../screens/SelectionTwo/SelectionTwoQuestionHeightScreen';
import SelectionTwoQuestionLanguageScreen from '../screens/SelectionTwo/SelectionTwoQuestionLanguageScreen';
import SelectionTwoQuestionOccupationScreen from '../screens/SelectionTwo/SelectionTwoQuestionOccupationScreen';
import SelectionTwoQuestionRelationshipScreen from '../screens/SelectionTwo/SelectionTwoQuestionRelationshipScreen';
import SelectionTwoQuestionWantKidsScreen from '../screens/SelectionTwo/SelectionTwoQuestionWantKidsScreen';
import SelectionThreeQuestionDealBreakandMakeScreen from '../screens/SelectionThree/SelectionThreeQuestionDealBreakandMakeScreen';
import SelectionThreeQuestionEyeColorScreen from '../screens/SelectionThree/SelectionThreeQuestionEyeColorScreen';
import SelectionThreeQuestionHairColorScreen from '../screens/SelectionThree/SelectionThreeQuestionHairColorScreen';
import SelectionThreeQuestionInstagramScreen from '../screens/SelectionThree/SelectionThreeQuestionInstagramScreen';
import SelectionThreeQuestionIntroandExtroScreen from '../screens/SelectionThree/SelectionThreeQuestionIntroandExtroScreen';
import SelectionThreeQuestionLongestRelationshipScreen from '../screens/SelectionThree/SelectionThreeQuestionLongestRelationshipScreen';
import SelectionThreeQuestionMovieTypeScreen from '../screens/SelectionThree/SelectionThreeQuestionMovieTypeScreen';
import SelectionThreeQuestionProfessionallyScreen from '../screens/SelectionThree/SelectionThreeQuestionProfessionallyScreen';
import { useCallback } from 'react';



const Stack = createNativeStackNavigator();
// const MediatorUser = useSelector(selectMediatorUser);

const MyStack = () => {
    const [initializing, setInitializing] = useState(true);
    const [regester, setRegester] = useState();
    const [allAffiliateCode, setAllAffiliateCode] = useState(null);

    const dispatch = useDispatch();
    const regesterUser = useSelector(selectUser);
    const walletAmount = useSelector(selectWalletAmount);
    // const MediatorUser = useSelector(selectMediatorUser);
    // console.log('==>', MediatorUser);
    const [userExist, setUserExit] = useState()
    const [userData, setUserData] = useState()
    const [memberships, setMemberships] = useState();
    const [membershipUid, setMembershipUid] = useState();
    const [LoginMediatorAccess, setLoginMediatorAccess] = useState();
    // const focus = useIsFocused()
    // const user = useSelector(selectUser);

    const GetAllAffiliateCode = async () => {
        const firestoreIp = await firestore().collection('AffiliateCode')
        firestoreIp.onSnapshot(querSnapshot => {
            const data = []
            querSnapshot.forEach((documentSnapShot) => {
                data.push(documentSnapShot.data().VipCode)
            });
            setAllAffiliateCode(data)
        })
    }

    const SelectionOne = () => {
        // console.log('here im');
        // return
        return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {/* <Stack.Screen name="SelectionOneQuestionGenderScreen" component={SelectionOneQuestionGenderScreen} /> */}
                <Stack.Screen name="SelectionOneQuestionPoliticalviewScreen" component={SelectionOneQuestionPoliticalviewScreen} />
                <Stack.Screen name="SelectionOneQuestionPhotoScreen" component={SelectionOneQuestionPhotoScreen} />
                <Stack.Screen name="SelectionOneQuestionReligionScreen" component={SelectionOneQuestionReligionScreen} />
                <Stack.Screen name="SelectionOneQuestionMoreAboutCatholicScreen" component={SelectionOneQuestionMoreAboutCatholicScreen} />
                <Stack.Screen name="SelectionOneQuestionMoreAboutChristianScreen" component={SelectionOneQuestionMoreAboutChristianScreen} />
                <Stack.Screen name="SelectionOneQuestionMoreAboutJewishScreen" component={SelectionOneQuestionMoreAboutJewishScreen} />
                <Stack.Screen name="SelectionOneQuestionMoreAboutMuslimScreen" component={SelectionOneQuestionMoreAboutMuslimScreen} />
                <Stack.Screen name="SelectionOneQuestionConvertedReligion" component={SelectionOneQuestionConvertedReligion} />
                <Stack.Screen name="SelectionOneQuestionEthnicityScreen" component={SelectionOneQuestionEthnicityScreen} />
                <Stack.Screen name="SelectionOneQuestionMultipleSubstance" component={SelectionOneQuestionMultipleSubstance} />
            </Stack.Navigator>
        )
    }

    const SelectionTwo = () => {
        // console.log('here im');
        // return
        return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="SelectionTwoQuestionRelationshipScreen" component={SelectionTwoQuestionRelationshipScreen} />
                <Stack.Screen name="SelectionTwoQuestionWantKidsScreen" component={SelectionTwoQuestionWantKidsScreen} />
                <Stack.Screen name="SelectionTwoQuestionBioScreen" component={SelectionTwoQuestionBioScreen} />
                <Stack.Screen name="SelectionTwoQuestionEducationScreen" component={SelectionTwoQuestionEducationScreen} />
                <Stack.Screen name="SelectionTwoQuestionOccupationScreen" component={SelectionTwoQuestionOccupationScreen} />
                <Stack.Screen name="SelectionTwoQuestionDietScreen" component={SelectionTwoQuestionDietScreen} />
                <Stack.Screen name="SelectionTwoQuestionFavFoodScreen" component={SelectionTwoQuestionFavFoodScreen} />
                <Stack.Screen name="SelectionTwoQuestionExersizeScreen" component={SelectionTwoQuestionExersizeScreen} />
                <Stack.Screen name="SelectionTwoQuestionCuddlingScreen" component={SelectionTwoQuestionCuddlingScreen} />
                <Stack.Screen name="SelectionTwoQuestionClingyScreen" component={SelectionTwoQuestionClingyScreen} />
                <Stack.Screen name="SelectionTwoQuestionHeightScreen" component={SelectionTwoQuestionHeightScreen} />
                <Stack.Screen name="SelectionTwoQuestionBuildTypeScreen" component={SelectionTwoQuestionBuildTypeScreen} />
                <Stack.Screen name="SelectionTwoQuestionLanguageScreen" component={SelectionTwoQuestionLanguageScreen} />
                {/* <Stack.Screen name="SelectionTwoQuestionOccupationScreen" component={SelectionTwoQuestionOccupationScreen} /> */}
            </Stack.Navigator>
        )
    }


    const SelectionThree = () => {
        // console.log('here im');
        // return
        return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="SelectionThreeQuestionInstagramScreen" component={SelectionThreeQuestionInstagramScreen} />
                <Stack.Screen name="SelectionThreeQuestionDealBreakandMakeScreen" component={SelectionThreeQuestionDealBreakandMakeScreen} />
                <Stack.Screen name="SelectionThreeQuestionIntroandExtroScreen" component={SelectionThreeQuestionIntroandExtroScreen} />
                <Stack.Screen name="SelectionThreeQuestionProfessionallyScreen" component={SelectionThreeQuestionProfessionallyScreen} />
                <Stack.Screen name="SelectionThreeQuestionLongestRelationshipScreen" component={SelectionThreeQuestionLongestRelationshipScreen} />
                <Stack.Screen name="SelectionThreeQuestionMovieTypeScreen" component={SelectionThreeQuestionMovieTypeScreen} />
                <Stack.Screen name="SelectionThreeQuestionHairColorScreen" component={SelectionThreeQuestionHairColorScreen} />
                <Stack.Screen name="SelectionThreeQuestionEyeColorScreen" component={SelectionThreeQuestionEyeColorScreen} />
            </Stack.Navigator>
        )
    }


    async function onAuthStateChanged(user) {
        // console.log('user: ', user);
        if (user) {
            // await updateFlakeInsurance(user?.uid)
            // await updateConciergeService(user?.uid)
            firestore().collection('Users')
                .doc(user.uid)
                .onSnapshot(async documentSnapshot => {
                    console.log(documentSnapshot.exists);
                    if (documentSnapshot.exists) {
                        const data = documentSnapshot.data().userDetails
                        if (data.Category == 'Mediator') {
                            console.log(user.uid);
                            // dispatch(mediatorLogin(documentSnapshot.data()))
                            // MediatorUserLogin(user.uid);
                        }
                        else {
                            // await updateMembershipStatus(data)

                            dispatchLoginUser(data)
                        }
                        // console.log(data.Category);
                        setUserExit('found')
                    }
                    else {
                        dispatch(login(null))
                        // dispatch(mediatorLogin(null))
                        console.log('user not exit');
                    }
                });
        }
        else {
            // dispatch(login(null))
            console.log('user not found');
        }
        if (initializing) setInitializing(false);
    }




    const dispatchLoginUser = (data) => {
        if (data) {
            if (data?.PackageId) {
                const Packageids = data?.PackageId;
                firestore().collection('Package')
                    .doc(Packageids)
                    .onSnapshot(documentSnapshot => {
                        if (documentSnapshot.exists) {
                            const data = documentSnapshot.data()
                            dispatchMemberships(data)
                        }
                    });
            }
            else {
                dispatch(packages(null))
            }
            // console.log('yesssssssssssss',data.MembershipDetails);
            dispatch(login(data))
            setRegester(regesterUser)
        }
        else {
            dispatch(login(null))
        }
    }

    const dispatchMemberships = (data) => {
        var Data = new Object();
        Data.discountPercentage = data.discountPercentage;
        Data.discountPrice = data.discountPrice;
        Data.id = data.id;
        Data.name = data.name;
        Data.numberOfCards = data.numberOfCards;
        Data.numberOfChats = data.numberOfChats;
        Data.otherCategory = data.otherCategory;
        Data.rate = data.rate;
        Data.status = data.status;
        Data.description = data.description;
        // console.log(Data);
        dispatch(packages(Data))
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        GetAllAffiliateCode()
    }, [])


    if (initializing) return null;



    if (!regesterUser) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="LoginWithNumberScreen" component={LoginWithNumberScreen} />
                    <Stack.Screen name="LoginWithOTPScreen" component={LoginWithOTPScreen} />
                    <Stack.Screen name="NameScreen" component={NameScreen} />
                    <Stack.Screen name="DateOfBirthScreen" component={DateOfBirthScreen} />
                    <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} />
                    <Stack.Screen name="QuestionGenderScreen" component={QuestionGenderScreen} />
                    <Stack.Screen name="QuestionTypeofRelationScreen" component={QuestionTypeofRelationScreen} />


                    {/* section1 */}
                    <Stack.Screen name="QuestionPoliticalviewScreen" component={QuestionPoliticalviewScreen} />
                    <Stack.Screen name="QuestionPhotoScreen" component={QuestionPhotoScreen} />
                    <Stack.Screen name="QuestionReligionScreen" component={QuestionReligionScreen} />
                    <Stack.Screen name="QuestionMoreAboutChristianScreen" component={QuestionMoreAboutChristianScreen} />
                    <Stack.Screen name="QuestionMoreAboutJewishScreen" component={QuestionMoreAboutJewishScreen} />
                    <Stack.Screen name="QuestionMoreAboutCatholicScreen" component={QuestionMoreAboutCatholicScreen} />
                    <Stack.Screen name="QuestionMoreAboutMuslimScreen" component={QuestionMoreAboutMuslimScreen} />
                    <Stack.Screen name="QuestionConvertedReligion" component={QuestionConvertedReligion} />
                    <Stack.Screen name="QuestionEthnicityScreen" component={QuestionEthnicityScreen} />
                    <Stack.Screen name="QuestionMultipleSubstance" component={QuestionMultipleSubstance} />



                    {/* section2 */}
                    <Stack.Screen name="QuestionRelationshipScreen" component={QuestionRelationshipScreen} />
                    <Stack.Screen name="QuestionWantKidsScreen" component={QuestionWantKidsScreen} />
                    <Stack.Screen name="QuestionBioScreen" component={QuestionBioScreen} />
                    <Stack.Screen name="QuestionEducationScreen" component={QuestionEducationScreen} />
                    <Stack.Screen name="QuestionOccupationScreen" component={QuestionOccupationScreen} />
                    <Stack.Screen name="QuestionDietScreen" component={QuestionDietScreen} />
                    <Stack.Screen name="QuestionFavFoodScreen" component={QuestionFavFoodScreen} />
                    <Stack.Screen name="QuestionExersizeScreen" component={QuestionExersizeScreen} />
                    <Stack.Screen name="QuestionCuddlingScreen" component={QuestionCuddlingScreen} />
                    <Stack.Screen name="QuestionClingyScreen" component={QuestionClingyScreen} />
                    <Stack.Screen name="QuestionHeightScreen" component={QuestionHeightScreen} />
                    <Stack.Screen name="QuestionBuildTypeScreen" component={QuestionBuildTypeScreen} />
                    <Stack.Screen name="QuestionLanguageScreen" component={QuestionLanguageScreen} />



                    {/* section3 */}
                    <Stack.Screen name="QuestionInstagramScreen" component={QuestionInstagramScreen} />
                    <Stack.Screen name="QuestionDealBreakandMakeScreen" component={QuestionDealBreakandMakeScreen} />
                    <Stack.Screen name="QuestionIntroandExtroScreen" component={QuestionIntroandExtroScreen} />
                    <Stack.Screen name="QuestionProfessionallyScreen" component={QuestionProfessionallyScreen} />
                    <Stack.Screen name="QuestionLongestRelationshipScreen" component={QuestionLongestRelationshipScreen} />
                    <Stack.Screen name="QuestionMovieTypeScreen" component={QuestionMovieTypeScreen} />
                    <Stack.Screen name="QuestionHairColorScreen" component={QuestionHairColorScreen} />
                    <Stack.Screen name="QuestionEyeColorScreen" component={QuestionEyeColorScreen} />


                    {/* section 4 */}
                    <Stack.Screen name="QuestionYourInterestScreen" component={QuestionYourInterestScreen} />
                    <Stack.Screen name="QuestionPartnerAge" component={QuestionPartnerAge} />
                    <Stack.Screen name="QuestionInterestScreen" component={QuestionInterestScreen} />
                    <Stack.Screen name="QuestionHeightPartnerScreen" component={QuestionHeightPartnerScreen} />
                    <Stack.Screen name="QuestionBuildTypePartnerScreen" component={QuestionBuildTypePartnerScreen} />
                    <Stack.Screen name="QuestionEthnicityPartnerScreen" component={QuestionEthnicityPartnerScreen} />
                    <Stack.Screen name="QuestionMusicScreen" component={QuestionMusicScreen} />
                    <Stack.Screen name="QuestionPoliticalPartnerviewScreen" component={QuestionPoliticalPartnerviewScreen} />
                    <Stack.Screen name="QuestionPIntroandExtroScreen" component={QuestionPIntroandExtroScreen} />
                    <Stack.Screen name="QuestionSmokeScreen" component={QuestionSmokeScreen} />
                    <Stack.Screen name="QuestionVapeScreen" component={QuestionVapeScreen} />
                    <Stack.Screen name="QuestionMarijuanaScreen" component={QuestionMarijuanaScreen} />
                    <Stack.Screen name="QuestionDrugsScreen" component={QuestionDrugsScreen} />
                    <Stack.Screen name="QuestionDrinkScreen" component={QuestionDrinkScreen} />
                    <Stack.Screen name="QuestionPartnerDietScreen" component={QuestionPartnerDietScreen} />
                    <Stack.Screen name="QuestionExersizePartnerScreen" component={QuestionExersizePartnerScreen} />
                    <Stack.Screen name="QuestionDescribeYouScreen" component={QuestionDescribeYouScreen} />
                    <Stack.Screen name="QuestionDescribePartnerScreen" component={QuestionDescribePartnerScreen} />
                    <Stack.Screen name="QuestionDisabilityScreen" component={QuestionDisabilityScreen} />
                    <Stack.Screen name="QuestionDisabilityPartnerScreen" component={QuestionDisabilityPartnerScreen} />
                    <Stack.Screen name="QuestionReferenceEmailScreen" component={QuestionReferenceEmailScreen} />
                    <Stack.Screen name="QuestionPartnerConditionScreen" component={QuestionPartnerConditionScreen} />
                    <Stack.Screen name="QuestionNextRelationshipTimeScreen" component={QuestionNextRelationshipTimeScreen} />
                    <Stack.Screen name="QuestionInBedScreen" component={QuestionInBedScreen} />
                    <Stack.Screen name="QuestionInLifeScreen" component={QuestionInLifeScreen} />
                    <Stack.Screen name="QuestionRelationshipLookingScreen" component={QuestionRelationshipLookingScreen} />
                    <Stack.Screen name="QuestionDoyouSmoke" component={QuestionDoyouSmoke} />
                    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                    <Stack.Screen name="QuestionCongratulationScreen" component={QuestionCongratulationScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
    if(regesterUser){
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
                    <Stack.Screen name="SelectionOne" component={SelectionOne} />
                    <Stack.Screen name="SelectionTwo" component={SelectionTwo} />
                    <Stack.Screen name="SelectionThree" component={SelectionThree} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
};
export default MyStack