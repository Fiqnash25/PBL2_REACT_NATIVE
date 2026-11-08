
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert,
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

const menu = [
  { icon: 'pets', title: 'My Cats', screen: 'MyCats' },
  { icon: 'event-note', title: 'Booking History', screen: 'BookingHistory' },
  { icon: 'shopping-bag', title: 'Order History', screen: 'OrderHistory' },
  { icon: 'info-outline', title: 'About Neko Suki', screen: 'About' },
];

export default function ProfileScreen({ navigation, user, onLogout }) {
  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await onLogout();
            } catch (error) {
              Alert.alert('Error', 'Unable to log out. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={55} color={C.primary} />
          </View>

          <Text style={styles.name}>{user?.name || 'Cat Lover'}</Text>
          <Text style={styles.email}>{user?.email || ''}</Text>

          <View style={styles.welcomeBadge}>
            <MaterialIcons name="favorite" size={15} color={C.primary} />
            <Text style={styles.welcomeText}>Neko Suki Cat Lover</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>My Account</Text>

        <View style={styles.menuCard}>
          {menu.map((item, index) => (
            <TouchableOpacity
              key={item.screen}
              style={[
                styles.menuRow,
                index < menu.length - 1 && styles.borderBottom,
              ]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.iconBox}>
                <MaterialIcons
                  name={item.icon}
                  size={23}
                  color={C.primary}
                />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <MaterialIcons
                name="chevron-right"
                size={25}
                color={C.grey}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <MaterialIcons name="logout" size={22} color="#D77B87" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Made with love for every little paw 🐾
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 15,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: C.text,
  },
  content: {
    padding: 20,
    paddingBottom: 45,
  },
  profileCard: {
    backgroundColor: C.secondary,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: C.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 23,
    fontWeight: 'bold',
    color: C.text,
    marginTop: 17,
  },
  email: {
    fontSize: 13,
    color: C.grey,
    marginTop: 6,
  },
  welcomeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: C.white,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    marginTop: 17,
  },
  welcomeText: {
    color: C.text,
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: C.text,
    marginTop: 30,
    marginBottom: 15,
  },
  menuCard: {
    backgroundColor: C.white,
    borderRadius: 18,
    paddingHorizontal: 15,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 14,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F4E9EE',
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: C.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: C.text,
  },
  logoutButton: {
    backgroundColor: C.white,
    borderRadius: 15,
    padding: 18,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D77B87',
  },
  footer: {
    textAlign: 'center',
    color: C.grey,
    fontSize: 12,
    marginTop: 30,
  },
});
