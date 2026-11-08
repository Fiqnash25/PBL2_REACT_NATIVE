
import React from 'react';
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

export default function BookingHistoryScreen({
  navigation,
  bookings = [],
  cancelBooking,
}) {
  const confirmCancel = item => {
    Alert.alert(
      'Cancel Booking',
      `Cancel booking ${item.bookingNumber}?`,
      [
        { text: 'Keep Booking', style: 'cancel' },
        {
          text: 'Cancel Booking',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelBooking(item.id);
            } catch {
              Alert.alert('Error', 'Unable to cancel booking.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking History</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <MaterialIcons name="event-note" size={44} color={C.primary} />
          <Text style={styles.bannerTitle}>My Bookings</Text>
          <Text style={styles.bannerText}>
            Your cat's grooming and boarding appointments.
          </Text>
        </View>

        {bookings.length === 0 ? (
          <View style={styles.empty}>
            <MaterialIcons
              name="event-busy"
              size={65}
              color={C.primary}
            />
            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.muted}>
              Book a grooming or boarding session to get started!
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Grooming')}
            >
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>
              All Bookings ({bookings.length})
            </Text>

            {bookings.map(item => {
              const cancelled = item.bookingStatus === 'Cancelled';

              return (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.bookingNumber}>
                        {item.bookingNumber}
                      </Text>
                      <Text style={styles.muted}>
                        {item.catName}
                      </Text>
                    </View>

                    <View style={[
                      styles.statusBadge,
                      cancelled && styles.cancelledBadge,
                    ]}>
                      <Text style={[
                        styles.statusText,
                        cancelled && styles.cancelledText,
                      ]}>
                        {cancelled ? 'Cancelled' : 'Confirmed'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  <Text style={styles.detail}>
                    <Text style={styles.detailLabel}>Grooming: </Text>
                    {item.groomingPackage || 'None'}
                  </Text>

                  <Text style={styles.detail}>
                    <Text style={styles.detailLabel}>Boarding: </Text>
                    {item.boardingDetails || 'No boarding'}
                  </Text>

                  <Text style={styles.detail}>
                    <Text style={styles.detailLabel}>Date: </Text>
                    {item.bookingDate}
                  </Text>

                  <Text style={styles.detail}>
                    <Text style={styles.detailLabel}>Time: </Text>
                    {item.bookingTime}
                  </Text>

                  <Text style={styles.detail}>
                    <Text style={styles.detailLabel}>Payment: </Text>
                    {item.paymentMethod} ({item.status})
                  </Text>

                  <Text style={styles.total}>
                    RM {Number(item.total || 0).toFixed(2)}
                  </Text>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('BookingReceipt', item)
                    }
                  >
                    <Text style={styles.buttonText}>View Receipt</Text>
                  </TouchableOpacity>

                  {!cancelled && (
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => confirmCancel(item)}
                    >
                      <Text style={styles.cancelText}>
                        Cancel Booking
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    height: 58, flexDirection: 'row',
    alignItems: 'center', paddingHorizontal: 20, gap: 15,
  },
  headerTitle: {
    fontSize: 21, fontWeight: 'bold', color: C.text,
  },
  content: { padding: 20, paddingBottom: 40 },
  banner: {
    backgroundColor: C.secondary,
    borderRadius: 23, padding: 25, alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 23, fontWeight: 'bold',
    color: C.text, marginTop: 10,
  },
  bannerText: {
    fontSize: 13, color: C.grey,
    textAlign: 'center', marginTop: 8,
  },
  empty: {
    backgroundColor: C.white, borderRadius: 20,
    alignItems: 'center', padding: 35, marginTop: 25,
  },
  emptyTitle: {
    fontSize: 21, fontWeight: 'bold',
    color: C.text, marginTop: 15,
  },
  muted: {
    fontSize: 13, color: C.grey,
    marginTop: 6, lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20, fontWeight: 'bold',
    color: C.text, marginTop: 25, marginBottom: 15,
  },
  card: {
    backgroundColor: C.white, borderRadius: 20,
    padding: 18, marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  bookingNumber: {
    fontSize: 15, fontWeight: 'bold', color: C.text,
  },
  statusBadge: {
    backgroundColor: C.secondary,
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: 20,
  },
  cancelledBadge: { backgroundColor: '#FCE8E8' },
  statusText: {
    color: C.text, fontWeight: 'bold', fontSize: 11,
  },
  cancelledText: { color: '#C35F6C' },
  divider: {
    height: 1, backgroundColor: '#F3E7EF',
    marginVertical: 15,
  },
  detail: {
    fontSize: 13, color: C.text,
    marginBottom: 10, lineHeight: 20,
  },
  detailLabel: { fontWeight: 'bold' },
  total: {
    color: C.primary, fontSize: 21,
    fontWeight: 'bold', textAlign: 'right',
    marginTop: 8,
  },
  button: {
    backgroundColor: C.primary, borderRadius: 13,
    padding: 14, alignItems: 'center', marginTop: 18,
  },
  buttonText: {
    color: C.white, fontWeight: 'bold', fontSize: 14,
  },
  cancelButton: {
    padding: 13, alignItems: 'center', marginTop: 9,
    borderRadius: 13, borderWidth: 1,
    borderColor: '#E5A3AD',
  },
  cancelText: {
    color: '#C35F6C', fontWeight: 'bold', fontSize: 13,
  },
});
