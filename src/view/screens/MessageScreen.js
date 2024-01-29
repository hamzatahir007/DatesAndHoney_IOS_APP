import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image,Platform, TouchableOpacity, FlatList, Modal, Dimensions } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import { ScrollView } from 'react-native-gesture-handler'
import { chatuser, selectChatuser, selectUser } from '../../../redux/reducers/Reducers'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geocoder from 'react-native-geocoding'
const { height, width } = Dimensions.get('window')
const Masseges = [
    {
        id: '1',
        userName: 'Srto h.',
        userImg: require('../../assets/like1.png'),
        messageText: 'having a good day?'
    },
    {
        id: '2',
        userName: 'Laite I',
        userImg: require('../../assets/like2.png'),
        messageText: 'Ok i am coming'
    },
    {
        id: '3',
        userName: 'Swertw',
        userImg: require('../../assets/profile3.png'),
        messageText: 'Typing...'
    },
    {
        id: '4',
        userName: 'Srto h.',
        userImg: require('../../assets/profile2.png'),
        messageText: 'having a good day back?'
    },
]

const MessageScreen = ({ navigation }) => {
    const reduxChatUser = useSelector(selectChatuser);
    const user = useSelector(selectUser);
    const [recentMessage, setRecentMessage] = useState();
    const [showModal, setShowModal] = useState({
        status: false,
        title: null,
        description: null,
    });
    const [unreadMessage, setUnreadMessage] = useState([]);
    // console.log(user?.PackageId);

    const dispatch = useDispatch();


    const GetRecentMessages = async () => {
        if (reduxChatUser?.length > 0) {
            try {
                const updatedUserPromises = reduxChatUser.map(async (i) => {
                    const docid = i.uid > user.uid ? user.uid + "-" + i.uid : i.uid + "-" + user.uid;
                    const unreaded = [];
                    const recentmsg = [];
                    const messageRef = firestore().collection('chatrooms')
                        .doc(docid)
                        .collection('messages')
                        .orderBy('createdAt', "desc")

                    const messageQuerySnapshot = await messageRef.get();

                    messageQuerySnapshot.docs.forEach(docSnap => {
                        const data2 = docSnap.data();
                        recentmsg.push(data2);

                        if (!data2.read && data2.sentBy === i.uid) {
                            unreaded.push(data2);
                        }
                    });

                    if (unreaded.length > 0 || recentmsg.length > 0) {
                        return {
                            ...i,
                            recentmsg: recentmsg[0]?.text ? recentmsg[0]?.text : 'File/Proposal attachment..',
                            unreadmsg: unreaded.length,
                        };
                    } else {
                        return i;
                    }
                });

                const updatedUser = await Promise.all(updatedUserPromises);

                console.log(updatedUser);
                // Dispatch updatedUser to update the redux state
                dispatch(chatuser(updatedUser));
            } catch (error) {
                console.error('Error in GetRecentMessages:', error);
            }
        }
    }
    // Is code mein maine await ka istemal messageRef ke liye kiya hai aur messageDocs mein await se promise ko resolve kiya hai. Isse Hermes engine mein arrow function ke async ke sath ju
    // const GetRecentMessages = async () => {

    // }

    const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const json = await Geocoder.from(latitude, longitude)
            const address = json.results[0].formatted_address;
            // console.log( typeof address);
            return address;
        } catch (error) {
            console.warn(error);
            return 'Error fetching address';
        }
    };
    const OnSelectConcriege = async (element) => {
        // console.log(element);
        // return
        if (user?.PackageId == '654' && element) {
            const address = await getAddressFromCoordinates(element?.Location?.latitude, element?.Location?.longitude)
            let update = {
                ...element,
                Address: address,
            }
            navigation.navigate('Concierge Management', {
                screen: 'ConciregeProfile',
                params: { data: update },
            });
        }
        else {
            setShowModal({
                ...showModal,
                status: true,
                title: 'Unlock Diamond Membership for Enhanced Concierge Services',
                description: 'Experience the pinnacle of concierge services with Diamond and Diamond+ membership. Elevate your matchmaking journey by gaining exclusive access to user match coordination and chat services on the concierge management platform. Upgrade now to find your ideal match effortlessly!'
            })
        }
    }

    useEffect(() => {
        GetRecentMessages();
    }, [])

    const onBuyNow = () => {
        navigation.navigate('Premium Membership')
        setShowModal({
            ...showModal,
            status: false,
            title: null,
            description: null
        })
    }

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLORS.black} />
            <View style={styles.container}>
                <View style={{
                    padding: 10,
                    paddingTop: 20,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: COLORS.black
                    }}>Matching With You!
                        {reduxChatUser ? (
                            <Text style={{ fontWeight: '400', fontSize: 13, color:COLORS.gray }}>({reduxChatUser.length})</Text>
                        ) : (
                            <Text style={{ fontWeight: '400', fontSize: 13, color:COLORS.gray }}>(0)</Text>
                        )}
                    </Text>
                </View>
                <View style={{
                    // paddingHorizontal: 20,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.light,
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            padding: 20,
                            width: 65,
                            height: 65,
                            marginHorizontal: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 60,
                        }}>
                            {reduxChatUser ? (
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 17,
                                    color: COLORS.black,
                                    textAlign: 'center'
                                }}>+{reduxChatUser.length}</Text>
                            ) : (
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 17,
                                    color: COLORS.black,
                                    textAlign: 'center'
                                }}>+0</Text>
                            )}
                        </View>
                        <Text style={{
                            fontWeight: 'bold',
                            color: COLORS.black,
                            fontSize: 12,
                        }}>Matches</Text>
                    </View>

                    {reduxChatUser?.length > 0 && (
                        <FlatList
                            data={reduxChatUser}
                            keyExtractor={(item, index) => String(index)}
                            // keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                // console.log(item.image1),
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{
                                        marginHorizontal: 10,
                                        backgroundColor: COLORS.main,
                                        borderRadius: 50,
                                    }}>
                                        {item.image1 ?
                                            <Image source={{ uri: item.image1 }} resizeMode='cover'
                                                style={{
                                                    width: 65,
                                                    height: 65,
                                                    borderRadius: 50,
                                                }} />
                                            :
                                            <Image source={require('../../assets/nopic.png')} resizeMode='cover'
                                                style={{
                                                    width: 65,
                                                    height: 65,
                                                    borderRadius: 50,
                                                }} />
                                        }
                                    </View>
                                    <Text style={{
                                        color: COLORS.gray,
                                        fontSize: 12,
                                    }}>{item.Name.split(' ')[0]}...</Text>
                                </View>
                            )} />
                    )}
                    {/* <View style={{ alignItems: 'center' }}>
                        <View style={{
                            marginHorizontal: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 50,
                        }}>
                            <Image source={require('../../assets/like1.png')} resizeMode='contain'
                                style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <Text>Srto h.</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            marginHorizontal: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 50,
                        }}>
                            <Image source={require('../../assets/like2.png')} resizeMode='contain'
                                style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <Text>Laite I</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            marginHorizontal: 10,
                            backgroundColor: COLORS.main,
                            borderRadius: 50,
                        }}>
                            <Image source={require('../../assets/like3.png')} resizeMode='contain'
                                style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 30,
                                }} />
                        </View>
                        <Text>Swertw</Text>
                    </View> */}
                </View>


                <View style={{
                    // paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: COLORS.white
                }}>
                    <View style={{
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: COLORS.black,
                            fontSize: 14
                        }}>
                            Messages
                        </Text>
                    </View>

                    {reduxChatUser?.length > 0 ? (
                        <View style={{ marginBottom: 0 }}>
                            <FlatList
                                data={reduxChatUser}
                                vertical
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => String(index)}
                                style={{ marginBottom: 20 }}
                                renderItem={({ item }) => (
                                    // <ScrollView vertical showsVerticalScrollIndicator={false}>
                                    <View>
                                        <TouchableOpacity
                                            style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: COLORS.light,
                                            }}
                                            onPress={() =>
                                                navigation.navigate('ChatingScreen', {
                                                    data: item
                                                })
                                            }
                                        >
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingVertical: 10,
                                                height: 100,
                                            }}>
                                                <View style={{
                                                    marginHorizontal: 10,
                                                    borderRadius: 50,
                                                    width: '20%',
                                                }}>
                                                    {item?.image1 ?
                                                        <Image source={{ uri: item?.image1 }} resizeMode='cover'
                                                            style={{
                                                                width: 65,
                                                                height: 65,
                                                                borderRadius: 50,
                                                            }} />
                                                        :
                                                        <Image source={require('../../assets/nopic.png')} resizeMode='cover'
                                                            style={{
                                                                width: 65,
                                                                height: 65,
                                                                borderRadius: 50,
                                                            }} />
                                                    }
                                                </View>

                                                <View style={{
                                                    width: '60%',
                                                    // backgroundColor:COLORS.gray
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}>
                                                        <Text style={{
                                                            fontWeight: 'bold',
                                                            color: COLORS.black,
                                                            fontSize: 14,
                                                        }}>{item?.Name}</Text>
                                                    </View>
                                                    <Text style={{
                                                        color: COLORS.gray,
                                                        fontSize: 12,
                                                    }}>{item?.recentmsg ? item?.recentmsg : 'Say Hey..'}</Text>
                                                </View>
                                                <View style={{
                                                    width: '20%'
                                                }}>
                                                    {item?.unreadmsg > 0 &&
                                                        <View style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 25, // To make it a circle
                                                            backgroundColor: COLORS.main,
                                                            justifyContent: 'center', // Center the content vertically
                                                            alignItems: 'center', // Center the content horizontally
                                                        }}>
                                                            <Text style={{
                                                                color: COLORS.black,
                                                                fontSize: 12,
                                                            }}>{item?.unreadmsg}</Text>
                                                        </View>
                                                    }
                                                    {/* <Image source={require('../../assets/star.png')} resizeMode="contain"
                                                        style={{
                                                            tintColor: COLORS.gray
                                                        }} /> */}
                                                </View>
                                            </View>
                                            {item?.conciergeUser?.length > 0 ?
                                                <View style={{
                                                    marginBottom: 20
                                                }}>
                                                    {item?.conciergeUser?.map((e, i) => (
                                                        <TouchableOpacity
                                                            key={i}
                                                            onPress={() => OnSelectConcriege(e)}
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                height: 60,
                                                                // backgroundColor: COLORS.light,
                                                                borderTopColor: COLORS.light,
                                                                borderTopWidth: 1,
                                                                width: '80%',
                                                                alignSelf: 'center',
                                                            }}>
                                                            <View style={{
                                                                marginHorizontal: 10,
                                                                borderRadius: 50,
                                                                width: '20%',
                                                            }}>
                                                                {e?.image1 ?
                                                                    <Image source={{ uri: e?.image1 }} resizeMode='cover'
                                                                        style={{
                                                                            width: 45,
                                                                            height: 45,
                                                                            borderRadius: 50,
                                                                        }} />
                                                                    :
                                                                    <Image source={require('../../assets/nopic.png')} resizeMode='cover'
                                                                        style={{
                                                                            width: 45,
                                                                            height: 45,
                                                                            borderRadius: 50,
                                                                        }} />
                                                                }
                                                            </View>

                                                            <View style={{
                                                                width: '60%',
                                                                // backgroundColor:COLORS.gray
                                                            }}>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                }}>
                                                                    <Text style={{
                                                                        fontWeight: 'bold',
                                                                        color: COLORS.black,
                                                                        fontSize: 12,
                                                                    }}>{e?.Name}</Text>
                                                                </View>
                                                                <Text style={{
                                                                    color: COLORS.gray,
                                                                    fontSize: 10,
                                                                }}>{e?.MediatorType ? e?.MediatorType : 'Dating Coach'}</Text>
                                                            </View>
                                                            <View style={{
                                                                width: '20%'
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 10,
                                                                    color: COLORS.gray
                                                                }}>Chat</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    ))}
                                                </View>
                                                :
                                                null}
                                        </TouchableOpacity>

                                    </View>
                                    // </ScrollView>
                                )}
                            />
                        </View>
                    ) : (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.light,
                            height: 100,
                        }}>
                            <View style={{
                                marginHorizontal: 10,
                                borderRadius: 50,
                                width: '20%',
                            }}>
                                <Image source={require('../../assets/nouser.png')} resizeMode='contain'
                                    style={{
                                        width: 45,
                                        height: 45,
                                        borderRadius: 30,
                                        tintColor: COLORS.gray
                                    }} />
                            </View>

                            <View style={{
                                width: '65%'
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    color: COLORS.black
                                }}>No user!</Text>
                                <Text style={{color:COLORS.gray,fontSize:12}}>match not found to chat.</Text>
                            </View>

                            {/* <View style={{
                                width: '15%'
                            }}>
                                <Image source={require('../../assets/star.png')} resizeMode="contain"
                                    style={{
                                        tintColor: COLORS.gray
                                    }} />
                            </View> */}
                        </View>
                    )}

                    {user?.PackageId != 654 &&
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            // width:'80%
                        }}>
                            <View style={{
                                width: '100%',
                                // justifyContent:'center',
                                alignItems: 'center'
                                // backgroundColor:COLORS.gray
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    color:COLORS.gray
                                }}>If you want to match with more people, upgrade your
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Premium Membership')}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: COLORS.main,
                                    }}>
                                        membership package.
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal?.status}
                onRequestClose={() => {
                    setShowModal({
                        ...showModal,
                        status: false
                    });
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    // backgroundColor: COLORS.gray,
                    // opacity: .9
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: 'white',
                        opacity: 1,
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
                        paddingHorizontal: 40
                    }}>
                        {/* <Image source={require('../../../assets/flakeremove.png')} resizeMode='contain' style={{
                            width: 50,
                            height: 50
                        }} /> */}
                        <MaterialIcons color={'red'} name='error' size={40} />
                        <Text style={{
                            fontSize: 14,
                            color: COLORS.black,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>{showModal?.title}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: COLORS.gray,
                            textAlign: 'center'
                        }}>{showModal?.description}</Text>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <TouchableOpacity
                                onPress={() => setShowModal({
                                    ...showModal,
                                    status: false,
                                    title: null,
                                    description: null,
                                })}
                                style={{
                                    width: '45%',
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                    // height:30,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    backgroundColor: COLORS.gray2
                                }}>
                                <Text style={{
                                    color: COLORS.gray,
                                    fontSize: 12,
                                }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => onBuyNow()}
                                style={{
                                    width: '45%',
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                    // height:30,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    backgroundColor: COLORS.main
                                }}>
                                <Text style={{
                                    color: COLORS.white,
                                    fontSize: 12,
                                }}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default MessageScreen

const styles = StyleSheet.create({
    container: {
        // alignItems:'center'
        backgroundColor: COLORS.white,
        height: '100%'
    }
})