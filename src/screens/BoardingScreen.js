
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar,
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

const packages = [
  { name: 'No Boarding', rate: 0, detail: 'Continue with grooming only', icon: 'close' },
  { name: 'Standard (1 Cat)', rate: 25, detail: 'RM25 per night', icon: 'hotel' },
  { name: 'Standard (2 Cats)', rate: 45, detail: 'RM45 per night', icon: 'hotel' },
  { name: 'Deluxe (1 Cat)', rate: 35, detail: 'RM35 per night', icon: 'king-bed' },
  { name: 'Deluxe (2 Cats)', rate: 65, detail: 'RM65 per night', icon: 'king-bed' },
  { name: 'Suite (1 Cat)', rate: 50, detail: 'RM50 per night', icon: 'hotel-class' },
  { name: 'Suite (2 Cats)', rate: 95, detail: 'RM95 per night', icon: 'hotel-class' },
  { name: 'Suite (3 Cats)', rate: 125, detail: 'RM125 per night', icon: 'hotel-class' },
  { name: 'Day Care (1 Cat)', rate: 15, detail: '10 AM - 7 PM', icon: 'wb-sunny' },
];

export default function BoardingScreen({ navigation, route }) {
  const groomingPackage = route.params?.groomingPackage ?? 'Basic Grooming';
  const groomingPrice = Number(route.params?.groomingPrice ?? 50);

  const [selected, setSelected] = useState('No Boarding');
  const [nights, setNights] = useState(1);

  const current = packages.find(p => p.name === selected);
  const overnight = selected !== 'No Boarding' && selected !== 'Day Care (1 Cat)';
  const boardingPrice = current.rate * (overnight ? nights : 1);

  const boardingDetails = selected === 'No Boarding'
    ? 'No boarding'
    : overnight
      ? `${selected} • ${nights} night(s)`
      : selected;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Boarding Package</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.hero}>
          <MaterialIcons name="hotel" size={70} color={C.primary} />
        </View>

        <Text style={styles.heading}>Add Cat Boarding</Text>
        <Text style={styles.subtitle}>
          Choose a boarding package or continue without boarding.
        </Text>

        <ScrollView
          style={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {packages.map(item => {
            const active = selected === item.name;
            return (
              <TouchableOpacity
                key={item.name}
                activeOpacity={0.8}
                style={[styles.card, active && styles.activeCard]}
                onPress={() => {
                  setSelected(item.name);
                  setNights(1);
                }}
              >
                <MaterialIcons
                  name={item.icon}
                  size={26}
                  color={C.primary}
                />

                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardSubtitle}>{item.detail}</Text>
                </View>

                <Text style={styles.price}>RM{item.rate}</Text>

                <MaterialIcons
                  name={active ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={22}
                  color={C.primary}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {overnight && (
          <View style={styles.nightsCard}>
            <Text style={styles.nightsLabel}>Number of Nights</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={() => setNights(n => Math.max(1, n - 1))}
                style={styles.counterButton}
              >
                <MaterialIcons name="remove" size={21} color={C.primary} />
              </TouchableOpacity>

              <Text style={styles.nightsNumber}>{nights}</Text>

              <TouchableOpacity
                onPress={() => setNights(n => Math.min(30, n + 1))}
                style={styles.counterButton}
              >
                <MaterialIcons name="add" size={21} color={C.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('BookingConfirm', {
            groomingPackage,
            groomingPrice,
            boardingDetails,
            boardingPrice,
          })}
        >
          <Text style={styles.continueText}>
            {selected === 'No Boarding'
              ? 'Continue'
              : `Continue • RM ${boardingPrice.toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    height: 55, flexDirection: 'row',
    alignItems: 'center', gap: 15, paddingHorizontal: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: C.text },
  content: { flex: 1, paddingHorizontal: 20, paddingBottom: 12 },
  hero: {
    height: 130, backgroundColor: C.secondary,
    borderRadius: 25, justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24, fontWeight: 'bold',
    color: C.text, marginTop: 20,
  },
  subtitle: {
    fontSize: 14, color: C.grey,
    marginTop: 6, marginBottom: 15,
    lineHeight: 20,
  },
  list: { flex: 1 },
  card: {
    backgroundColor: C.white, padding: 14,
    borderRadius: 18, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 2, borderColor: 'transparent',
    gap: 10,
  },
  activeCard: {
    backgroundColor: C.secondary,
    borderColor: C.primary,
  },
  cardInfo: { flex: 1 },
  cardTitle: {
    fontSize: 14, fontWeight: 'bold', color: C.text,
  },
  cardSubtitle: {
    fontSize: 12, color: C.grey, marginTop: 4,
  },
  price: {
    color: C.primary, fontWeight: 'bold', fontSize: 14,
  },
  nightsCard: {
    backgroundColor: C.white, padding: 13,
    borderRadius: 15, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
    marginTop: 10,
  },
  nightsLabel: { fontWeight: '600', color: C.text },
  counter: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  counterButton: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: C.secondary,
    alignItems: 'center', justifyContent: 'center',
  },
  nightsNumber: { fontSize: 17, fontWeight: 'bold', color: C.text },
  continueButton: {
    backgroundColor: C.primary, height: 55,
    borderRadius: 17, alignItems: 'center',
    justifyContent: 'center', marginTop: 12,
  },
  continueText: {
    color: C.white, fontSize: 16, fontWeight: 'bold',
  },
});
