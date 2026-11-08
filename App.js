
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, ActivityIndicator,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import GroomingScreen from './src/screens/GroomingScreen';
import AlaCarteScreen from './src/screens/AlaCarteScreen';
import BoardingScreen from './src/screens/BoardingScreen';
import BookingConfirmScreen from './src/screens/BookingConfirmScreen';
import BookingPaymentScreen from './src/screens/BookingPaymentScreen';
import BookingReceiptScreen from './src/screens/BookingReceiptScreen';

import ShopScreen from './src/screens/ShopScreen';
import CartScreen from './src/screens/CartScreen';
import ShopPaymentScreen from './src/screens/ShopPaymentScreen';
import ShopReceiptScreen from './src/screens/ShopReceiptScreen';

import ProfileScreen from './src/screens/ProfileScreen';
import MyCatsScreen from './src/screens/MyCatsScreen';
import BookingHistoryScreen from './src/screens/BookingHistoryScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import AboutScreen from './src/screens/AboutScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const C = {
  background: '#FFF8F8',
  primary: '#D9A7C7',
  secondary: '#F3D9E7',
  text: '#4A4145',
  white: '#FFFFFF',
  grey: '#888888',
};

const KEYS = {
  users: '@neko_demo_users',
  session: '@neko_demo_session',
  cats: '@neko_demo_cats_',
  orders: '@neko_demo_orders_',
  bookings: '@neko_demo_bookings_',
};

async function hashPassword(password, salt) {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${salt}:${password}`
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

  const [cart, setCart] = useState([]);
  const [cats, setCats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);

  const catsRef = useRef([]);
  const ordersRef = useRef([]);
  const bookingsRef = useRef([]);
  const userRef = useRef(null);
  const loadedUserIdRef = useRef(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const saved = await AsyncStorage.getItem(KEYS.session);

        if (saved) {
          const session = JSON.parse(saved);

          if (session?.id && session?.email) {
            userRef.current = session;
            setUser(session);
          }
        }
      } catch (error) {
        console.log('Session load error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  useEffect(() => {
    if (!user?.id) {
      loadedUserIdRef.current = null;
      catsRef.current = [];
      ordersRef.current = [];
      bookingsRef.current = [];
      setCats([]);
      setOrders([]);
      setBookings([]);
      setCart([]);
      setDataLoading(false);
      return;
    }

    let active = true;
    loadedUserIdRef.current = null;
    setDataLoading(true);

    const loadUserData = async () => {
      try {
        const values = await Promise.all([
          AsyncStorage.getItem(KEYS.cats + user.id),
          AsyncStorage.getItem(KEYS.orders + user.id),
          AsyncStorage.getItem(KEYS.bookings + user.id),
        ]);

        if (!active) return;

        const nextCats = values[0] ? JSON.parse(values[0]) : [];
        const nextOrders = values[1] ? JSON.parse(values[1]) : [];
        const nextBookings = values[2] ? JSON.parse(values[2]) : [];

        catsRef.current = nextCats;
        ordersRef.current = nextOrders;
        bookingsRef.current = nextBookings;

        setCats(nextCats);
        setOrders(nextOrders);
        setBookings(nextBookings);

        loadedUserIdRef.current = user.id;
      } catch (error) {
        console.log('User data load error:', error);
      } finally {
        if (active) setDataLoading(false);
      }
    };

    loadUserData();

    return () => {
      active = false;
    };
  }, [user?.id]);

  const saveCollection = async (type, updater) => {
    const activeUser = userRef.current;

    if (
      !activeUser?.id ||
      loadedUserIdRef.current !== activeUser.id
    ) {
      throw new Error('User data is not ready.');
    }

    const configs = {
      cats: {
        key: KEYS.cats,
        ref: catsRef,
        setter: setCats,
      },
      orders: {
        key: KEYS.orders,
        ref: ordersRef,
        setter: setOrders,
      },
      bookings: {
        key: KEYS.bookings,
        ref: bookingsRef,
        setter: setBookings,
      },
    };

    const config = configs[type];

    if (!config) throw new Error('Invalid collection.');

    const previous = config.ref.current;

    const next = typeof updater === 'function'
      ? updater(previous)
      : updater;

    // Save to storage first so failed writes do not
    // incorrectly appear as completed actions.
    await AsyncStorage.setItem(
      config.key + activeUser.id,
      JSON.stringify(next)
    );

    if (userRef.current?.id !== activeUser.id) {
      return;
    }

    config.ref.current = next;
    config.setter(next);
  };

  const saveCats = updater => saveCollection('cats', updater);
  const saveOrders = updater => saveCollection('orders', updater);

  const saveBooking = async booking => {
    if (!booking?.bookingNumber) {
      throw new Error('Missing booking number.');
    }

    await saveCollection('bookings', previous => {
      if (previous.some(b => b.id === booking.id)) {
        return previous;
      }

      return [booking, ...previous];
    });
  };

  const cancelBooking = async bookingId => {
    await saveCollection('bookings', previous =>
      previous.map(booking =>
        booking.id === bookingId &&
        booking.bookingStatus !== 'Cancelled'
          ? {
              ...booking,
              bookingStatus: 'Cancelled',
              cancelledAt: new Date().toISOString(),
            }
          : booking
      )
    );
  };

  const handleRegister = async (name, email, password) => {
    try {
      const normalizedEmail = email.trim().toLowerCase();

      const saved = await AsyncStorage.getItem(KEYS.users);
      const users = saved ? JSON.parse(saved) : [];

      if (users.some(u => u.email === normalizedEmail)) {
        return {
          success: false,
          message: 'This email is already registered.',
        };
      }

      const salt = Crypto.randomUUID();
      const passwordHash = await hashPassword(password, salt);

      const account = {
        id: Crypto.randomUUID(),
        name,
        email: normalizedEmail,
        salt,
        passwordHash,
      };

      await AsyncStorage.setItem(
        KEYS.users,
        JSON.stringify([...users, account])
      );

      const session = {
        id: account.id,
        name: account.name,
        email: account.email,
      };

      await AsyncStorage.setItem(
        KEYS.session,
        JSON.stringify(session)
      );

      userRef.current = session;
      setUser(session);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Unable to save account on this device.',
      };
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const saved = await AsyncStorage.getItem(KEYS.users);
      const users = saved ? JSON.parse(saved) : [];

      const account = users.find(
        u => u.email === email.trim().toLowerCase()
      );

      if (!account) {
        return {
          success: false,
          message: 'Email or password is incorrect.',
        };
      }

      const passwordHash = await hashPassword(
        password,
        account.salt
      );

      if (passwordHash !== account.passwordHash) {
        return {
          success: false,
          message: 'Email or password is incorrect.',
        };
      }

      const session = {
        id: account.id,
        name: account.name,
        email: account.email,
      };

      await AsyncStorage.setItem(
        KEYS.session,
        JSON.stringify(session)
      );

      userRef.current = session;
      setUser(session);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Unable to access local account data.',
      };
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(KEYS.session);

    userRef.current = null;
    loadedUserIdRef.current = null;

    setUser(null);
  };

  if (loading || (user && dataLoading)) {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={C.primary} />
          <Text style={styles.subtitle}>
            Loading Neko Suki...
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          key={user ? `user-${user.id}` : 'guest'}
          initialRouteName={user ? 'Splash' : 'Login'}
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          {user ? (
            <>
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
              />

              <Stack.Screen
                name="Home"
                component={HomeScreen}
              />

              <Stack.Screen
                name="Grooming"
                component={GroomingScreen}
              />

              <Stack.Screen
                name="AlaCarte"
                component={AlaCarteScreen}
              />

              <Stack.Screen
                name="Boarding"
                component={BoardingScreen}
              />

              <Stack.Screen
                name="BookingConfirm"
                component={BookingConfirmScreen}
              />

              <Stack.Screen name="BookingPayment">
                {props => (
                  <BookingPaymentScreen
                    {...props}
                    saveBooking={saveBooking}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen
                name="BookingReceipt"
                component={BookingReceiptScreen}
              />

              <Stack.Screen name="BookingHistory">
                {props => (
                  <BookingHistoryScreen
                    {...props}
                    bookings={bookings}
                    cancelBooking={cancelBooking}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="Shop">
                {props => (
                  <ShopScreen
                    {...props}
                    route={{
                      ...props.route,
                      params: {
                        ...props.route.params,
                        cart,
                        updateCart: setCart,
                      },
                    }}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="Cart">
                {props => (
                  <CartScreen
                    {...props}
                    route={{
                      ...props.route,
                      params: {
                        ...props.route.params,
                        cart,
                        updateCart: setCart,
                      },
                    }}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="ShopPayment">
                {props => (
                  <ShopPaymentScreen
                    {...props}
                    cart={cart}
                    setCart={setCart}
                    setOrders={saveOrders}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen
                name="ShopReceipt"
                component={ShopReceiptScreen}
              />

              <Stack.Screen name="Profile">
                {props => (
                  <ProfileScreen
                    {...props}
                    user={user}
                    onLogout={handleLogout}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="MyCats">
                {props => (
                  <MyCatsScreen
                    {...props}
                    cats={cats}
                    setCats={saveCats}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="OrderHistory">
                {props => (
                  <OrderHistoryScreen
                    {...props}
                    orders={orders}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen
                name="About"
                component={AboutScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Login">
                {props => (
                  <LoginScreen
                    {...props}
                    onLogin={handleLogin}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen name="Register">
                {props => (
                  <RegisterScreen
                    {...props}
                    onRegister={handleRegister}
                  />
                )}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  subtitle: {
    fontSize: 16,
    color: C.primary,
    marginTop: 8,
  },
});
