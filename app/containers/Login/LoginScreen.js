import React, { useState, useContext } from 'react';
import DeviceInformation from 'react-native-device-info';
import { getTokenForNotification } from '../notification/index.js';
import { AuthContext } from '../Login/AuthContext';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const getDeviceInformation = async () => {
    const deviceName = await DeviceInformation.getDeviceName();
    const deviceToken = await getTokenForNotification();
    return { deviceName, deviceToken };
  };
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    try {
      const { deviceName, deviceToken } = await getDeviceInformation();
      const response = await axios.post(
        'http://192.168.1.125:8080/auth/login',
        {
          email,
          password,
          deviceToken,
          deviceName,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (response.data.success) {
        await login(response);
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Hata', 'Geçersiz bilgiler');
      }
    } catch (err) {
      Alert.alert('Hata', 'Sunucuya ulaşılamadı');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Şifre"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
