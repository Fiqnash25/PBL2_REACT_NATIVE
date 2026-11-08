
import React, { useState } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform,
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

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing Information', 'Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const result = await onLogin(email.trim(), password);
      if (!result.success) {
        Alert.alert('Login Failed', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/neko_suki_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brand}>Neko Suki Cat Spa</Text>
            <Text style={styles.subtitle}>
              Welcome back, Cat Lover! 🐾
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.heading}>Login</Text>
            <Text style={styles.description}>
              Sign in to continue caring for your furry friends.
            </Text>

            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={21} color={C.primary} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={C.grey}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={21} color={C.primary} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={C.grey}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={22}
                  color={C.grey}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Logging in...' : 'Login'}
              </Text>
              <MaterialIcons
                name="arrow-forward"
                size={20}
                color={C.white}
              />
            </TouchableOpacity>

            <View style={styles.registerRow}>
              <Text style={styles.registerText}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.registerLink}>Register Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.footer}>
            Made with love for every little paw 🐱
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  content: {
    flexGrow: 1,
    padding: 25,
    justifyContent: 'center',
  },
  logoContainer: { alignItems: 'center', marginBottom: 25 },
  logo: { width: 135, height: 135 },
  brand: {
    fontSize: 25,
    fontWeight: 'bold',
    color: C.text,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 14,
    color: C.grey,
    marginTop: 8,
  },
  form: {
    backgroundColor: C.white,
    borderRadius: 24,
    padding: 24,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: C.text,
  },
  description: {
    fontSize: 13,
    color: C.grey,
    marginTop: 8,
    lineHeight: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: C.text,
    marginTop: 15,
    marginBottom: 9,
  },
  inputContainer: {
    backgroundColor: C.bg,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    minHeight: 55,
    gap: 11,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: C.text,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: C.primary,
    borderRadius: 15,
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 30,
  },
  buttonText: {
    color: C.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    flexWrap: 'wrap',
  },
  registerText: { fontSize: 13, color: C.grey },
  registerLink: {
    fontSize: 13,
    color: C.primary,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: C.grey,
    marginTop: 30,
  },
});
