import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const VisaCard = ({ center,  countryCode, missionCode, visaType, visaCategory, lastAvailableDate }) => {
   

    return (
        <View style={styles.card}>
            <Text style={styles.centerText}>{center}</Text>

        

            <View style={styles.row}>
                <Text style={styles.label}>Vize Tipi: </Text>
                <Text style={styles.value}>{visaType}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Vize Kategorisi: </Text>
                <Text style={styles.value}>{visaCategory}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Başvuru Ülkesi: </Text>
                <Text style={styles.value}>{countryCode}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Lokasyon: </Text>
                <Text style={styles.value}>{missionCode}</Text>
            </View>

            {lastAvailableDate && (
                <View style={styles.row}>
                    <Text style={styles.label}>Müsait Tarih: </Text>
                    <Text style={styles.value}>{lastAvailableDate}</Text>
                </View>
            )}
        </View>
    );
};

VisaCard.propTypes = {
    center: PropTypes.string.isRequired,
    visaType: PropTypes.string.isRequired,
    visaCategory: PropTypes.string,
    lastAvailableDate: PropTypes.string,
    countryCode: PropTypes.string.isRequired,
    missionCode: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 5,
        borderColor: 'green',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 3,
    },
    centerText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2c3e50',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 4,
        flexWrap: 'wrap',
    },
    label: {
        fontWeight: '600',
        color: '#444',
    },
    value: {
        color: '#333',
        flexShrink: 1,
    },
});

export default VisaCard;
