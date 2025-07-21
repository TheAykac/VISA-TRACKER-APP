import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import LoginCard from './loginCard';
import RegisterCard from './registerCard';

export default function StartScreen() {
  const [activeCard, setActiveCard] = useState(null); // "login" or "register"

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Choose an option to continue</Text>

      <TouchableOpacity style={styles.button} onPress={() => setActiveCard('login')}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745' }]} onPress={() => setActiveCard('register')}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>

      {activeCard === 'login' && <LoginCard />}
      {activeCard === 'register' && <RegisterCard />}
    </View>
  );
}
