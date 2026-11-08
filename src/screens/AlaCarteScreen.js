
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet,
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

const services = [
  ['Degreasing', 35],
  ['Brightening / Whitening', 35],
  ['Nail + Ears', 20],
  ['Shave', 110],
  ['Sanitary', 10],
  ['Urine Package', 100],
  ['Water Package', 270],
  ['Intensive Package', 350],
  ['Send to Vet', 30],
];

export default function AlaCarteScreen({ navigation, route }) {
  const { groomingPackage, groomingPrice } = route.params;
  const [selected, setSelected] = useState([]);

  const toggle = (name) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((x) => x !== name)
        : [...prev, name]
    );
  };

  const addOnTotal = services.reduce(
    (sum, [name, price]) =>
      sum + (selected.includes(name) ? price : 0),
    0
  );

  const total = groomingPrice + addOnTotal;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add-on Services</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        <Text style={styles.heading}>A La Carte Services</Text>
        <Text style={styles.subtitle}>
          Optional services for your cat.
        </Text>

        {services.map(([name, price]) => {
          const active = selected.includes(name);
          return (
            <TouchableOpacity
              key={name}
              style={[styles.card, active && styles.activeCard]}
              onPress={() => toggle(name)}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>RM{price}</Text>
              </View>
              <MaterialIcons
                name={active ? 'check-box' : 'check-box-outline-blank'}
                size={27}
                color={C.primary}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={{ color: C.grey }}>Add-on Total</Text>
          <Text style={styles.totalPrice}>
            RM {addOnTotal.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Boarding', {
            groomingPackage: selected.length
              ? `${groomingPackage} + ${selected.join(', ')}`
              : groomingPackage,
            groomingPrice: total,
          })}
        >
          <Text style={styles.buttonText}>
            Continue • RM {total.toFixed(2)}
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
    alignItems: 'center', paddingHorizontal: 20, gap: 15,
  },
  headerTitle: {
    fontSize: 20, fontWeight: 'bold', color: C.text,
  },
  heading: {
    fontSize: 24, fontWeight: 'bold', color: C.text,
  },
  subtitle: {
    fontSize: 14, color: C.grey,
    marginTop: 6, marginBottom: 20,
  },
  card: {
    backgroundColor: C.white, borderRadius: 17,
    padding: 18, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 2, borderColor: 'transparent',
  },
  activeCard: {
    backgroundColor: C.secondary,
    borderColor: C.primary,
  },
  name: {
    fontSize: 16, fontWeight: '600', color: C.text,
  },
  price: {
    color: C.primary, fontWeight: 'bold', marginTop: 5,
  },
  footer: { padding: 15, backgroundColor: C.bg },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 17, backgroundColor: C.white,
    borderRadius: 16, marginBottom: 12,
  },
  totalPrice: {
    fontWeight: 'bold', color: C.primary,
  },
  button: {
    backgroundColor: C.primary, height: 55,
    borderRadius: 17, alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: C.white, fontSize: 16, fontWeight: 'bold',
  },
});
