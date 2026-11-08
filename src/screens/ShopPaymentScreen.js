
import React, { useState } from 'react';
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

const banks = [
  'Maybank',
  'CIMB Bank',
  'Bank Islam',
  'Public Bank',
];

export default function ShopPaymentScreen({
  navigation,
  cart = [],
  setCart,
  setOrders,
}) {
  const [paymentMethod, setPaymentMethod] = useState('Online Banking');
  const [bank, setBank] = useState('Maybank');
  const [showBanks, setShowBanks] = useState(false);
  const [processing, setProcessing] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const quantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const confirmOrder = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add products before checkout.');
      return;
    }

    if (processing) return;

    setProcessing(true);

    const order = {
      id: String(Date.now()),
      orderNumber: `NEKO-${Date.now()}`,
      items: cart.map(item => ({ ...item })),
      amount: total,
      paymentMethod,
      bank: paymentMethod === 'Online Banking' ? bank : '',
      status:
        paymentMethod === 'Online Banking'
          ? 'Paid'
          : 'Pending Payment',
      createdAt: new Date().toISOString(),
      isDemoPayment: true,
    };

    setOrders?.(previous => [order, ...previous]);
    setCart?.([]);

    navigation.replace('ShopReceipt', { order });
    setProcessing(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <MaterialIcons name="shopping-bag" size={38} color={C.primary} />
          <Text style={styles.bannerTitle}>Almost there!</Text>
          <Text style={styles.bannerSubtitle}>
            Review your order and choose a payment method.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Order Summary</Text>

        <View style={styles.card}>
          {cart.map(item => (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.muted}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>
                RM {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.separator} />

          <View style={styles.totalRow}>
            <Text style={styles.muted}>Total Items</Text>
            <Text style={styles.value}>{quantity}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Payment</Text>
            <Text style={styles.totalPrice}>
              RM {total.toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>

        <TouchableOpacity
          style={[
            styles.paymentCard,
            paymentMethod === 'Online Banking' && styles.selectedCard,
          ]}
          onPress={() => setPaymentMethod('Online Banking')}
        >
          <MaterialIcons name="account-balance" size={27} color={C.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.paymentTitle}>Online Banking</Text>
            <Text style={styles.muted}>Demo bank payment</Text>
          </View>
          <MaterialIcons
            name={
              paymentMethod === 'Online Banking'
                ? 'radio-button-checked'
                : 'radio-button-unchecked'
            }
            size={24}
            color={C.primary}
          />
        </TouchableOpacity>

        {paymentMethod === 'Online Banking' && (
          <View style={styles.bankContainer}>
            <Text style={styles.bankLabel}>Select Bank</Text>

            <TouchableOpacity
              style={styles.bankDropdown}
              onPress={() => setShowBanks(!showBanks)}
            >
              <Text style={styles.value}>{bank}</Text>
              <MaterialIcons
                name={showBanks ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                size={24}
                color={C.text}
              />
            </TouchableOpacity>

            {showBanks && banks.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.bankOption}
                onPress={() => {
                  setBank(item);
                  setShowBanks(false);
                }}
              >
                <Text style={styles.value}>{item}</Text>
                {bank === item && (
                  <MaterialIcons name="check" size={20} color={C.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.paymentCard,
            paymentMethod === 'Pay at Store' && styles.selectedCard,
          ]}
          onPress={() => {
            setPaymentMethod('Pay at Store');
            setShowBanks(false);
          }}
        >
          <MaterialIcons name="storefront" size={27} color={C.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.paymentTitle}>Pay at Store</Text>
            <Text style={styles.muted}>Pay when collecting your order</Text>
          </View>
          <MaterialIcons
            name={
              paymentMethod === 'Pay at Store'
                ? 'radio-button-checked'
                : 'radio-button-unchecked'
            }
            size={24}
            color={C.primary}
          />
        </TouchableOpacity>

        <View style={styles.notice}>
          <MaterialIcons name="info-outline" size={20} color={C.primary} />
          <Text style={styles.noticeText}>
            This is a demo checkout. No real money will be charged.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.confirmButton, processing && { opacity: 0.6 }]}
          onPress={confirmOrder}
          disabled={processing || cart.length === 0}
        >
          <Text style={styles.confirmText}>
            {processing
              ? 'Processing...'
              : `Confirm Order · RM ${total.toFixed(2)}`}
          </Text>
          <MaterialIcons name="arrow-forward" size={20} color={C.white} />
        </TouchableOpacity>
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
  content: { padding: 20, paddingBottom: 40 },
  banner: {
    backgroundColor: C.secondary, borderRadius: 22,
    padding: 23, alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 22, fontWeight: 'bold', color: C.text, marginTop: 10,
  },
  bannerSubtitle: {
    fontSize: 13, color: C.grey, textAlign: 'center', marginTop: 6,
  },
  sectionTitle: {
    fontSize: 19, fontWeight: 'bold',
    color: C.text, marginTop: 27, marginBottom: 14,
  },
  card: {
    backgroundColor: C.white, borderRadius: 18, padding: 18,
  },
  itemRow: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 15, gap: 12,
  },
  itemName: { fontSize: 14, fontWeight: '600', color: C.text },
  itemPrice: { fontSize: 13, fontWeight: 'bold', color: C.primary },
  muted: { fontSize: 12, color: C.grey, marginTop: 5 },
  separator: {
    height: 1, backgroundColor: '#F3E6EE', marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 12,
  },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: C.text },
  totalPrice: { fontSize: 20, fontWeight: 'bold', color: C.primary },
  value: { fontSize: 14, fontWeight: '600', color: C.text },
  paymentCard: {
    backgroundColor: C.white, borderRadius: 16,
    padding: 17, flexDirection: 'row',
    alignItems: 'center', gap: 13, marginBottom: 12,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: C.primary, backgroundColor: '#FFF2F8',
  },
  paymentTitle: { fontSize: 15, fontWeight: 'bold', color: C.text },
  bankContainer: {
    backgroundColor: C.white, borderRadius: 15,
    padding: 15, marginBottom: 13,
  },
  bankLabel: { fontSize: 13, fontWeight: 'bold', color: C.text },
  bankDropdown: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', backgroundColor: C.bg,
    borderRadius: 11, padding: 13, marginTop: 10,
  },
  bankOption: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: 12, borderBottomWidth: 1, borderBottomColor: '#F8EDF3',
  },
  notice: {
    flexDirection: 'row', gap: 10,
    padding: 15, backgroundColor: C.secondary,
    borderRadius: 14, marginTop: 20,
  },
  noticeText: { flex: 1, fontSize: 12, color: C.text, lineHeight: 19 },
  confirmButton: {
    backgroundColor: C.primary, borderRadius: 15,
    padding: 17, flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center',
    gap: 10, marginTop: 25,
  },
  confirmText: { color: C.white, fontSize: 15, fontWeight: 'bold' },
});
