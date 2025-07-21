import React, { useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../containers/Login/StartScreen';
import Login from '../containers/Login/LoginScreen';
import Register from '../containers/Login/RegisterScreen';
import HomeScreen from './home/index';
import ProfileScreen from './Profile/ProfileScreen';
import { AuthProvider } from './Login/AuthContext';
import CreateNotificationScreen from './notification/CreateNotificationScreen';

const Stack = createNativeStackNavigator();

// 🔔 Android için bildirim kanalı oluştur
async function createNotificationChannel() {
  if (Platform.OS === 'android') {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  }
}

// 🔒 Android 13+ için bildirim izni iste
async function requestAndroidNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Bildirim İzni Gerekli',
        message: 'Sana anlık bildirim gönderebilmemiz için izin vermelisin.',
        buttonPositive: 'İzin Ver',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('✅ Bildirim izni verildi');
    } else {
      console.log('❌ Bildirim izni reddedildi');
    }
  }
}

export default function App() {
  useEffect(() => {
    // İzin ve kanal oluşturma
    createNotificationChannel();
    requestAndroidNotificationPermission();
    messaging().requestPermission(); // iOS için

    // 🔄 Foreground bildirimleri yakala
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('📥 Foreground bildirim:', remoteMessage);

      const title = remoteMessage.notification?.title || remoteMessage.data?.title || "Bildirim";
      const body = remoteMessage.notification?.body || remoteMessage.data?.body || "İçerik yok";

      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher', // app icon
        },
      });
    });

    // 🔄 Background bildirim handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const title = remoteMessage.data?.title || "BG Bildirim";
      const body = remoteMessage.data?.body || "BG içerik";

      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher',
        },
      });
    });

    return unsubscribe;
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="CreateNotificationScreen" component={CreateNotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
