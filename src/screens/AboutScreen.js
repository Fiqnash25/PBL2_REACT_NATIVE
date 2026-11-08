
import React from 'react';
import {
  View, Text, Image, ScrollView,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const C = {
  bg: '#FFF8F8', primary: '#D9A7C7',
  secondary: '#F3D9E7', text: '#4A4145',
  white: '#FFFFFF', grey: '#888888',
};

const services = [
  {
    icon: 'content-cut',
    title: 'Cat Grooming',
    description: 'Grooming packages and special care for your cats.',
  },
  {
    icon: 'hotel',
    title: 'Cat Boarding',
    description: 'Comfortable boarding options for your furry friends.',
  },
  {
    icon: 'shopping-bag',
    title: 'Cat Shop',
    description: 'Food, toys, cat litter and other essentials.',
  },
];

export default function AboutScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Image
            source={require('../../assets/images/neko_suki_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brand}>Neko Suki Cat Spa</Text>
          <Text style={styles.tagline}>
            A Little Love for Every Paw 🐾
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Welcome to Neko Suki</Text>

        <View style={styles.card}>
          <Text style={styles.paragraph}>
            Neko Suki Cat Spa is a cat-focused grooming,
            boarding and shopping experience designed
            to make caring for your beloved cats easier
            and more convenient.
          </Text>
          <Text style={styles.paragraph}>
            Our mobile application allows cat lovers to
            explore grooming packages, arrange boarding,
            manage their cats and shop for cat essentials
            in one place.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Our Services</Text>

        {services.map(service => (
          <View key={service.title} style={styles.serviceCard}>
            <View style={styles.iconBox}>
              <MaterialIcons
                name={service.icon}
                size={28}
                color={C.primary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceText}>
                {service.description}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.footerCard}>
          <MaterialIcons name="favorite" size={27} color={C.primary} />
          <Text style={styles.footerText}>
            Because every cat deserves love and care.
          </Text>
        </View>

        <Text style={styles.version}>
          Neko Suki Cat Spa • React Native Demo
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    height: 58, paddingHorizontal: 20,
    flexDirection: 'row', alignItems: 'center', gap: 15,
  },
  headerTitle: { fontSize: 21, fontWeight: 'bold', color: C.text },
  content: { padding: 20, paddingBottom: 45 },
  hero: {
    backgroundColor: C.secondary, borderRadius: 24,
    padding: 25, alignItems: 'center',
  },
  logo: { width: 145, height: 145 },
  brand: {
    fontSize: 25, fontWeight: 'bold',
    color: C.text, marginTop: 10,
  },
  tagline: { fontSize: 13, color: C.grey, marginTop: 8 },
  sectionTitle: {
    fontSize: 20, fontWeight: 'bold',
    color: C.text, marginTop: 28, marginBottom: 14,
  },
  card: {
    backgroundColor: C.white, borderRadius: 18, padding: 20,
  },
  paragraph: {
    color: C.text, fontSize: 14,
    lineHeight: 24, marginBottom: 12,
  },
  serviceCard: {
    backgroundColor: C.white, borderRadius: 17,
    padding: 16, flexDirection: 'row',
    alignItems: 'center', gap: 15, marginBottom: 12,
  },
  iconBox: {
    width: 58, height: 58, borderRadius: 17,
    backgroundColor: C.secondary,
    justifyContent: 'center', alignItems: 'center',
  },
  serviceTitle: { fontSize: 16, fontWeight: 'bold', color: C.text },
  serviceText: {
    fontSize: 12, color: C.grey,
    lineHeight: 19, marginTop: 5,
  },
  footerCard: {
    backgroundColor: C.secondary, borderRadius: 18,
    padding: 22, alignItems: 'center', marginTop: 20,
  },
  footerText: {
    fontSize: 14, color: C.text,
    fontWeight: '600', textAlign: 'center', marginTop: 10,
  },
  version: {
    textAlign: 'center', fontSize: 11,
    color: C.grey, marginTop: 25,
  },
});
