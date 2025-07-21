import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import headerImage from '../../image/headerImage.png';
import VisaCard from '../../components/visaCard';
import { AuthContext } from '../Login/AuthContext.js';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [showFilter, setShowFilter] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [missionCode, setMissionCode] = useState('');
  const [visaCategory, setVisaCategory] = useState('');
  const [visaType, setVisaType] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [countriesNames, setCountriesNames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const [showFloatingFilter, setShowFloatingFilter] = useState(false);

  let lastScrollY = 0;

  const PAGE_SIZE = 4;

  const fetchAppointments = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const allAppointment = await axios.post(
        'http://192.168.1.125:8080/visa/get-filtered-appointment',
        {
          countryCode,
          missionCode,
          visaCategory,
          visaType,
          status: '',
          page,
          size: PAGE_SIZE,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      console.log(allAppointment);
      const allCountriesNames = await axios.get(
        'http://192.168.1.125:8080/country/get-all-countries-names',
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!allCountriesNames.data.success)
        throw new Error('Ülke listesi alınamadı');
      if (!allAppointment.data.success)
         throw new Error('Randevular alınamadı');

      const allAppointmentData = Array.isArray(allAppointment.data.data)
        ? allAppointment.data.data
        : [];
      const allCountries = Array.isArray(allCountriesNames.data.data)
        ? allCountriesNames.data.data
        : [];

      setAppointments(prev => [...prev, ...allAppointmentData]);
      setCountriesNames(allCountries);
      setHasMore(allAppointmentData.length === PAGE_SIZE);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
  messaging()
    .requestPermission()
    .then(() => {
      return messaging().getToken();
    })
    .then(token => {
      console.log('🔑 FCM Token:', token); // bunu Firebase Console'da test için kullan
    })
    .catch(error => {
      console.log('FCM token alma hatası:', error);
    });
}, []);
  const applyFilters = () => {
    setAppointments([]);
    setPage(1);
    setHasMore(true);
    setShowFilter(false);
    setTimeout(fetchAppointments, 0);
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Image source={headerImage} style={styles.iconImage} />
        <TouchableOpacity
          onPress={() => {
            if (!isLoggedIn) {
              navigation.navigate('Start');
            } else {
              navigation.navigate('ProfileScreen');
            }
          }}
          style={styles.profileIconOverlay}
        >
          <Icon
            name="person-circle-outline"
            style={styles.profileIcon}
            size={44}
            color="#FFD700"
          />
        </TouchableOpacity>
        <Text style={styles.title}>Açık Vize Randevuları</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={appointments}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <VisaCard
            center={item.center}
            countryCode={item.countryCode}
            missionCode={item.missionCode}
            visaType={item.visaType}
            visaCategory={item.visaCategory}
            lastAvailableDate={item.lastAvailableDate}
            lastOpenAt={item.lastOpenAt}
          />
        )}
        onEndReached={fetchAppointments}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator color="#fff" /> : null
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Icon
                name="notifications-outline"
                size={48}
                color="#fff"
                style={styles.bellIcon}
              />
              <Text style={styles.emptyText}>
                İstediğiniz vize tipi şu anda açık değil.
              </Text>
              <Text style={styles.subText}>
                Dilerseniz bildirim oluşturabilir, açıldığında size haber
                verebiliriz.
              </Text>
              <TouchableOpacity
                style={styles.notifyButton}
                onPress={() => {
                  if (!isLoggedIn) {
                    navigation.navigate('Start');
                  } else {
                    navigation.navigate('CreateNotificationScreen');
                  }
                }}
              >
                <Text style={styles.notifyButtonText}>Bildirim Oluştur</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
      <TouchableOpacity
        style={styles.floatingFilterButton}
        onPress={() => setShowFilter(true)}
      >
        <Icon name="filter-outline" size={26} color="#fff" />
      </TouchableOpacity>

      <Modal visible={showFilter} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setShowFilter(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.modalContent}
              >
                <Text style={styles.modalTitle}>Filtrele</Text>

               <View style={styles.pickerContainer}>
                         <Picker
                           selectedValue={countryCode}
                           onValueChange={setCountryCode}
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
                           selectedValue={missionCode}
                           onValueChange={setMissionCode}
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

                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={applyFilters}
                >
                  <Text style={styles.applyButtonText}>Sonuçları Göster</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(39,123,234)',
    paddingHorizontal: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  iconImage: {
    width: width,
    height: height / 4,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  profileIconOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  filterButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  filterButtonText: {
    color: '#3a7bd5',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
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
  applyButton: {
    backgroundColor: '#3a7bd5',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  bellIcon: {
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  notifyButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  notifyButtonText: {
    color: '#3a7bd5',
    fontWeight: 'bold',
  },
  floatingFilterButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3a7bd5',
    padding: 16,
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    marginTop: 30,
  },
});
