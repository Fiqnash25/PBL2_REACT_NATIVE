
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Image, StyleSheet, StatusBar,
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

const featured = [
  {
    name: 'Lion Cut',
    price: 150,
    details: 'Shave, bath, nail and ears',
    image: require('../../assets/images/lion_cut.jpg'),
  },
  {
    name: 'Teddy Bear Cut',
    price: 230,
    details: 'Shave, bath, nail and ears',
    image: require('../../assets/images/teddy_bear_cut.jpg'),
  },
];

const packages = [
  ['Basic Grooming - Kitten', 50, 'Bath, blow dry, nail, ears and trim', 'pets'],
  ['Basic Grooming - Adult Short Hair', 60, 'Bath, blow dry, nail, ears and trim', 'pets'],
  ['Basic Grooming - Long Hair', 70, 'Bath, blow dry, nail, ears and trim', 'pets'],
  ['Basic Grooming - Double Coat', 80, 'For Persian, Maine Coon and similar coats', 'pets'],
  ['Special Grooming', 100, 'Basic grooming with extra care', 'auto-awesome'],
  ['Treatment Bath - Flea Treatment', 90, 'Flea treatment bath', 'bathtub'],
  ['Treatment Bath - Fungi & Flea', 100, 'Fungi and flea treatment bath', 'medical-services'],
  ['Advanced Grooming', 120, 'Advanced grooming treatment', 'star-outline'],
];

export default function GroomingScreen({ navigation }) {
  const [selected, setSelected] = useState({
    name: 'Basic Grooming - Kitten',
    price: 50,
  });

  const choose = (name, price) => setSelected({ name, price });

  const Radio = ({ active }) => (
    <MaterialIcons
      name={active ? 'radio-button-checked' : 'radio-button-unchecked'}
      size={23}
      color={C.primary}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grooming Package</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Choose a Spa Package</Text>
        <Text style={styles.subtitle}>
          Select the best grooming package for your cat.
        </Text>

        <Text style={styles.section}>Featured Styles</Text>

        <View style={styles.featuredRow}>
          {featured.map((item) => {
            const active = selected.name === item.name;
            return (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.featuredCard,
                  active && styles.selectedCard,
                ]}
                onPress={() => choose(item.name, item.price)}
                activeOpacity={0.8}
              >
                <Image
                  source={item.image}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
                <Text style={styles.featuredName}>{item.name}</Text>
                <Text style={styles.details}>{item.details}</Text>
                <View style={styles.featuredBottom}>
                  <Text style={styles.price}>RM{item.price}</Text>
                  <Radio active={active} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.section}>Other Packages</Text>

        {packages.map(([name, price, details, icon]) => {
          const active = selected.name === name;
          return (
            <TouchableOpacity
              key={name}
              style={[
                styles.packageCard,
                active && styles.selectedCard,
              ]}
              onPress={() => choose(name, price)}
              activeOpacity={0.8}
            >
              <View style={styles.packageIcon}>
                <MaterialIcons
                  name={icon}
                  size={23}
                  color={C.primary}
                />
              </View>

              <View style={styles.packageInfo}>
                <Text style={styles.packageName}>{name}</Text>
                <Text style={styles.details}>{details}</Text>
              </View>

              <View style={styles.packageRight}>
                <Text style={styles.price}>RM{price}</Text>
                <Radio active={active} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('AlaCarte', {
            groomingPackage: selected.name,
            groomingPrice: selected.price,
          })}
        >
          <Text style={styles.continueText}>
            Continue • RM {selected.price.toFixed(2)}
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
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', color: C.text },
  subtitle: { fontSize: 14, color: C.grey, marginTop: 6 },
  section: {
    fontSize: 20, fontWeight: 'bold',
    color: C.text, marginTop: 20, marginBottom: 12,
  },
  featuredRow: { flexDirection: 'row', gap: 12 },
  featuredCard: {
    flex: 1, backgroundColor: C.white,
    borderRadius: 18, padding: 12,
    borderWidth: 2, borderColor: 'transparent',
  },
  selectedCard: {
    backgroundColor: C.secondary,
    borderColor: C.primary,
  },
  featuredImage: {
    width: '100%', height: 115, borderRadius: 12,
  },
  featuredName: {
    fontSize: 17, fontWeight: 'bold',
    color: C.text, marginTop: 10,
  },
  details: {
    fontSize: 12, color: C.grey,
    marginTop: 5, lineHeight: 17,
  },
  featuredBottom: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 14,
  },
  price: { fontSize: 16, fontWeight: 'bold', color: C.primary },
  packageCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: 18,
    padding: 14, marginBottom: 10,
    borderWidth: 2, borderColor: 'transparent',
  },
  packageIcon: {
    width: 43, height: 43, borderRadius: 12,
    backgroundColor: C.secondary,
    alignItems: 'center', justifyContent: 'center',
  },
  packageInfo: { flex: 1, marginLeft: 12 },
  packageName: {
    fontSize: 14, fontWeight: 'bold', color: C.text,
  },
  packageRight: {
    alignItems: 'flex-end', marginLeft: 8, gap: 7,
  },
  footer: {
    padding: 15, backgroundColor: C.bg,
  },
  continueButton: {
    height: 55, borderRadius: 17,
    backgroundColor: C.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  continueText: {
    fontSize: 16, fontWeight: 'bold', color: C.white,
  },
});
