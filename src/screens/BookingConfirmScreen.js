
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet, Alert, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

const C = {
  bg: '#FFF8F8',
  primary: '#D9A7C7',
  secondary: '#F3D9E7',
  text: '#4A4145',
  white: '#FFFFFF',
  grey: '#888888',
};

export default function BookingConfirmScreen({ navigation, route }) {
  const {
    groomingPackage = 'Basic Grooming',
    groomingPrice = 50,
    boardingDetails = 'No boarding',
    boardingPrice = 0,
  } = route.params ?? {};

  const [catName, setCatName] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [picker, setPicker] = useState(null);

  const total = Number(groomingPrice) + Number(boardingPrice);

  const formatDate = d => d
    ? `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    : 'Tap to choose date';

  const formatTime = d => d
    ? d.toLocaleTimeString('en-MY', {
        hour: '2-digit', minute: '2-digit', hour12: true,
      })
    : 'Tap to choose time';

  const handlePicker = (event, value) => {
    if (Platform.OS === 'android') setPicker(null);
    if (event.type !== 'set' || !value) return;

    if (picker === 'date') {
      setDate(value);
    } else {
      setTime(value);
    }
  };

  const proceed = () => {
    if (!catName.trim()) {
      Alert.alert('Cat Required', 'Please enter your cat name.');
      return;
    }
    if (!date || !time) {
      Alert.alert('Date & Time Required', 'Please select a booking date and time.');
      return;
    }

    const appointment = new Date(
      date.getFullYear(), date.getMonth(), date.getDate(),
      time.getHours(), time.getMinutes()
    );

    if (appointment <= new Date()) {
      Alert.alert('Invalid Date', 'Please select a future appointment.');
      return;
    }

    navigation.navigate('BookingPayment', {
      catName: catName.trim(),
      groomingPackage,
      groomingPrice,
      boardingDetails,
      boardingPrice,
      bookingDate: formatDate(date),
      bookingTime: formatTime(time),
      total,
    });
  };

  const Field = ({ label, value, icon, onPress }) => (
    <TouchableOpacity style={styles.field} onPress={onPress}>
      <MaterialIcons name={icon} size={23} color={C.primary} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color={C.grey} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Confirmation</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <MaterialIcons name="pets" size={58} color={C.primary} />
          <Text style={styles.heroTitle}>Almost There!</Text>
          <Text style={styles.heroSubtitle}>
            Let's confirm your cat's appointment.
          </Text>
        </View>

        <Text style={styles.section}>Your Cat</Text>
        <View style={styles.field}>
          <MaterialIcons name="pets" size={23} color={C.primary} />
          <TextInput
            style={styles.input}
            placeholder="Enter your cat's name"
            placeholderTextColor="#999999"
            value={catName}
            onChangeText={setCatName}
            maxLength={60}
          />
        </View>

        <Text style={styles.section}>Appointment Details</Text>

        <Field
          label="Booking Date"
          value={formatDate(date)}
          icon="calendar-month"
          onPress={() => setPicker('date')}
        />

        <Field
          label="Booking Time"
          value={formatTime(time)}
          icon="access-time"
          onPress={() => setPicker('time')}
        />

        {picker && (
          <DateTimePicker
            value={
              picker === 'date'
                ? (date || new Date())
                : (time || new Date())
            }
            mode={picker}
            display="default"
            minimumDate={picker === 'date' ? new Date() : undefined}
            onChange={handlePicker}
          />
        )}

        <Text style={styles.section}>Booking Summary</Text>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Grooming</Text>
          <Text style={styles.summaryDescription}>{groomingPackage}</Text>
          <Text style={styles.summaryPrice}>
            RM {Number(groomingPrice).toFixed(2)}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.summaryTitle}>Boarding</Text>
          <Text style={styles.summaryDescription}>{boardingDetails}</Text>
          <Text style={styles.summaryPrice}>
            RM {Number(boardingPrice).toFixed(2)}
          </Text>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalPrice}>RM {total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={proceed}>
          <Text style={styles.buttonText}>
            Proceed to Payment • RM {total.toFixed(2)}
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
  content: { padding: 20, paddingBottom: 30 },
  hero: {
    backgroundColor: C.secondary, borderRadius: 23,
    padding: 25, alignItems: 'center',
  },
  heroTitle: {
    fontSize: 23, fontWeight: 'bold',
    color: C.text, marginTop: 8,
  },
  heroSubtitle: {
    fontSize: 13, color: C.grey,
    marginTop: 5, textAlign: 'center',
  },
  section: {
    fontSize: 19, fontWeight: 'bold',
    color: C.text, marginTop: 25, marginBottom: 12,
  },
  field: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.white, borderRadius: 16,
    padding: 17, marginBottom: 10,
  },
  input: {
    flex: 1, marginLeft: 12,
    fontSize: 15, color: C.text,
  },
  fieldLabel: { fontSize: 12, color: C.grey },
  fieldValue: {
    fontSize: 15, fontWeight: '600',
    color: C.text, marginTop: 5,
  },
  summary: {
    backgroundColor: C.white,
    borderRadius: 18, padding: 20,
  },
  summaryTitle: {
    fontSize: 15, fontWeight: 'bold', color: C.text,
  },
  summaryDescription: {
    fontSize: 13, color: C.grey,
    marginTop: 5, lineHeight: 20,
  },
  summaryPrice: {
    color: C.primary, fontWeight: 'bold',
    marginTop: 8, textAlign: 'right',
  },
  divider: {
    height: 1, backgroundColor: '#F3E7EF',
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 17, fontWeight: 'bold', color: C.text,
  },
  totalPrice: {
    fontSize: 20, fontWeight: 'bold', color: C.primary,
  },
  footer: { padding: 15, backgroundColor: C.bg },
  button: {
    backgroundColor: C.primary, height: 55,
    borderRadius: 17, justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: C.white, fontSize: 15, fontWeight: 'bold',
  },
});
