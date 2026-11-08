
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const C = {
  bg: '#FFF8F8',
  primary: '#D9A7C7',
  secondary: '#F3D9E7',
  text: '#4A4145',
  white: '#FFFFFF',
  grey: '#888888',
};

export default function BookingReceiptScreen({ navigation, route }) {
  const b = route.params || {};
  const cancelled = b.bookingStatus === 'Cancelled';

  const Row = ({ label, value }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{String(value ?? '-')}</Text>
    </View>
  );

  if (!b.bookingNumber) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.missing}>
          <Text style={styles.title}>Booking receipt not found</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('BookingHistory')}
          >
            <Text style={styles.buttonText}>Booking History</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.receipt}>
          <Image
            source={require('../../assets/images/neko_suki_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.brand}>Neko Suki Cat Spa</Text>

          <MaterialIcons
            name={cancelled ? 'cancel' : 'check-circle'}
            size={65}
            color={cancelled ? '#C35F6C' : C.primary}
            style={{ marginTop: 20 }}
          />

          <Text style={styles.title}>
            {cancelled ? 'Booking Cancelled' : 'Booking Confirmed!'}
          </Text>

          <Text style={styles.subtitle}>
            {cancelled
              ? 'This booking has been cancelled.'
              : 'Thank you for choosing Neko Suki!'}
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {b.status || 'Pending Payment'}
              {b.isDemoPayment ? ' · DEMO' : ''}
            </Text>
          </View>

          <View style={styles.divider} />

          <Row label="Booking Number" value={b.bookingNumber} />
          <Row label="Cat Name" value={b.catName} />
          <Row label="Booking Date" value={b.bookingDate} />
          <Row label="Booking Time" value={b.bookingTime} />

          <View style={styles.divider} />

          <Row
            label="Grooming"
            value={b.groomingPackage || 'None'}
          />
          <Row
            label="Grooming Price"
            value={`RM ${Number(b.groomingPrice || 0).toFixed(2)}`}
          />
          <Row
            label="Boarding"
            value={b.boardingDetails || 'No boarding'}
          />
          <Row
            label="Boarding Price"
            value={`RM ${Number(b.boardingPrice || 0).toFixed(2)}`}
          />

          <View style={styles.divider} />

          <Row label="Payment Method" value={b.paymentMethod} />
          {Boolean(b.bank) && (
            <Row label="Bank" value={b.bank} />
          )}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.total}>
              RM {Number(b.total || 0).toFixed(2)}
            </Text>
          </View>

          <Text style={styles.notice}>
            Demonstration receipt only. No actual bank payment was processed.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BookingHistory')}
        >
          <MaterialIcons name="history" size={20} color={C.white} />
          <Text style={styles.buttonText}>View Booking History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => navigation.popTo('Home')}
        >
          <Text style={styles.outlineText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  content: { padding: 20, paddingBottom: 45 },
  receipt: {
    backgroundColor: C.white, borderRadius: 23,
    padding: 22, alignItems: 'center',
  },
  logo: { width: 100, height: 100 },
  brand: {
    fontSize: 23, fontWeight: 'bold',
    color: C.text, marginTop: 7,
  },
  title: {
    fontSize: 22, fontWeight: 'bold',
    color: C.text, marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13, color: C.grey,
    marginTop: 8, textAlign: 'center',
  },
  badge: {
    backgroundColor: C.secondary, borderRadius: 20,
    paddingHorizontal: 17, paddingVertical: 9, marginTop: 17,
  },
  badgeText: {
    color: C.text, fontSize: 12, fontWeight: 'bold',
  },
  divider: {
    height: 1, width: '100%',
    backgroundColor: '#F3E7EF', marginVertical: 20,
  },
  row: {
    width: '100%', flexDirection: 'row',
    justifyContent: 'space-between', marginBottom: 14, gap: 12,
  },
  label: { color: C.grey, fontSize: 12, flex: 1 },
  value: {
    color: C.text, fontSize: 13,
    fontWeight: '600', textAlign: 'right', flex: 1.3,
  },
  totalRow: {
    width: '100%', flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16, fontWeight: 'bold', color: C.text,
  },
  total: {
    fontSize: 22, fontWeight: 'bold', color: C.primary,
  },
  notice: {
    fontSize: 11, color: C.grey,
    textAlign: 'center', marginTop: 23, lineHeight: 18,
  },
  button: {
    backgroundColor: C.primary, borderRadius: 15,
    padding: 17, marginTop: 20,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 10,
  },
  buttonText: { color: C.white, fontWeight: 'bold' },
  outlineButton: {
    borderRadius: 15, borderWidth: 1.5,
    borderColor: C.primary, padding: 17,
    alignItems: 'center', marginTop: 12,
  },
  outlineText: { color: C.primary, fontWeight: 'bold' },
  missing: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    padding: 20,
  },
});
