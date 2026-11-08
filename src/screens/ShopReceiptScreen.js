
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

export default function ShopReceiptScreen({ navigation, route }) {
  const order = route.params?.order;

  if (!order) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.missing}>
          <Text style={styles.title}>Receipt not found</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isPaid = order.status === 'Paid';

  const Detail = ({ label, value }) => (
    <View style={styles.detailRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.receipt}>
          <Image
            source={require('../../assets/images/neko_suki_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.brand}>NEKO SUKI</Text>
          <Text style={styles.brandSub}>CAT SPA & HOTEL</Text>

          <View style={styles.successIcon}>
            <MaterialIcons
              name="check-circle"
              size={60}
              color={C.primary}
            />
          </View>

          <Text style={styles.title}>Order Confirmed!</Text>
          <Text style={styles.subtitle}>
            Thank you for shopping with Neko Suki.
          </Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {isPaid ? 'PAID (DEMO)' : 'PENDING PAYMENT'}
            </Text>
          </View>

          <View style={styles.divider} />

          <Detail label="Order Number" value={order.orderNumber} />
          <Detail
            label="Date"
            value={new Date(order.createdAt).toLocaleDateString('en-MY')}
          />
          <Detail label="Payment" value={order.paymentMethod} />

          {Boolean(order.bank) && (
            <Detail label="Bank" value={order.bank} />
          )}

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Order Items</Text>

          {order.items.map(item => (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.label}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.value}>
                RM {(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>
              RM {order.amount.toFixed(2)}
            </Text>
          </View>

          <Text style={styles.demoText}>
            Demo transaction only. No actual payment was processed.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OrderHistory')}
        >
          <MaterialIcons name="history" size={21} color={C.white} />
          <Text style={styles.buttonText}>View Order History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => navigation.popTo('Home')}
        >
          <Text style={styles.outlineText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  content: { padding: 20, paddingBottom: 45 },
  receipt: {
    backgroundColor: C.white, borderRadius: 23,
    padding: 23, alignItems: 'center',
  },
  logo: { width: 95, height: 95 },
  brand: {
    fontSize: 23, fontWeight: 'bold',
    color: C.text, marginTop: 5,
  },
  brandSub: {
    fontSize: 11, color: C.grey,
    letterSpacing: 2, marginTop: 3,
  },
  successIcon: { marginTop: 25 },
  title: {
    fontSize: 23, fontWeight: 'bold',
    color: C.text, marginTop: 12,
  },
  subtitle: {
    fontSize: 13, color: C.grey,
    textAlign: 'center', marginTop: 7,
  },
  statusBadge: {
    backgroundColor: C.secondary, borderRadius: 20,
    paddingHorizontal: 17, paddingVertical: 9, marginTop: 18,
  },
  statusText: { color: C.text, fontSize: 12, fontWeight: 'bold' },
  divider: {
    height: 1, backgroundColor: '#F1E6EC',
    width: '100%', marginVertical: 21,
  },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', width: '100%', marginBottom: 13, gap: 12,
  },
  label: { color: C.grey, fontSize: 12 },
  value: {
    color: C.text, fontSize: 13,
    fontWeight: '600', textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 17, fontWeight: 'bold',
    color: C.text, alignSelf: 'flex-start', marginBottom: 15,
  },
  itemRow: {
    width: '100%', flexDirection: 'row',
    alignItems: 'center', marginBottom: 15, gap: 10,
  },
  itemName: { fontSize: 13, fontWeight: '600', color: C.text },
  totalRow: {
    width: '100%', flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
  },
  totalLabel: { fontSize: 17, fontWeight: 'bold', color: C.text },
  totalPrice: { fontSize: 22, fontWeight: 'bold', color: C.primary },
  demoText: {
    color: C.grey, fontSize: 11,
    textAlign: 'center', marginTop: 23,
  },
  button: {
    backgroundColor: C.primary, borderRadius: 15,
    padding: 17, marginTop: 22,
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', gap: 10,
  },
  buttonText: { color: C.white, fontWeight: 'bold' },
  outlineButton: {
    padding: 17, borderRadius: 15,
    borderWidth: 1.5, borderColor: C.primary,
    alignItems: 'center', marginTop: 12,
  },
  outlineText: { color: C.primary, fontWeight: 'bold' },
  missing: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
});
