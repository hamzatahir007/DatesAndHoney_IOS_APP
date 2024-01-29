import { Alert, Dimensions, Image, Modal, SafeAreaView, Platform,ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import { useState } from 'react';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import SVGRocket from '../../assets/ROCKET.svg';
import SVGProfile from '../../assets/PROFILEoptimization.svg';
import SVGDownload from '../../assets/BOOK.svg';
import SVGFlake from '../../assets/FLAKE.svg';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AdditionalPackages, BuyAdditionalPackages, Buypackages, selectPaymentCards, selectUser } from '../../../redux/reducers/Reducers';
import SVGdiamond from '../../assets/diamond.svg';
import SVGCircle from '../../assets/circletwo.svg';
import SVGLikes from '../../assets/liketwo.svg';
import SVGHeart from '../../assets/match.svg';
const { width, height } = Dimensions.get('window');


const Silver = [
  {
    id: 1,
    name: 'religion sub filters',
    image: <SVGCircle width={20} height={20} />
  },
  {
    id: 1,
    name: '15 likes Per Day',
    image: <SVGLikes width={20} height={20} />
  },
  {
    id: 1,
    name: '10 Max Matches',
    image: <SVGHeart width={20} height={20} />
  },
]

const Gold = [
  {
    id: 1,
    name: 'unlock all filters',
    image: <SVGCircle width={20} height={20} />
  },
  {
    id: 1,
    name: '40 likes Per Day',
    image: <SVGLikes width={20} height={20} />
  },
  {
    id: 1,
    name: '10 Max Matches',
    image: <SVGHeart width={20} height={20} />
  },
]

const Diamond = [
  {
    id: 1,
    name: 'Everything on gold & gold+ membership',
    image: <SVGdiamond width={20} height={20} />
  },
  {
    id: 1,
    name: 'Unlock Suggested Matches',
    image: <SVGdiamond width={20} height={20} />
  },
  {
    id: 1,
    name: 'Match with Diamond & Diamond +',
    image: <SVGdiamond width={20} height={20} />
  },
  {
    id: 1,
    name: 'Unlimited Likes',
    image: <SVGdiamond width={20} height={20} />
  },
  {
    id: 1,
    name: 'Get suggested matches by concierges team & AI matches (Both)',
    image: <SVGdiamond width={20} height={20} />
  },
  {
    id: 1,
    name: 'Max 10 matches',
    image: <SVGdiamond width={20} height={20} />
  },
]




const PremiumMembershipScreen = ({ navigation }) => {
  const [memberships, setMemberships] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [membershipUid, setMembershipUid] = useState();
  const [additionalPackage, setAdditionalPackage] = useState(null);
  const [additionalPackageUid, setAdditionalPackageUid] = useState(null);
  const PaymentCards = useSelector(selectPaymentCards)
  const [showSuccessPoppup, setShowSuccessPoppup] = useState({
    Status: false,
    Title: null,
    Detail: null
  });
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  // console.log(user?.FlakeInsurance);
  const fetchMemberships = async () => {
    setUploading(true)
    try {
      // console.log('hello');
      await firestore()
        .collection('Package')
        .get()
        .then(querySnapshot => {
          // console.log('Total user: ', querySnapshot.size);
          const membership = [];
          const additional = [];
          const additionalId = [];
          const membershipsuid = [];
          querySnapshot.forEach((documentSnapshot) => {
            // console.log('memberships ID: ', documentSnapshot.id, documentSnapshot.data());
            if (documentSnapshot.data().id != 789) {
              // console.log(documentSnapshot.data().id);
              membership.push(documentSnapshot.data());
              membershipsuid.push(documentSnapshot.id);
            }
            else {
              // console.log(documentSnapshot.data());
              // additional.push(documentSnapshot.data());
              // additionalId.push(documentSnapshot.id);
              const filteredArray = documentSnapshot.data()?.AdditionalPackages.filter(item => item.enable === true);

              setAdditionalPackage(filteredArray)
              setAdditionalPackageUid(documentSnapshot.id)
            }
          });
          if (membership?.length > 0) {
            const findData = membership.findIndex((item) => item.id === user.PackageId);
            const Updated = {
              ...membership[findData],
              MemebershipBuy: true
            }
            membership[findData] = Updated
            console.log(membership);
            setMemberships(membership)
            setMembershipUid(membershipsuid)
          }

          setUploading(false)
        })
      // console.log('membershipData: ', memberships);
    } catch (e) {
      console.log(e);
      setUploading(false)
    }
    // setUploading(false)
  };

  const ByMemeberShips = (item) => {
    navigation.navigate('PremiumMembershipDetailScreen', { data: item })

    // return
    // var Data = new Object();
    // Data.discountPercentage = item.discountPercentage;
    // Data.discountPrice = item.discountPrice;
    // Data.id = item.id;
    // Data.name = item.name;
    // Data.numberOfCards = item.numberOfCards;
    // Data.numberOfChats = item.numberOfChats;
    // Data.otherCategory = item.otherCategory;
    // Data.rate = item.rate;
    // Data.status = item.status;
    // // console.log('test data: ', Data);
    // // return;
    // dispatch(Buypackages(Data))
    // navigation.navigate('PaymentOptionScreen')
  }


  const viewMoreMembership = (item, index) => {
    // console.log('het', item , index);
    navigation.navigate('PremiumMembershipDetailScreen', { data: item })
  }

  const OnAdditionalPackage = (item, Price, props) => {
    //     console.log(Price);
    // return
    const updated = {
      ...item,
      Prices: {
        // discountedRate: item?.Price,
        limits: props ? props : item?.limits,
        rate: Price,
      },
      Price: Price,
      otherCategory: item.Title,
      uid: 789,
      limits: item?.id == 5 ? props : item?.limits,
      // limits: item?.id == 5 && Price == '$149' && '1 year',
    }
    // console.log(updated);
    // return
    // var Data = new Object();
    // Data.Details = item.Details;
    // Data.Price = item.Price;
    // Data.id = item.id;
    // Data.name = item.name;
    // Data.numberOfCards = item.numberOfCards;
    // Data.numberOfChats = item.numberOfChats;
    // Data.otherCategory = item.otherCategory;
    // Data.rate = item.rate;
    // Data.status = item.status;
    // Data.Prices = selectMemberships;
    // dispatch(BuyAdditionalPackages(updated))
    if (PaymentCards?.length > 0) {
      navigation.navigate('CheckoutScreenAdditionalPackage', {
        data: updated
      })
    }
    else {
      navigation.navigate('PaymentOptionScreen')
    }
  }

  const CancleFlakeInsurance = async () => {
    // console.log('yes');
    try {
      const userRef = await firestore().collection('Users').doc(user.uid);
      // Remove FlakeInsurance details if the rate is greater than the available balance
      await userRef.update({
        'userDetails.FlakeInsurance': null,
      });
      setShowSuccessPoppup({
        ...showSuccessPoppup,
        Status: true,
        Title: 'Flakes Insurance!',
        Detail: `Successfully: ${user?.FlakeInsurance?.limits} insurance remove from your profile!!`,
      })
    } catch (e) {
      console.log('Error', e);
    }
  }

  const OnSuccessConfirm = () => {
    setShowSuccessPoppup({
      ...showSuccessPoppup,
      Status: false,
      Title: null,
      Detail: null,
    })
    navigation.goBack()
  }


  useEffect(() => {
    fetchMemberships();
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          height: 60
        }}>
          <View style={{ width: '20%' }}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image source={require('../../assets/menu.png')} resizeMode='contain'
                style={{
                  height: 45,
                  color: COLORS.black
                }} />
            </TouchableOpacity>
          </View>

          <View style={{ width: '60%', alignItems: 'center', }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Premium Memberships!</Text>
          </View>

          <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
          </View>
        </View>

        <ScrollView>
          {memberships?.length > 0 &&
            <>
              <View style={{
                marginTop: 20,
                paddingHorizontal: 20
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontWeight: 'bold',
                  fontSize: 16
                }}>Memberships</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                {memberships?.map((item, index) => (
                  <View
                    key={index}
                    style={{ marginVertical: 10 }}>
                    <View style={{
                      marginHorizontal: 10,
                      marginLeft: 10,
                      borderRadius: 20,
                      backgroundColor: COLORS.white,
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
                      width: width / 1.2,
                    }}>
                      <View style={{
                        backgroundColor: COLORS.white,
                        width: '100%',
                        borderRadius: 20,
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
                      }}>
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 20,
                          paddingVertical: 20,
                          alignItems: 'center'
                        }}>
                          <Text style={{
                            color: COLORS.black,
                            fontWeight: 'bold',
                            fontSize: 14,
                            width: '70%',
                            // backgroundColor:COLORS.black
                          }}>{item.otherCategory}</Text>
                          {!item.discountPrice == '' ? (
                            <Text style={{
                              color: COLORS.black, fontSize: 12,
                              width: '30%',
                              alignItems: 'flex-end'
                            }}>{item.discountPrice} OFF {item.discountPercentage}%</Text>
                          ) : (
                            <Text style={{ color: COLORS.black, fontSize: 12, }}>${item.rate}/Month</Text>
                          )}
                        </View>
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 20,
                        }}>
                          <View style={{
                            width: '70%',
                            // backgroundColor:COLORS.main
                          }}>
                            <Text style={{
                              color: COLORS.black,
                              fontSize: 12
                            }}>{item.name}</Text>
                          </View>
                          <Image source={require('../../assets/Premium.png')} resizeMode='contain'
                            style={{
                              width: 50,
                              height: 50
                            }} />
                        </View>
                        <View style={{
                          paddingHorizontal: 20,
                          paddingBottom: 20,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start'
                        }}>
                          <TouchableOpacity
                            onPress={() => viewMoreMembership(item, index)}
                            activeOpacity={0.8}
                            style={{
                              paddingHorizontal: 20,
                              paddingVertical: 10,
                              backgroundColor: item?.MemebershipBuy ? COLORS.green : COLORS.main,
                              borderRadius: 10,
                              alignItems: 'center'
                            }}>
                            <Text style={{ color: COLORS.black, fontSize: 12 }}>View more</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                        borderBottomColor: COLORS.light,
                        borderBottomWidth: 1,
                        width: '100%',
                      }}>
                        <Text style={{
                          color: COLORS.black,
                          fontSize: 14,
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}>
                          What's in {item.otherCategory}
                        </Text>
                      </View>

                      <CardMoreDetails data={item?.Service1?.slice(0, 3)} />
                      {/* {item.id == 123 &&
                      }
                      {item.id == 456 &&
                        <CardMoreDetails data={Gold} />
                      }
                      {item.id == 654 &&
                        <CardMoreDetails data={Diamond} />
                      } */}

                      <View style={{
                        padding: 20,
                      }}>
                        {item?.MemebershipBuy ?
                          <TouchableOpacity
                            // onPress={() => ByMemeberShips(item, membershipUid)}
                            activeOpacity={0.8} style={{
                              paddingHorizontal: 20,
                              paddingVertical: 10,
                              backgroundColor: COLORS.green,
                              borderRadius: 10,
                              alignItems: 'center',
                            }}>
                            <Text style={{ color: COLORS.white, fontSize: 14 }}>Current Membership</Text>
                          </TouchableOpacity>
                          :
                          <TouchableOpacity
                            onPress={() => ByMemeberShips(item, membershipUid)}
                            activeOpacity={0.8} style={{
                              paddingHorizontal: 20,
                              paddingVertical: 10,
                              backgroundColor: COLORS.main,
                              borderRadius: 10,
                              alignItems: 'center'
                            }}>
                            <Text style={{ color: COLORS.black, fontSize: 14 }}>View More</Text>
                          </TouchableOpacity>
                        }
                      </View>

                    </View>
                  </View>

                ))}
              </ScrollView>
            </>
          }

          {additionalPackage?.length > 0 &&
            <View>
              <View style={{
                padding: 20,
                // marginBottom:20,
              }}>
                <Text style={{
                  color: COLORS.black,
                  fontWeight: 'bold',
                  fontSize: 16
                }}>Additional Packages</Text>
              </View>
              <View style={{
                marginBottom: 150,
                // paddingHorizontal: 20
              }}>
                {additionalPackage.map((j, i) => (
                  <View
                    key={i}
                    style={{
                      paddingHorizontal: 20,
                      backgroundColor: COLORS.white,
                      paddingVertical: 20,
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: COLORS.light
                    }}>
                    {j.id == 1 &&
                      <View>
                        <Text style={{
                          color: COLORS.black,
                          fontSize: 14,
                          // fontWeight:'bold'
                        }}>{j.Title}</Text>
                      </View>
                    }
                    <View style={{
                      // paddingVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {j?.image &&
                        <View style={{
                          flex: 1,
                          // backgroundColor:COLORS.main,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <View style={{
                            padding: 10,
                            backgroundColor: COLORS.light,
                            borderRadius: 50,
                          }}>
                            <Image source={{ uri: j?.image }} resizeMode='contain' style={{
                              width: 30,
                              height: 30,
                            }} />
                          </View>
                        </View>
                      }
                      <View style={{
                        flex: 3,
                        paddingHorizontal: 10,
                        // backgroundColor:COLORS.main
                      }}>
                        {j.id != 1 &&
                          <View>
                            <Text style={{
                              color: COLORS.black,
                              fontSize: 14,
                            }}>{j?.Title}</Text>
                          </View>
                        }
                        {j.Details?.map((d, i) => (
                          <Text key={i} style={{
                            fontSize: 10,
                            paddingTop: 10,
                            color: COLORS.gray
                          }}>{d.name}</Text>
                        ))}
                        {/* <Text style={{
                          fontSize: 12,
                          paddingTop: 5
                        }}>- Profile optimization</Text>
                        <Text style={{
                          fontSize: 12,
                          paddingTop: 5,
                        }}>- 1 boost</Text> */}
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => user?.FlakeInsurance?.limits == '1 month' && i == 3 ?
                            Alert.alert(
                              'Flake Insurance',
                              `Are you sure you want to cancel your ${user?.FlakeInsurance?.limits} falke insurance?`,
                              [
                                {
                                  text: 'No, Keep Insurance',
                                  style: 'cancel',
                                },
                                {
                                  text: 'Yes, Cancel',
                                  onPress: () => CancleFlakeInsurance(),
                                },
                              ],
                              { cancelable: false }
                            )
                            : OnAdditionalPackage(j, j?.Price, '1 month')}
                          style={{
                            flex: 3,
                            // backgroundColor:COLORS.main,
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            opacity: user?.FlakeInsurance?.limits == '1 month' && i == 3 ? 0.3 : 1
                          }}>
                          <Text style={{
                            color: COLORS.black,
                            padding: 10,
                            borderWidth: j.id == 5 ? 1 : 0,
                            borderColor: COLORS.main,
                            borderRadius: 10,
                            backgroundColor: j.id == 5 ? COLORS.transparent : COLORS.main,
                            fontWeight: 'bold',
                            fontSize: 12,
                          }}>Buy  for ${j?.Price}{j.id == 5 ? '/month' : null}</Text>
                        </TouchableOpacity>
                        {j.id == 5 &&
                          <TouchableOpacity
                            onPress={() => user?.FlakeInsurance?.limits == '1 year' && i == 3 ?
                              Alert.alert(
                                'Flake Insurance',
                                `Are you sure you want to cancel your ${user?.FlakeInsurance?.limits} falke insurance?`,
                                [
                                  {
                                    text: 'No, Keep Insurance',
                                    style: 'cancel',
                                  },
                                  {
                                    text: 'Yes, Cancel',
                                    onPress: () => CancleFlakeInsurance(),
                                  },
                                ],
                                { cancelable: false }
                              )
                              : OnAdditionalPackage(j, j?.PriceTwo, '1 year')}
                            style={{
                              flex: 3,
                              // backgroundColor:COLORS.main,
                              alignItems: 'flex-end',
                              justifyContent: 'flex-end',
                              opacity: user?.FlakeInsurance?.limits == '1 year' && i == 3 ? 0.3 : 1
                            }}>

                            <Text style={{
                              color: COLORS.black,
                              padding: 10,
                              borderRadius: 10,
                              backgroundColor: COLORS.main,
                              fontWeight: 'bold',
                              fontSize: 12,
                            }}>Buy  for ${j?.PriceTwo}{j.id == 5 ? '/year' : null}</Text>
                          </TouchableOpacity>
                        }
                      </View>

                    </View>
                  </View>
                ))}
              </View>
            </View>
          }
          {/* <View style={{
            marginBottom: 150,
            // paddingHorizontal: 20
          }}>

            <View style={{
              paddingHorizontal: 20,
              backgroundColor: COLORS.white,
              paddingVertical: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.light,
            }}>
              <View style={{
                flexDirection: 'row',
              }}>
                <View style={{
                  width: '25%',
                  // backgroundColor:COLORS.main,
                  // alignItems:'center',
                  justifyContent: 'center'
                }}>
                  <SVGRocket width={70} height={70} />
                </View>
                <View style={{
                  width: '40%',
                  // backgroundColor:COLORS.main
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>Boost your profile</Text>
                  </View>
                  <Text style={{
                    fontSize: 12,
                    paddingTop: 10
                  }}>boost your profile and
                    get seen 30x more</Text>
                </View>
                <View style={{
                  width: '35%',
                  // backgroundColor:COLORS.main,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end'
                }}>
                  <Text style={{
                    color: COLORS.black,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.main,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>Buy  for $8.99</Text>
                </View>

              </View>
            </View>


            <View style={{
              paddingHorizontal: 20,
              backgroundColor: COLORS.white,
              paddingVertical: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.light,
            }}>
              <View style={{
                flexDirection: 'row',
              }}>
                <View style={{
                  width: '25%',
                  // backgroundColor:COLORS.main,
                  // alignItems:'center',
                  justifyContent: 'center'
                }}>
                  <SVGProfile width={70} height={70} />
                </View>
                <View style={{
                  width: '40%',
                  // backgroundColor:COLORS.main
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>Profile Optimization</Text>
                  </View>
                  <Text style={{
                    fontSize: 12,
                    paddingTop: 10
                  }}>Profile optimizer will suggest your profile.</Text>
                </View>
                <View style={{
                  width: '35%',
                  // backgroundColor:COLORS.main,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end'
                }}>
                  <Text style={{
                    color: COLORS.black,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.main,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>Buy  for $28.99</Text>
                </View>
              </View>
            </View>

            <View style={{
              paddingHorizontal: 20,
              backgroundColor: COLORS.white,
              paddingVertical: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.light,
            }}>
              <View style={{
                flexDirection: 'row',
              }}>
                <View style={{
                  width: '25%',
                  // backgroundColor:COLORS.main,
                  // alignItems:'center',
                  justifyContent: 'center'
                }}>
                  <SVGDownload width={70} height={70} />
                </View>
                <View style={{
                  width: '40%',
                  // backgroundColor:COLORS.main
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>Download E-Book</Text>
                  </View>
                  <Text style={{
                    fontSize: 12,
                    paddingTop: 10
                  }}>3 pages e-book on how to date better.</Text>
                </View>
                <View style={{
                  width: '35%',
                  // backgroundColor:COLORS.main,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end'
                }}>
                  <Text style={{
                    color: COLORS.black,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.main,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>Buy  for $10</Text>
                </View>

              </View>
            </View>

            <View style={{
              paddingHorizontal: 20,
              backgroundColor: COLORS.white,
              paddingVertical: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.light,
            }}>
              <View style={{
                flexDirection: 'row',
              }}>
                <View style={{
                  width: '25%',
                  // backgroundColor:COLORS.main,
                  // alignItems:'center',
                  justifyContent: 'center'
                }}>
                  <SVGFlake width={70} height={70} />
                </View>
                <View style={{
                  width: '40%',
                  // backgroundColor:COLORS.main
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>Flake Insurance</Text>
                  </View>
                  <Text style={{
                    fontSize: 12,
                    paddingTop: 10,
                  }}>Human will verify that flakes are real / no acidity flakes. If you get flaked on Or often flake you also get 10% off flake removal fee</Text>
                </View>
                <View style={{
                  width: '35%',
                  // backgroundColor:COLORS.main,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}>
                  <Text style={{
                    color: COLORS.black,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.white,
                    borderWidth: 1,
                    borderColor: COLORS.main,
                    fontWeight: 'bold',
                    fontSize: 12,
                    marginVertical: 10,
                  }}>$24/ month</Text>
                  <Text style={{
                    color: COLORS.black,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.main,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>$149/ year</Text>
                </View>
              </View>
            </View>
          </View> */}
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showSuccessPoppup?.Status}
        onRequestClose={() => {
          setShowSuccessPoppup({ ...showSuccessPoppup, Status: false });
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: COLORS.gray,
          opacity: .95
          // alignItems: 'center',
        }}>
          <View style={{
            margin: 20,
            backgroundColor: COLORS.white,
            borderRadius: 20,
            padding: 25,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
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
          }}>
            <Image source={require('../../assets/flakeremove.png')} resizeMode='contain' style={{
              width: 50,
              height: 50
            }} />
            <Text style={{
              marginBottom: 10,
              color: COLORS.black,
              fontWeight: 'bold'
              // textAlign: 'center',
            }}>{showSuccessPoppup.Title}</Text>
            <Text style={{
              marginBottom: 10,
              textAlign: 'center',
            }}>
              {showSuccessPoppup.Detail}
            </Text>
            <TouchableOpacity
              onPress={() => OnSuccessConfirm()}
              style={{
                // borderColor: COLORS.black,
                width: '100%',
                borderRadius: 10,
                marginHorizontal: 5,
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.main
              }}>
              <Text style={{
                color: COLORS.black,
              }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Loader modal={uploading} uploading={uploading} />
    </SafeAreaView>
  )
}

export default PremiumMembershipScreen


const CardMoreDetails = ({ data }) => {
  // console.log('===> ',data);
  // return
  return (
    <View>
      {data?.map((j, i) => (
        <View key={i}>
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <View style={{
              flexDirection: 'row',
              width: "80%"
            }}>
              {j?.image &&
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
                  <Image source={{ uri: j?.image }} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                </View>
              }
              <View style={{ paddingRight: 30 }}>
                <Text style={{
                  fontSize: 12,
                  color: COLORS.gray
                }}>{j?.name}</Text>
              </View>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../../assets/tik.png')} resizeMode='contain' />
            </View>
          </View>
        </View>
      ))}
    </View>


    //   <View style={{
    //     flexDirection: 'row',
    //     paddingHorizontal: 20,
    //     paddingVertical: 20,
    //     justifyContent: 'space-between',
    //   }}>
    //     <View style={{
    //       flexDirection: 'row',
    //     }}>
    //       <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
    //         <Image source={require('../../assets/totlikes.png')} resizeMode='contain' />
    //       </View>
    //       <View style={{ paddingRight: 10 }}>
    //         <Text>15 likes Per Day</Text>
    //       </View>
    //     </View>
    //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    //       <Image source={require('../../assets/tik.png')} resizeMode='contain' />
    //     </View>
    //   </View>

    //   <View style={{
    //     flexDirection: 'row',
    //     paddingHorizontal: 20,
    //     paddingVertical: 20,
    //     justifyContent: 'space-between',
    //   }}>
    //     <View style={{
    //       flexDirection: 'row',
    //     }}>
    //       <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
    //         <Image source={require('../../assets/matches.png')} resizeMode='contain' />
    //       </View>
    //       <View style={{ paddingRight: 30 }}>
    //         <Text>10 Max Matches</Text>
    //       </View>
    //     </View>
    //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    //       <Image source={require('../../assets/tik.png')} resizeMode='contain' />
    //     </View>
    //   </View>
    // </View>
  )
}

const styles = StyleSheet.create({})