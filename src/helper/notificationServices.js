import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Geolocation from 'react-native-geolocation-service';


export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}
const getFcmToken = async () => {
    let checkToken = await AsyncStorage.getItem('fcmToken');
    // await AsyncStorage.setItem('fcmToken' , checkToken)
    const CurrentUser = auth()?.currentUser?.uid;

    // console.log('the old token', checkToken);
    if (!checkToken) {
        try {
            const fcmToken = await messaging().getToken()
            if (!!fcmToken) {
                // console.log('fcm token generated', fcmToken);
                
                await AsyncStorage.setItem('fcmToken', fcmToken)
            }
        } catch (e) {
            console.log('error fcm token : ', e);
        }
    }
}

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization(
          'whenInUse',
        );
        if (permissionStatus === 'granted') {
          return resolve('granted');
        }
        reject('Permission not granted');
      } catch (error) {
        return reject(error);
      }
      return
    }
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        }
        return reject('Location Permission denied');
      })
      .catch(error => {
        console.log('Ask Location permission error: ', error);
        return reject(error);
      });
  });

export const notificationListner = async () => {

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
        console.log('background state', remoteMessage.notification);
        // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                // handleNotification(remoteMessage);
                // handleNotification(remoteMessage);
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
                console.log('remote message', remoteMessage.notification);
            }
            //   setLoading(false);
        });


    messaging().onMessage((remoteMessage) => {
        console.log('Received a notification: ', remoteMessage.notification);
        console.log('Notification data: ', remoteMessage.data)
        const {notification , messageId} = remoteMessage
        PushNotificationIOS.addNotificationRequest({
            id:messageId,
            title:notification?.title,
            body:notification?.body,
            sound:'default'
        });
    })


    messaging().setBackgroundMessageHandler((remoteMessage) => {
        console.log('Received a notification: ', remoteMessage.notification);
        console.log('Notification data: ', remoteMessage.data)
        const {notification , messageId} = remoteMessage
        PushNotificationIOS.addNotificationRequest({
            id:messageId,
            title:notification?.title,
            body:notification?.body,
            sound:'default'
        });
    })


}