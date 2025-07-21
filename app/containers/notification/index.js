import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const getTokenForNotification = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Bildirim izni verildi');

      const fcmToken = await messaging().getToken();

      return fcmToken;
    } else {
      Alert.alert("İzin verilmedi", "Bildirim izni alınamadı.");
    }
  } catch (error) {
    console.error("Bildirim hatası:", error);
  }
};

