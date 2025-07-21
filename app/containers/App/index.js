import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Button
} from 'react-native';
import VisaCard from '../../components/visaCard';
import TravelPlanCard from '../../components/travelPlanCard';
import {notification} from '../notification'

const { width } = Dimensions.get('window');

const mockVisa = [
  {
    id: 31,
    center: 'Austria VAC in Baku',
    status: 'open',
    country_code: 'aze',
    mission_code: 'aut',
    visa_category: 'Short Stay',
    visa_type: 'Tourist',
    last_available_date: '15/08/2025',
    last_open_at: '2025-06-21T07:44:31Z',
  },
];

export default function Start() {
  return (
    <View style={styles.main}>
      {/* Üst karşılama alanı */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Hoş Geldin Ömer,</Text>
        <Text style={styles.welcomeSubtitle}>Ne yapmak istiyorsun?</Text>
      </View>

      {/* Küçük kartlar alanı */}
      <View style={styles.cardContainer}>
        <ImageBackground
          source={require('../../image/passportAndCalendar.png')}
          style={styles.box}
          imageStyle={styles.image}
        >
          <View style={styles.overlay}>
            <Text style={styles.boxText}>Vize Randevu</Text>
          </View>
        </ImageBackground>

        <ImageBackground
          source={require('../../image/travelRobot.png')}
          style={styles.box}
          imageStyle={styles.image}
        >
          <View style={styles.overlay}>
            <Text style={styles.boxText}>AI İle Tatil Planla</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Açık Randevu Kartı */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🟢 Açık Randevu</Text>
        <VisaCard
          center={mockVisa[0].center}
          countryCode={mockVisa[0].country_code}
          missionCode={mockVisa[0].mission_code}
          visaType={mockVisa[0].visa_type}
          visaCategory={mockVisa[0].visa_category}
        />
        <Button
  onPress={notification}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
      </View>

      {/* Tatil Kartı */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌴 Önerilen Tatil</Text>
        <TravelPlanCard
          destination="Antalya, Türkiye"
          date="10 - 15 Temmuz 2025"
          hotel="Sunset Resort"
          transportType="Uçak"
          budget={6500}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingBottom: 10,
  },
  welcomeContainer: {
    backgroundColor: '#4A90E2',
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Pacifico',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  box: {
    width: width * 0.48,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
});
