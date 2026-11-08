
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const C = {
  background: '#FFF8F8',
  primary: '#D9A7C7',
  secondary: '#F3D9E7',
  text: '#4A4145',
  white: '#FFFFFF',
  grey: '#888888',
};

const logo = require('../../assets/images/neko_suki_logo.png');

export default function HomeScreen({ navigation }) {
  const go = (screen) => navigation.navigate(screen);

  const ServiceCard = ({ icon, title, screen }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => go(screen)}
      activeOpacity={0.8}
    >
      <MaterialIcons
        name={icon}
        size={32}
        color={C.primary}
      />
      <Text style={styles.serviceText}>{title}</Text>
    </TouchableOpacity>
  );

  const NavItem = ({ icon, label, screen, active }) => (
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => screen && go(screen)}
    >
      <MaterialIcons
        name={icon}
        size={25}
        color={active ? C.primary : C.grey}
      />
      <Text style={[
        styles.navText,
        { color: active ? C.primary : C.grey }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting} numberOfLines={1}>
              Hello, Cat Lover! 👋
            </Text>
            <Text style={styles.subtitle}>
              Welcome to Neko Suki
            </Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => go('BookingHistory')}
              style={styles.calendarButton}
            >
              <MaterialIcons
                name="calendar-month"
                size={26}
                color={C.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.avatar}
              onPress={() => go('Profile')}
            >
              <MaterialIcons
                name="person"
                size={27}
                color={C.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* HERO BANNER */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerSmall}>
              Give your cat
            </Text>
            <Text style={styles.bannerTitle}>
              the best care!
            </Text>

            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => go('Grooming')}
            >
              <Text style={styles.bookButtonText}>
                Book Now
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={logo}
            style={styles.bannerLogo}
            resizeMode="contain"
          />
        </View>

        {/* SERVICES */}
        <Text style={styles.sectionTitle}>
          Our Services
        </Text>

        <View style={styles.servicesRow}>
          <ServiceCard
            icon="content-cut"
            title="Grooming"
            screen="Grooming"
          />
          <ServiceCard
            icon="hotel"
            title="Cat Hotel"
            screen="Boarding"
          />
          <ServiceCard
            icon="shopping-bag"
            title="Shop"
            screen="Shop"
          />
        </View>

        {/* UPCOMING BOOKING */}
        <Text style={styles.sectionTitle}>
          Upcoming Booking
        </Text>

        <View style={styles.bookingCard}>
          <MaterialIcons
            name="pets"
            size={32}
            color={C.primary}
          />

          <Text style={styles.bookingTitle}>
            A little pampering awaits!
          </Text>

          <Text style={styles.bookingDescription}>
            No upcoming booking. Plan your cat's next visit.
          </Text>

          <TouchableOpacity
            style={styles.bookingButton}
            onPress={() => go('Grooming')}
          >
            <Text style={styles.bookingButtonText}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>

        {/* RECOMMENDED */}
        <Text style={styles.sectionTitle}>
          Recommended for Your Cat
        </Text>

        <TouchableOpacity
          style={styles.recommendedCard}
          onPress={() => go('Grooming')}
        >
          <MaterialIcons
            name="spa"
            size={40}
            color={C.primary}
          />

          <View style={styles.recommendedText}>
            <Text style={styles.recommendedTitle}>
              Grooming Package
            </Text>
            <Text style={styles.recommendedDescription}>
              Take care of your lovely cat with Neko Suki.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <NavItem
          icon="home"
          label="Home"
          active
        />
        <NavItem
          icon="content-cut"
          label="Grooming"
          screen="Grooming"
        />
        <NavItem
          icon="hotel"
          label="Boarding"
          screen="Boarding"
        />
        <NavItem
          icon="shopping-bag"
          label="Shop"
          screen="Shop"
        />
        <NavItem
          icon="person-outline"
          label="Profile"
          screen="Profile"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: C.text,
  },
  subtitle: {
    fontSize: 14,
    color: C.grey,
    marginTop: 5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarButton: {
    padding: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: C.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    marginTop: 25,
    height: 200,
    borderRadius: 25,
    backgroundColor: C.secondary,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bannerContent: {
    padding: 25,
    zIndex: 1,
    alignItems: 'flex-start',
  },
  bannerSmall: {
    fontSize: 16,
    color: C.text,
  },
  bannerTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: C.text,
  },
  bookButton: {
    marginTop: 15,
    backgroundColor: C.primary,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 14,
  },
  bookButtonText: {
    color: C.white,
    fontWeight: 'bold',
  },
  bannerLogo: {
    position: 'absolute',
    right: 8,
    width: 140,
    height: '100%',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: C.text,
    marginTop: 30,
    marginBottom: 15,
  },
  servicesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  serviceCard: {
    flex: 1,
    height: 115,
    backgroundColor: C.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceText: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: '600',
    color: C.text,
    textAlign: 'center',
  },
  bookingCard: {
    backgroundColor: C.white,
    padding: 20,
    borderRadius: 20,
  },
  bookingTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: C.text,
    marginTop: 12,
  },
  bookingDescription: {
    fontSize: 13,
    color: C.grey,
    marginTop: 6,
    lineHeight: 20,
  },
  bookingButton: {
    marginTop: 16,
    height: 46,
    borderRadius: 14,
    backgroundColor: C.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingButtonText: {
    fontWeight: 'bold',
    color: C.white,
  },
  recommendedCard: {
    backgroundColor: C.white,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendedText: {
    flex: 1,
    marginLeft: 15,
  },
  recommendedTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: C.text,
  },
  recommendedDescription: {
    fontSize: 12,
    color: C.grey,
    marginTop: 5,
    lineHeight: 18,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: C.white,
    paddingTop: 10,
    paddingBottom: 6,
    elevation: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#F4E9EF',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
  },
});
