import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function NotificationCard({ from, to, date, status }) {
  const isDelivered = status === 'delivered';

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Icon name="airplane-outline" size={20} color="#3a7bd5" />
        <Text style={styles.label}> {from} ➝ {to}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="time-outline" size={18} color="#888" />
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.row}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: isDelivered ? 'green' : 'red' },
          ]}
        />
        <Text style={[styles.statusText, { color: isDelivered ? 'green' : 'red' }]}>
          {isDelivered ? 'Bildirim geldi' : 'Bekleniyor'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
