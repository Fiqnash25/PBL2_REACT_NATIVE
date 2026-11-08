
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator,
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

const banks = ['Maybank', 'CIMB Bank', 'Bank Islam', 'Public Bank'];

export default function BookingPaymentScreen({
  navigation,
  route,
  saveBooking,
}) {
  const booking = route.params || {};
  const total = Number(booking.total ?? 0);

  const [method, setMethod] = useState('Online Banking');
  const [bank, setBank] = useState('Maybank');
  const [showBanks, setShowBanks] = useState(false);
  const [processing, setProcessing] = useState(false);

  const completeBooking = async () => {
    if (processing) return;

    if (!booking.catName || !booking.bookingDate || !booking.bookingTime) {
      Alert.alert(
        'Incomplete Booking',
        'Please complete your booking details.'
      );
      return;
    }

    if (!Number.isFinite(total) || total < 0) {
      Alert.alert('Invalid Amount', 'Please check your booking total.');
      return;
    }

    setProcessing(true);

    const timestamp = Date.now();
    const bookingRecord = {
      ...booking,
      id: `BOOK-${timestamp}`,
      bookingNumber: `BOOK-${timestamp}`,
      paymentMethod: method,
      bank: method === 'Online Banking' ? bank : '',
      status: method === 'Online Banking' ? 'Paid' : 'Pending Payment',
      bookingStatus: 'Confirmed',
      isDemoPayment: true,
      createdAt: new Date(timestamp).toISOString(),
      total,
    };

    try {
      await saveBooking(bookingRecord);

      navigation.replace('BookingReceipt', bookingRecord);
    } catch (error) {
      Alert.alert(
        'Unable to Save Booking',
        'Your booking was not saved. Please try again.'
      );
    } finally {
      setProcessing(false);
    }
  };

  const PaymentOption = ({ title, subtitle, icon }) => {
    const active = method === title;

    return (
      <TouchableOpacity
        style={[styles.option, active && styles.activeOption]}
        onPress={() => {
          setMethod(title);
          setShowBanks(false);
        }}
        disabled={processing}
      >
        <MaterialIcons name={icon} size={30} color={C.primary} />
        <View style={styles.optionInfo}>
          <Text style={styles.optionTitle}>{title}</Text>
          <Text style={styles.optionSubtitle}>{subtitle}</Text>
        </View>
        <MaterialIcons
          name={active ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={23}
          color={C.primary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Payment</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
      >
        <View style={styles.summary}>
          <MaterialIcons name="receipt-long" size={55} color={C.primary} />

          <Text style={styles.packageName}>
            {booking.groomingPackage || 'Grooming Package'}
          </Text>

          <Text style={styles.details}>
            {booking.boardingDetails || 'No boarding'}
          </Text>

          <Text style={styles.amount}>RM {total.toFixed(2)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>

        <PaymentOption
          title="Online Banking"
          subtitle="Demo online banking payment"
          icon="account-balance"
        />

        <PaymentOption
          title="Pay at Store"
          subtitle="Pay at the Neko Suki counter"
          icon="storefront"
        />

        {method === 'Online Banking' && (
          <View style={styles.bankSection}>
            <Text style={styles.bankLabel}>Select Your Bank</Text>

            <TouchableOpacity
              style={styles.bankSelector}
              onPress={() => setShowBanks(!showBanks)}
              disabled={processing}
            >
              <Text style={styles.bankName}>{bank}</Text>
              <MaterialIcons
                name={showBanks ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={26}
                color={C.text}
              />
            </TouchableOpacity>

            {showBanks && (
              <View style={styles.bankList}>
                {banks.map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.bankItem}
                    onPress={() => {
                      setBank(item);
                      setShowBanks(false);
                    }}
                  >
                    <Text style={styles.bankName}>{item}</Text>
                    {bank === item && (
                      <MaterialIcons
                        name="check"
                        size={20}
                        color={C.primary}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        <View style={styles.demoNotice}>
          <MaterialIcons name="info-outline" size={20} color={C.primary} />
          <Text style={styles.demoText}>
            This is a demonstration payment. No real money will be charged.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={completeBooking}
          disabled={processing}
        >
          {processing ? (
            <ActivityIndicator color={C.white} />
          ) : (
            <Text style={styles.buttonText}>
              {method === 'Online Banking'
                ? `Pay RM ${total.toFixed(2)}`
                : 'Place Booking'}
            </Text>
          )}
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
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: C.text },
  content: { padding: 20, paddingBottom: 30 },
  summary: {
    backgroundColor: C.white, borderRadius: 20,
    padding: 25, alignItems: 'center',
  },
  packageName: {
    fontSize: 17, fontWeight: 'bold',
    color: C.text, textAlign: 'center', marginTop: 12,
  },
  details: {
    fontSize: 13, color: C.grey, marginTop: 7,
    textAlign: 'center',
  },
  amount: {
    fontSize: 28, fontWeight: 'bold',
    color: C.primary, marginTop: 15,
  },
  sectionTitle: {
    fontSize: 21, fontWeight: 'bold',
    color: C.text, marginTop: 28, marginBottom: 15,
  },
  option: {
    backgroundColor: C.white, borderRadius: 18,
    padding: 16, flexDirection: 'row',
    alignItems: 'center', marginBottom: 12,
    borderWidth: 2, borderColor: 'transparent',
  },
  activeOption: { borderColor: C.primary },
  optionInfo: { flex: 1, marginLeft: 15 },
  optionTitle: {
    fontSize: 17, fontWeight: 'bold', color: C.text,
  },
  optionSubtitle: {
    fontSize: 13, color: C.grey, marginTop: 4,
  },
  bankSection: { marginTop: 15 },
  bankLabel: {
    fontSize: 15, fontWeight: '600',
    color: C.text, marginBottom: 10,
  },
  bankSelector: {
    backgroundColor: C.white, borderRadius: 15,
    padding: 17, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
  },
  bankName: { fontSize: 15, color: C.text },
  bankList: {
    backgroundColor: C.white, borderRadius: 15,
    marginTop: 5, overflow: 'hidden',
  },
  bankItem: {
    padding: 16, flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1, borderBottomColor: C.secondary,
  },
  demoNotice: {
    flexDirection: 'row', backgroundColor: C.secondary,
    borderRadius: 15, padding: 15, marginTop: 25,
    alignItems: 'center',
  },
  demoText: {
    flex: 1, marginLeft: 10,
    fontSize: 12, color: C.text, lineHeight: 19,
  },
  footer: { padding: 15, backgroundColor: C.bg },
  button: {
    height: 55, backgroundColor: C.primary,
    borderRadius: 17, alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: C.white, fontSize: 16, fontWeight: 'bold',
  },
});
