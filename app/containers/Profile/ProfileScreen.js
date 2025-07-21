import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationCard from '../../components/notificationCard/NotificationCard';
import { AuthContext } from '../Login/AuthContext';

export default function ProfileScreen({ navigation }) {
  const {
    logout,
    userNameAndSurname,
    userEmail,
    userCode
  } = useContext(AuthContext);

  const handleLogOut = async () => {
    await logout();
    navigation.navigate('HomeScreen');
  };

  const notifications = [
    {
      id: '1',
      from: 'Ankara',
      to: 'Paris',
      date: '2025-07-17 12:30',
      status: 'pending',
    },
    {
      id: '2',
      from: 'İstanbul',
      to: 'Berlin',
      date: '2025-07-16 09:45',
      status: 'delivered',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profilim</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Ad Soyad</Text>
        <Text style={styles.value}>{userNameAndSurname}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userEmail}</Text>

        <Text style={styles.label}>User Code</Text>
        <Text style={styles.value}>{userCode}</Text>
      </View>

      <Text style={styles.notificationText}>
        Oluşturulan Bildirimler{' '}
        <Icon name="notifications-outline" size={24} color="#fff" />
      </Text>

      <View style={styles.notificationsContainer}>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <NotificationCard
              from={item.from}
              to={item.to}
              date={item.date}
              status={item.status}
            />
          )}
        />
      </View>

      <TouchableOpacity style={styles.exitButton} onPress={handleLogOut}>
        <Text>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3a7bd5', padding: 24,paddingTop:50 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  label: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginBottom: 6,
  },
  exitButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    textAlign: 'center',
  },
  notificationsContainer: {
    marginTop: 10,
  },
});
