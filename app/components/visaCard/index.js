import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const VisaCard = ({ center, status, countryCode, missionCode, visaType, visaCategory }) => {

    console.log(status)
    const getStatusColor =(status) => {
         return status === 'open' ? 'green' : 'red';

    }
    return (
        <View style={[style.card, {borderLeftColor: getStatusColor(status)}]}>
            <Text>{center}</Text>
            <Text>Durum: {status}</Text>
            <Text>Vize Tipi: {visaType}</Text>
            <Text>Vize Category: {visaCategory}</Text>
            <Text>Başvuru Yapılan Ülke: {countryCode}</Text>
            <Text>Başvuru Lokasyonu: {missionCode}</Text>
        </View>
    );
};


VisaCard.propTypes = {
    center: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    visaType: PropTypes.string.isRequired,
    lastAvailableDate: PropTypes.string,
    lastOpenAt: PropTypes.string,
    countryCode: PropTypes.string.isRequired,
    missionCode: PropTypes.string.isRequired,
};

const style = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        borderLeftWidth: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 4,
    }
});

export default VisaCard;



















// const VisaCard = ({ center, status, countryCode, missionCode, visaType, lastAvailableDate, lastOpenAt }) => {
//   const getStatusColor = () => {
//     return status === 'open' ? '#4CAF50' : '#F44336';
//   };

//   console.log("Gelen kodlar", countryCode, missionCode);
//   const getCountryName = (code) => {
//     const countryMap = {
//       tur: "Türkiye",
//       hun: "Macaristan",
//       swe: "İsveç",
//       nor: "Norveç",
//       egy: "Mısır",
//     };
//     return countryMap[code?.toLowerCase()] || code?.toUpperCase();
//   };

//   return (
//     <View style={[styles.card, { borderLeftColor: getStatusColor() }]}>
//       <Text style={styles.center}>{center}</Text>
//       <Text style={styles.status}>
//         Durum: <Text style={{ color: getStatusColor() }}>{status.toUpperCase()}</Text>
//       </Text>
//       <Text style={styles.type}>Vize Tipi: {visaType}</Text>
//       <Text style={styles.type}>Başvuru Lokasyonu: {getCountryName(countryCode)}</Text>
//       <Text style={styles.type}>Başvuru Yapılan Ülke: {getCountryName(missionCode)}</Text>
//       {lastAvailableDate && <Text style={styles.date}>Müsait Tarih: {lastAvailableDate}</Text>}
//       {lastOpenAt && (
//         <Text style={styles.date}>Son Açık: {new Date(lastOpenAt).toLocaleDateString()}</Text>
//       )}
//     </View>
//   );
// };
// VisaCard.propTypes = {
//  center: PropTypes.string.isRequired,
//   status: PropTypes.string.isRequired,
//   visaType: PropTypes.string.isRequired,
//   lastAvailableDate: PropTypes.string,
//   lastOpenAt: PropTypes.string,
//   countryCode: PropTypes.string.isRequired,
//   missionCode: PropTypes.string.isRequired,
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginVertical: 8,
//     marginHorizontal: 12,
//     borderLeftWidth: 6,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   center: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   status: {
//     marginTop: 4,
//     fontSize: 14,
//   },
//   type: {
//     marginTop: 4,
//     fontSize: 14,
//     fontStyle: 'italic',
//   },
//   date: {
//     marginTop: 4,
//     fontSize: 14,
//   },
// });

// export default VisaCard;