
import React from 'react';
import {
  View, Text, Image, ScrollView,
  TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const C = {
  bg: '#FFF8F8', primary: '#D9A7C7',
  secondary: '#F3D9E7', text: '#4A4145',
  white: '#FFFFFF', grey: '#888888',
};

export default function CartScreen({ navigation, route }) {
  const cart = route.params?.cart || [];
  const updateCart = route.params?.updateCart;

  const changeQuantity = (id, amount) => {
    updateCart?.(previous =>
      previous
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = id => {
    Alert.alert('Remove Item', 'Remove this item from cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => updateCart?.(previous =>
          previous.filter(item => item.id !== id)
        ),
      },
    ]);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <MaterialIcons name="shopping-basket" size={75} color={C.primary} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Let's find something pawsome!
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Shop')}
          >
            <Text style={styles.buttonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.content}>
            {cart.map(item => (
              <View key={item.id} style={styles.item}>
                <Image source={item.image} style={styles.image} resizeMode="contain" />

                <View style={styles.info}>
                  <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.price}>
                    RM {(item.price * item.quantity).toFixed(2)}
                  </Text>

                  <View style={styles.controls}>
                    <TouchableOpacity
                      style={styles.counter}
                      onPress={() => changeQuantity(item.id, -1)}
                    >
                      <MaterialIcons name="remove" size={19} color={C.primary} />
                    </TouchableOpacity>

                    <Text style={styles.quantity}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={styles.counter}
                      onPress={() => changeQuantity(item.id, 1)}
                    >
                      <MaterialIcons name="add" size={19} color={C.primary} />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <MaterialIcons name="delete-outline" size={23} color="#D67C88" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>RM {total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkout}
              onPress={() => navigation.navigate('ShopPayment')}
            >
              <Text style={styles.buttonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  content: { padding: 20, paddingBottom: 30 },
  item: {
    backgroundColor: C.white, borderRadius: 18,
    padding: 13, flexDirection: 'row',
    alignItems: 'center', marginBottom: 13, gap: 12,
  },
  image: { width: 78, height: 90 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: 'bold', color: C.text },
  price: {
    color: C.primary, fontWeight: 'bold',
    fontSize: 15, marginTop: 8,
  },
  controls: {
    flexDirection: 'row', alignItems: 'center',
    gap: 13, marginTop: 12,
  },
  counter: {
    backgroundColor: C.secondary, borderRadius: 8,
    width: 29, height: 29,
    justifyContent: 'center', alignItems: 'center',
  },
  quantity: { fontWeight: 'bold', color: C.text },
  footer: { padding: 20, backgroundColor: C.white },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 17,
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: C.text },
  totalPrice: { fontSize: 21, fontWeight: 'bold', color: C.primary },
  checkout: {
    height: 54, borderRadius: 15,
    backgroundColor: C.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  buttonText: { color: C.white, fontWeight: 'bold', fontSize: 15 },
  empty: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', padding: 25,
  },
  emptyTitle: {
    fontSize: 22, fontWeight: 'bold',
    color: C.text, marginTop: 15,
  },
  emptySubtitle: { color: C.grey, marginTop: 8 },
  shopButton: {
    backgroundColor: C.primary, borderRadius: 15,
    padding: 16, marginTop: 25,
  },
});
