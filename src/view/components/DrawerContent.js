import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../consts/Colors';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import { logout, selectUser } from '../../../redux/reducers/Reducers';
import RNRestart from 'react-native-restart';
import Toast from 'react-native-simple-toast';

const DrawerContent = (props) => {
    const user = useSelector(selectUser);

    const OnLogOut = async (props) => {
        // console.log('logout');
        try {
            auth()
                .signOut()
                .then(() =>
                    dispatch(logout()),
                    props.navigation.toggleDrawer(),
                    RNRestart.Restart(),
                    // console.log('User signed out!'),
                    Toast.show(`User signed out!`, Toast.LONG)
                    // props.navigation.navigate('LoginScreen')
                    // navigation.('SignUpScreen')
                );
            // const userData = await AsyncStorage.getItem('session');
            //   await AsyncStorage.removeItem('CurrentUserData') 
            //   await AsyncStorage.removeItem('CurrentUser')
        }
        catch (exception) {
            return false;
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.dark }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: COLORS.dark }}>
                <TouchableOpacity
                    onPress={() => props?.navigation.navigate('Profile' ,{
                        screen:'ProfileScreen'
                    })}
                    style={{
                        flexDirection: 'row',
                        paddingLeft: 20,
                        paddingVertical: 30,
                        borderBottomColor: COLORS.gray,
                        borderBottomWidth: 0.4
                    }}>
                    <View style={{
                        borderWidth: 3,
                        borderColor: COLORS.main,
                        borderRadius: 50
                    }}>
                        {user.image1 ?
                            <Image
                                source={{ uri: user.image1 }}
                                style={{ height: 60, width: 60, borderRadius: 50, }}
                            />
                            :
                            <Image source={require('../../assets/nopic.png')}
                                style={{ height: 60, width: 60, borderRadius: 50, }}
                            />
                        }
                    </View>
                    <View
                        style={{ marginLeft: 15, flexDirection: 'column' }}
                    >
                        <Title style={styles.title}>{user.Name}</Title>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}>
                            <Image source={require('../../assets/dates.png')} resizeMode='contain'
                                style={{
                                    marginRight: 5,
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.white
                                }} />
                            <Caption style={styles.caption}>Want a date</Caption>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20 }}>
                {/* <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 5,
                            }}>
                            Tell a Friend
                        </Text>
                    </View>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => OnLogOut(props)} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} color={COLORS.white} />
                        <Text
                            style={{
                                fontSize: 14,
                                marginLeft: 5,
                                color: COLORS.white
                            }}>
                            Logout
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingVertical: 20,
        borderBottomColor: COLORS.light,
        borderBottomWidth: 0.4,
    },
    title: {
        fontSize: 15,
        color: COLORS.white,
        marginTop: 3,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Medium',
    },
    caption: {
        color: COLORS.white,
        fontSize: 12,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: COLORS.light,
        borderTopWidth: 0.4
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    itemstyle: {
        borderBottomColor: '#F9F9F9',
        // borderBottomWidth: 1,
    }
})