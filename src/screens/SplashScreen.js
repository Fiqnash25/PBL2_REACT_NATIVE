
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../theme/colors';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.cat}>🐱</Text>
      <Text style={styles.title}>NEKO SUKI</Text>
      <Text style={styles.subtitle}>CAT SPA & HOTEL</Text>
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{ marginTop: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cat: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 15,
    color: colors.text,
    letterSpacing: 2,
    marginTop: 8,
  },
});

