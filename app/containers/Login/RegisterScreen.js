import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [nameAndSurname, setNameAndSurname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePasswordRules = password => ({
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  });

  const rules = validatePasswordRules(password);
  const allValid = Object.values(rules).every(Boolean);

  const handleRegister = async () => {
    const isValidEmail = email => {
      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
      setEmailError('Geçerli bir e-posta adresi girin');
      return;
    } else {
      setEmailError('');
    }

    if (password !== passwordAgain) {
      setPasswordError('Şifreler uyuşmuyor');
      return;
    } else {
      setPasswordError('');
    }
    if (!email || !password || !nameAndSurname || !passwordAgain) {
      setEmailError('Tüm alanlar zorunludur');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.125:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nameAndSurname, email, password }),
      });

      if (response.ok) {
        Alert.alert('E-Mail Doğrulama', 'Giriş Yapabilmek İçin Mail Adresinize Gönderdiğimiz Link İle Doğrulama Yapınız.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Hata', 'Kayıt başarısız');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Sunucu Hatası', 'Bağlantı sağlanamadı');
    }
  };

  const RuleItem = ({ label, valid }) => (
    <View style={styles.ruleItem}>
      <Icon
        name={valid ? 'checkmark-circle' : 'close-circle'}
        size={18}
        color={valid ? 'green' : 'gray'}
        style={{ marginRight: 8 }}
      />
      <Text style={{ color: valid ? 'green' : 'gray' }}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput
        placeholder="Ad-Soyad"
        style={styles.input}
        onChangeText={setNameAndSurname}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={text => {
          setEmail(text);
          if (emailError) setEmailError('');
        }}
        onBlur={() => {
          const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
          if (email === '') {
            setEmailError('E-posta zorunludur');
          } else if (!emailRegex.test(email)) {
            setEmailError('Geçerli bir e-posta adresi girin');
          } else {
            setEmailError('');
          }
        }}
      />
      {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
      <TextInput
        placeholder="Şifre"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={text => {
          setPassword(text);
          if (passwordError) setPasswordError('');
        }}
        onBlur={() => {
          if (password === '') {
            setPasswordError('Şifre zorunludur');
          } else if (passwordAgain && password !== passwordAgain) {
            setPasswordError('Şifreler uyuşmuyor');
          } else {
            setPasswordError('');
          }
        }}
        onFocus={() => setIsPasswordFocused(true)}
      />

      <TextInput
        placeholder="Şifre Tekrar"
        style={styles.input}
        secureTextEntry
        value={passwordAgain}
        onChangeText={text => {
          setPasswordAgain(text);
          if (passwordError) setPasswordError('');
        }}
        onBlur={() => {
          if (passwordAgain === '') {
            setPasswordError('Şifre tekrarı zorunludur');
          } else if (password && password !== passwordAgain) {
            setPasswordError('Şifreler uyuşmuyor');
          } else {
            setPasswordError('');
          }
        }}

        onFocus={() => setIsPasswordFocused(true)}
      />

      {passwordError !== '' && (
        <Text style={styles.errorText}>{passwordError}</Text>
      )}

      {isPasswordFocused && (
        <View style={styles.rulesContainer}>
          <RuleItem label="En az 8 karakter" valid={rules.minLength} />
          <RuleItem label="Büyük harf içeriyor" valid={rules.hasUpper} />
          <RuleItem label="Küçük harf içeriyor" valid={rules.hasLower} />
          <RuleItem label="Rakam içeriyor" valid={rules.hasNumber} />
          <RuleItem label="Özel karakter içeriyor" valid={rules.hasSpecial} />
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: allValid ? '#28a745' : 'gray' },
        ]}
        onPress={handleRegister}
        disabled={!allValid}
      >
        <Text style={styles.buttonText}>Kayıt</Text>
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
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  rulesContainer: { marginTop: 10, marginBottom: 20 },
  ruleItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  errorText: {
    color: 'red',
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 13,
  },
});
