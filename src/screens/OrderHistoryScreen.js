
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const C = {
  bg: '#FFF8F8', primary: '#D9A7C7',
  secondary: '#F3D9E7', text: '#4A4145',
  white: '#FFFFFF', grey: '#888888',
};

export default function OrderHistoryScreen({ navigation, orders = [] }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {orders.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.circle}>
              <MaterialIcons
                name="shopping-bag"
                size={57}
                color={C.primary}
              />
            </View>

            <Text style={styles.emptyTitle}>Little treats await!</Text>
            <Text style={styles.emptyText}>
              No orders yet. Explore food, toys and
              essentials for your favourite companion.
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Shop')}
            >
              <Text style={styles.buttonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>
              My Orders ({orders.length})
            </Text>

            {orders.map(order => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                onPress={() => navigation.navigate('ShopReceipt', { order })}
              >
                <View style={styles.iconBox}>
                  <MaterialIcons
                    name="receipt-long"
                    size={28}
                    color={C.primary}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.orderNumber}>
                    {order.orderNumber}
                  </Text>
                  <Text style={styles.date}>
                    {new Date(order.createdAt).toLocaleDateString('en-MY')}
                  </Text>
                  <Text style={styles.amount}>
                    RM {order.amount.toFixed(2)}
                  </Text>
                  <Text style={styles.status}>{order.status}</Text>
                </View>

                <MaterialIcons
                  name="chevron-right"
                  size={25}
                  color={C.primary}
                />
              </TouchableOpacity>
            ))}
          </>
        )}
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
  content: { flexGrow: 1, padding: 20 },
  empty: {
    flex: 1, alignItems: 'center',
    justifyContent: 'center', padding: 25,
  },
  circle: {
    width: 130, height: 130, borderRadius: 65,
    backgroundColor: C.secondary,
    justifyContent: 'center', alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 23, fontWeight: 'bold',
    color: C.text, marginTop: 25,
  },
  emptyText: {
    color: C.grey, textAlign: 'center',
    fontSize: 14, lineHeight: 23, marginTop: 12,
  },
  button: {
    backgroundColor: C.primary, borderRadius: 15,
    paddingHorizontal: 35, paddingVertical: 16, marginTop: 28,
  },
  buttonText: { color: C.white, fontWeight: 'bold' },
  sectionTitle: {
    fontSize: 20, fontWeight: 'bold',
    color: C.text, marginBottom: 18,
  },
  orderCard: {
    backgroundColor: C.white, borderRadius: 18,
    padding: 16, flexDirection: 'row',
    alignItems: 'center', gap: 14, marginBottom: 13,
  },
  iconBox: {
    width: 58, height: 58, borderRadius: 15,
    backgroundColor: C.secondary,
    justifyContent: 'center', alignItems: 'center',
  },
  orderNumber: { fontSize: 14, fontWeight: 'bold', color: C.text },
  date: { fontSize: 12, color: C.grey, marginTop: 5 },
  amount: {
    fontSize: 15, fontWeight: 'bold',
    color: C.primary, marginTop: 7,
  },
  status: { fontSize: 12, color: C.grey, marginTop: 5 },
});
