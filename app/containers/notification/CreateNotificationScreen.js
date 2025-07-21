import React, { useState, useEffect,useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { AuthContext } from '../Login/AuthContext';

export default function CreateNotificationScreen({ navigation }) {
  const [sendPush, setSendPush] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [fromCountry, setFromCountry] = useState('');
  const [toCountry, setToCountry] = useState('');
  const [countriesNames, setCountriesNames] = useState([]);
   const {
    userCode
  } = useContext(AuthContext);

  const fetchAllCountries = async () => {
    const allCountriesNames = await axios.get(
      'http://192.168.1.125:8080/country/get-all-countries-names',
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (!allCountriesNames.data.success)
      throw new Error('Ülke listesi alınamadı');

    const allCountries = Array.isArray(allCountriesNames.data.data)
      ? allCountriesNames.data.data
      : [];

    setCountriesNames(allCountries);
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);
  

  const handleSubmit = async () => {
    
    if (!toCountry || !fromCountry) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    if (!sendPush && !sendEmail) {
      Alert.alert('Hata', 'En az bir bildirim türü seçilmelidir');
      return;
    }

    const createNotification = await axios.post('http://192.168.1.125:8080/notification/create-notification',

        {
            fromCountry,
            toCountry,
            userCode

        },
         {
          headers: { 'Content-Type': 'application/json' },
        },
    )    

    if(!createNotification.data.success) throw new Error('Teknik Bir Hata', 'Bildirim Oluşturulamadı');
    
    Alert.alert('Bildiriminiz Başarıyla Oluşturuldu. Randevu Açıldığında İlk Siz Haberiniz Olacak.')
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Icon name="notifications" size={28} color="#fff" /> Bildirim Oluştur
      </Text>

      <View style={styles.card}>
        <Text style={styles.pickerLabel}>Nereden?</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={fromCountry}
            onValueChange={setFromCountry}
            style={styles.pickerStyle}
            dropdownIconColor="#3a7bd5"
            mode="dropdown"
          >
            <Picker.Item label="Tümü" value="" />
            {countriesNames.map((country, index) => (
              <Picker.Item label={country} value={country} key={index} />
            ))}
          </Picker>
        </View>

        <Text style={styles.pickerLabel}>Nereye?</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={toCountry}
            onValueChange={setToCountry}
            style={styles.pickerStyle}
            dropdownIconColor="#3a7bd5"
            mode="dropdown"
          >
            <Picker.Item label="Tümü" value="" />
            <Picker.Item label="Schengen Ülkeleri" value="Schengen" />
            {countriesNames.map((country, index) => (
              <Picker.Item label={country} value={country} key={index} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Bildirimi Nasıl Göndermek İstersiniz?</Text>

        <View style={styles.checkboxRow}>
          <CheckBox
            value={sendPush}
            onValueChange={setSendPush}
            tintColors={{ true: '#1dd1a1', false: '#ccc' }}
          />
          <Text style={styles.checkboxLabel}> Mobil Bildirim</Text>
        </View>

        <View style={styles.checkboxRow}>
          <CheckBox
            value={sendEmail}
            onValueChange={setSendEmail}
            tintColors={{ true: '#1dd1a1', false: '#ccc' }}
          />
          <Text style={styles.checkboxLabel}> E-posta Bildirimi</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Oluştur</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 50,
    backgroundColor: 'rgb(39,123,234)',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f1f2f6',
    padding: 12,
    borderRadius: 10,
    borderColor: '#dfe6e9',
    borderWidth: 1,
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: '#2d3436',
  },
  button: {
    backgroundColor: '#ff6b81',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 12,
    overflow: 'hidden',
  },
  pickerStyle: {
    color: 'black',
    height: 50,
    paddingHorizontal: 10,
  },
});
