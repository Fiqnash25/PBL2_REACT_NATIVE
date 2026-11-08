
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

export default function RegisterScreen({ navigation, onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password || !confirm) {
      Alert.alert('Missing Information', 'Please complete all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirm) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const result = await onRegister(
        name.trim(),
        email.trim(),
        password
      );

      if (!result.success) {
        Alert.alert('Registration Failed', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to register. Please try again.');
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
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={25} color={C.text} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/neko_suki_logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brand}>Join Neko Suki!</Text>
            <Text style={styles.subtitle}>
              Create an account for you and your cats 🐾
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.heading}>Create Account</Text>

            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={21} color={C.primary} />
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor={C.grey}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={21} color={C.primary} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={C.grey}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={21} color={C.primary} />
              <TextInput
                style={styles.input}
                placeholder="Minimum 6 characters"
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
                  size={21}
                  color={C.grey}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="verified-user" size={21} color={C.primary} />
              <TextInput
                style={styles.input}
                placeholder="Re-enter your password"
                placeholderTextColor={C.grey}
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Creating Account...' : 'Register'}
              </Text>
              <MaterialIcons name="arrow-forward" size={20} color={C.white} />
            </TouchableOpacity>

            <View style={styles.loginRow}>
              <Text style={styles.muted}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  content: { flexGrow: 1, padding: 24, paddingBottom: 40 },
  back: { alignSelf: 'flex-start', paddingVertical: 8 },
  logoContainer: { alignItems: 'center', marginBottom: 22 },
  logo: { width: 115, height: 115 },
  brand: {
    fontSize: 24, fontWeight: 'bold', color: C.text, marginTop: 5,
  },
  subtitle: {
    fontSize: 13, color: C.grey, textAlign: 'center', marginTop: 7,
  },
  form: {
    backgroundColor: C.white, borderRadius: 23, padding: 23,
  },
  heading: {
    fontSize: 23, fontWeight: 'bold', color: C.text, marginBottom: 12,
  },
  label: {
    fontSize: 13, fontWeight: '600',
    color: C.text, marginTop: 15, marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: C.bg, borderRadius: 13,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, gap: 10, minHeight: 54,
  },
  input: {
    flex: 1, fontSize: 14, color: C.text, paddingVertical: 12,
  },
  button: {
    backgroundColor: C.primary, borderRadius: 15,
    padding: 16, marginTop: 27,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 10,
  },
  buttonText: {
    color: C.white, fontWeight: 'bold', fontSize: 15,
  },
  loginRow: {
    flexDirection: 'row', justifyContent: 'center',
    flexWrap: 'wrap', marginTop: 23,
  },
  muted: { color: C.grey, fontSize: 13 },
  link: { color: C.primary, fontWeight: 'bold', fontSize: 13 },
});
