

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const TravelPlanCard = ({ destination, date, hotel, transportType, budget }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>📍 {destination}</Text>
      <Text style={styles.row}>🗓️ Tarih: {date}</Text>
      <Text style={styles.row}>🏨 Otel: {hotel}</Text>
      <Text style={styles.row}>✈️ Ulaşım: {transportType}</Text>
      <Text style={styles.row}>💰 Bütçe: {budget} ₺</Text>
    </View>
  );
};

TravelPlanCard.propTypes = {
  destination: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hotel: PropTypes.string,
  transportType: PropTypes.string,
  budget: PropTypes.number,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
    borderLeftWidth: 6,
    borderLeftColor: '#2196F3',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  row: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
});

export default TravelPlanCard;
