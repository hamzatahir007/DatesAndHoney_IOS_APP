import { Alert, Dimensions, FlatList, SafeAreaView, Platform,ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { useState } from 'react';
import COLORS from '../../consts/Colors';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Buypackages, selectPaymentCards, selectUser } from '../../../redux/reducers/Reducers';
import CustomeButton from '../components/CustomeButton';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import RNRestart from 'react-native-restart';
import { ActivityIndicator } from 'react-native-paper';

const { width, height } = Dimensions.get("window");


const Slide = ({ item }) => {
    return (
        <View style={{
            alignSelf: 'center',
            alignItems: 'center',
            height: height * 0.40,
            width: width,
            marginTop: '10%',
            backgroundColor: COLORS.white
        }}>
            <View style={{
                backgroundColor: COLORS.white,
                // alignItems: 'center',
                ...Platform.select({
                    ios: {
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                    },
                    android: {
                        elevation: 20,
                    },
                }), 
                marginVertical: 10,
                alignContent: 'center',
                borderRadius: 80,
                height: height / 9,
                width: width / 4.5,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image source={{ uri: item?.image }}
                    style={{ height: 50, width: 50, resizeMode: 'contain' }}
                />
            </View>
            <Text style={styles.title}>
                {item.name}
            </Text>
            <Text style={styles.subtitle}>
                {item.Details}
            </Text>
        </View>
    )
}

const PremiumMembershipDetailScreen = ({ navigation, route }) => {
    const { data } = route?.params;
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [selectMemberships, setSelectMemberships] = useState(null);
    const [loading, setLoading] = useState(false);
    const PaymentCards = useSelector(selectPaymentCards)
    const ref = React.useRef(null);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    // console.log(data?.id, user?.PackageId);

    const ByMemeberShips = () => {
        var Data = new Object();
        Data.discountPercentage = data.discountPercentage;
        Data.WithoutdiscountPrice = data.discountPrice;
        Data.id = data.id;
        Data.name = data.name;
        Data.numberOfCards = data.numberOfCards;
        Data.numberOfChats = data.numberOfChats;
        Data.otherCategory = data.otherCategory;
        Data.rate = data.rate;
        Data.status = data.status;
        Data.Prices = selectMemberships;

        // console.log('test data: ', Data);
        // return;
        // dispatch(Buypackages(Data))
        if (PaymentCards?.length > 0) {
            navigation.navigate('CheckoutScreenMembership', {
                data: Data
            })
        }
        else {
            navigation.navigate('PaymentOptionScreen')
        }
        // navigation.replace('PaymentOptionScreen')
    }

    const onSelectMembership = (item) => {
        setSelectMemberships(item)
        // console.log(item);
    }
    const CancleMembership = async () => {
        setLoading(true)
        try {
            const userRef = await firestore().collection('Users')
                .doc(user.uid)
            userRef.update({
                'userDetails.AccountType': null,
                'userDetails.PackageId': null,
                'userDetails.MembershipDetails': null,
                // 'userDetails.FlakeTime': FlakeBill?.FlakeTime
            }).then(() => {
                Toast.show(`Membership cancle successfully`, Toast.LONG);
                setLoading(false)
                RNRestart.Restart()
                // navigation.goBack()
            })
        } catch (e) {
            setLoading(false)
            Toast.show(`Error: ${e}`, Toast.LONG);
        }
    }
    const Footer = () => {
        return (
            <View style={{
                paddingHorizontal: 20,
                justifyContent: 'space-between',
                // height: height * 0.60,
                backgroundColor: COLORS.white

            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                }}>
                    {data?.Service1.map((_, index) => (
                        <View key={index} style={[styles.indicator,
                        currentSlideIndex == index && {
                            backgroundColor: COLORS.main,
                            width: 25,
                        },
                        ]} />
                    ))
                    }
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: "space-between",
                        width: '100%',
                        paddingHorizontal: 10,
                    }}>
                        {data?.Prices.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    marginTop: 20,
                                    // width: width / 2.5,
                                    marginHorizontal: 5,
                                    opacity: user?.MembershipDetails?.id == item?.id && data?.id == user?.PackageId ? 0.7 : 1,
                                    // backgroundColor:COLORS.gray
                                }}>
                                <View style={{
                                    // bottom:-5,
                                    // width: '60%',
                                    backgroundColor: COLORS.main,
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    padding: 5,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                }}>
                                    {item?.limits == 'unlimited' ?
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 12
                                        }}>Limited time offer</Text>
                                        :
                                        <Text style={{
                                            color: COLORS.black,
                                            fontSize: 12,
                                        }}>On Sale</Text>
                                    }
                                </View>
                                <TouchableOpacity
                                    onPress={() => user?.MembershipDetails?.id == item?.id && data?.id == user?.PackageId ? null : onSelectMembership(item)}
                                    style={{
                                        top: -8,
                                        borderWidth: 1,
                                        // elevation: 5,
                                        borderColor: user?.MembershipDetails?.id == item?.id && data?.id == user?.PackageId ? COLORS.transparent : COLORS.main,
                                        width: item?.limits == 'unlimited' ? width / 1.5 : width / 2.5,
                                        paddingHorizontal: 30,
                                        // paddingHorizontal:100,
                                        backgroundColor: COLORS.transparent,
                                        height: height / 5,
                                        // paddingVertical:20,
                                        borderRadius: 20,
                                        // paddingHorizontal: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    {item?.limits == 'unlimited' ?
                                        <View style={{
                                            // width:'70%'
                                        }}>
                                            <View>
                                                <Text style={{
                                                    // width:'50%',
                                                    color: COLORS.black,
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                    textAlign: 'center'
                                                }}>{item?.rate} for life time</Text>
                                            </View>
                                            <View >
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: COLORS.gray,
                                                    textAlign: 'center',
                                                    // width:'50%'
                                                }}>
                                                    Auto entered into Diamond + club
                                                </Text>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: COLORS.gray,
                                                    textAlign: 'center',
                                                    // width:'50%'
                                                }}>
                                                    Note: Concierge service is free for 2 year, after it will cost $20/ month
                                                </Text>
                                            </View>
                                        </View>
                                        :
                                        <View>
                                            <View>
                                                <Text style={{
                                                    color: COLORS.gray,
                                                    fontSize: 12,
                                                    textDecorationLine: 'line-through',
                                                    textDecorationStyle: 'solid',
                                                    textAlign: 'center'
                                                }}>${item?.discountedRate}</Text>
                                            </View>
                                            <View>
                                                <Text style={{
                                                    color: COLORS.black,
                                                    fontSize: 20,
                                                    fontWeight: 'bold',
                                                    textAlign: 'center'
                                                }}>${item?.rate}</Text>
                                            </View>
                                            <View>
                                                {item?.limits == '1 month' &&
                                                    <Text style={{
                                                        color: COLORS.gray,
                                                        fontSize: 16,
                                                        textAlign: 'center'
                                                    }}>One Month</Text>
                                                }
                                                {item?.limits == '1 year' &&
                                                    <Text style={{
                                                        color: COLORS.gray,
                                                        fontSize: 16,
                                                        textAlign: 'center'
                                                    }}>One Year</Text>
                                                }
                                            </View>
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {selectMemberships &&
                    <TouchableOpacity
                        onPress={() => ByMemeberShips()}
                        style={{
                            backgroundColor: COLORS.main,
                            width: width / 1.1,
                            height: 50,
                            borderRadius: 10,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            ...Platform.select({
                                ios: {
                                    shadowColor: 'black',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 3,
                                },
                                android: {
                                    elevation: 20,
                                },
                            }), 
                            borderColor: COLORS.transparent,
                        }}>
                        <Text style={{
                            color: COLORS.black,
                            fontSize: 16,
                        }}>${selectMemberships.rate} Buy Now</Text>
                    </TouchableOpacity>
                }

                {!selectMemberships && user?.PackageId &&
                    <View style={{
                        alignSelf: 'center',
                        marginTop: 20
                    }}>
                        <CustomeButton title={loading ? <ActivityIndicator color={COLORS.white} size={'small'} animating={loading} /> : `Cancle ${user?.AccountType} Membership`} bcolor={'red'} color={COLORS.white} onpress={() => Alert.alert(
                            'Cancel Membership',
                            'Are you sure you want to cancel your membership?',
                            [
                                {
                                    text: 'No, Keep Membership',
                                    style: 'cancel',
                                },
                                {
                                    text: 'Yes, Cancel',
                                    onPress: () => CancleMembership(),
                                },
                            ],
                            { cancelable: false }
                        )} />
                    </View>
                }
            </View>
        )
    }


    const UpdateCurrentSlidesIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        // console.log(contentOffsetX)
        const currentIndex = Math.round(contentOffsetX / width);
        // console.log(currentIndex)
        setCurrentSlideIndex(currentIndex)
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={{
                backgroundColor: COLORS.white,
                // flex: 1,
                // justifyContent: "center"
                // marginVertical:20
            }}>
                <View style={{
                    width: width / 1.1,
                    alignSelf: 'center',
                    // backgroundColor:COLORS.main,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // heightL: 70,
                    paddingVertical: 10,
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            flex: 1,
                        }}>
                        <Image source={require('../../assets/close.png')} resizeMode='contain' style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.black
                        }} />
                    </TouchableOpacity>
                    <View style={{
                        flex: 4,
                        // backgroundColor:COLORS.black,
                        alignItems: 'center',
                    }}>
                        {data?.id == 123 &&
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Silver Level</Text>
                        }
                        {data?.id == 456 &&
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Gold Level</Text>
                        }
                        {data?.id == 654 &&
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: COLORS.black
                            }}>Diamond Level</Text>
                        }
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                    </View>
                </View>
                <FlatList
                    ref={ref}
                    onMomentumScrollEnd={UpdateCurrentSlidesIndex}
                    pagingEnabled
                    data={data?.Service1}
                    contentContainerStyle={{ height: height * 0.45 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Slide item={item} />} />
                <Footer />
            </View>
        </SafeAreaView>

    )
}


export default PremiumMembershipDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        fontSize: 16,
        marginTop: 20,
        color: COLORS.black,
        fontWeight: 'bold',
        textAlign: 'center',
        maxWidth: '50%',
        fontFamily: 'Poppins',
    },
    subtitle: {
        color: COLORS.gray,
        fontSize: 12,
        marginTop: 10,
        maxWidth: '50%',
        textAlign: 'center',
        fontFamily: 'Roboto',
        lineHeight: 23,
    },
    indicator: {
        height: 2.5,
        width: 10,
        backgroundColor: COLORS.light,
        marginHorizontal: 3,
        borderRadius: 2,
    },
    // btn: {
    //     flex: 1,
    //     height: 50,
    //     borderRadius: 4,
    //     borderWidth: 1,
    //     borderColor: COLORS.main,
    //     backgroundColor: COLORS.transparent,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // btn2: {
    //     flex: 1,
    //     height: 50,
    //     borderRadius: 4,
    //     borderWidth: 1,
    //     borderColor: COLORS.main,
    //     backgroundColor: COLORS.main,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // }
})