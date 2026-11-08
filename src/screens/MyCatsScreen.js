
import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  StyleSheet, Alert, Modal, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const C = {
  bg: '#FFF8F8', primary: '#D9A7C7',
  secondary: '#F3D9E7', text: '#4A4145',
  white: '#FFFFFF', grey: '#888888',
};

export default function MyCatsScreen({ navigation, cats = [], setCats }) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');

  const addCat = () => {
    if (!name.trim()) {
      Alert.alert('Missing Name', 'Please enter your cat name.');
      return;
    }

    if (age.trim() && (!/^\d+$/.test(age.trim()) || Number(age) > 50)) {
      Alert.alert('Invalid Age', 'Please enter a valid age in whole years.');
      return;
    }

    setCats?.(previous => [
      ...previous,
      {
        id: String(Date.now()),
        name: name.trim(),
        breed: breed.trim() || 'Unknown Breed',
        age: age.trim() ? Number(age) : 0,
      },
    ]);

    setName('');
    setBreed('');
    setAge('');
    setModal(false);
  };

  const deleteCat = id => {
    Alert.alert('Delete Cat', 'Are you sure you want to remove this cat?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setCats?.(previous =>
          previous.filter(cat => cat.id !== id)
        ),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cats</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <MaterialIcons name="pets" size={46} color={C.primary} />
          <Text style={styles.bannerTitle}>My Lovely Cats</Text>
          <Text style={styles.bannerText}>
            Keep your furry friends' details in one place.
          </Text>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>My Cats ({cats.length})</Text>
          <TouchableOpacity style={styles.addSmall} onPress={() => setModal(true)}>
            <MaterialIcons name="add" size={21} color={C.white} />
            <Text style={styles.addSmallText}>Add Cat</Text>
          </TouchableOpacity>
        </View>

        {cats.length === 0 ? (
          <View style={styles.empty}>
            <MaterialIcons name="pets" size={65} color={C.primary} />
            <Text style={styles.emptyTitle}>No cats added yet</Text>
            <Text style={styles.emptyText}>
              Add your first cat to get started!
            </Text>
            <TouchableOpacity
              style={styles.mainButton}
              onPress={() => setModal(true)}
            >
              <Text style={styles.mainButtonText}>Add My Cat</Text>
            </TouchableOpacity>
          </View>
        ) : (
          cats.map(cat => (
            <View key={cat.id} style={styles.catCard}>
              <View style={styles.catAvatar}>
                <MaterialIcons name="pets" size={33} color={C.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.catName}>{cat.name}</Text>
                <Text style={styles.catInfo}>{cat.breed}</Text>
                <Text style={styles.catInfo}>
                  {cat.age === 0 ? 'Age not specified' : `${cat.age} year(s) old`}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteCat(cat.id)}>
                <MaterialIcons name="delete-outline" size={25} color="#D77B87" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <Modal
        visible={modal}
        transparent
        animationType="slide"
        onRequestClose={() => setModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Cat 🐱</Text>
              <TouchableOpacity onPress={() => setModal(false)}>
                <MaterialIcons name="close" size={25} color={C.text} />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Cat Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter cat name"
              placeholderTextColor={C.grey}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Breed (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. British Shorthair"
              placeholderTextColor={C.grey}
              value={breed}
              onChangeText={setBreed}
            />

            <Text style={styles.label}>Age in Years (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 2"
              placeholderTextColor={C.grey}
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />

            <TouchableOpacity style={styles.mainButton} onPress={addCat}>
              <Text style={styles.mainButtonText}>Save Cat</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
    backgroundColor: C.secondary, borderRadius: 24,
    padding: 27, alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 23, fontWeight: 'bold',
    color: C.text, marginTop: 10,
  },
  bannerText: {
    fontSize: 13, color: C.grey,
    marginTop: 7, textAlign: 'center',
  },
  titleRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginTop: 28, marginBottom: 16,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: C.text },
  addSmall: {
    backgroundColor: C.primary, borderRadius: 12,
    paddingHorizontal: 13, paddingVertical: 10,
    flexDirection: 'row', alignItems: 'center', gap: 5,
  },
  addSmallText: { color: C.white, fontSize: 12, fontWeight: 'bold' },
  empty: {
    backgroundColor: C.white, borderRadius: 20,
    padding: 35, alignItems: 'center', marginTop: 12,
  },
  emptyTitle: {
    fontSize: 19, fontWeight: 'bold',
    color: C.text, marginTop: 16,
  },
  emptyText: {
    fontSize: 13, color: C.grey,
    textAlign: 'center', marginTop: 8,
  },
  mainButton: {
    backgroundColor: C.primary, borderRadius: 15,
    paddingVertical: 16, paddingHorizontal: 35,
    alignItems: 'center', marginTop: 22,
  },
  mainButtonText: { color: C.white, fontWeight: 'bold', fontSize: 15 },
  catCard: {
    backgroundColor: C.white, borderRadius: 18,
    padding: 16, flexDirection: 'row',
    alignItems: 'center', marginBottom: 12, gap: 15,
  },
  catAvatar: {
    width: 65, height: 65, borderRadius: 35,
    backgroundColor: C.secondary,
    alignItems: 'center', justifyContent: 'center',
  },
  catName: { fontSize: 17, fontWeight: 'bold', color: C.text },
  catInfo: { fontSize: 12, color: C.grey, marginTop: 5 },
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: C.bg, borderTopLeftRadius: 25,
    borderTopRightRadius: 25, padding: 24, paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 15,
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: C.text },
  label: {
    fontSize: 14, fontWeight: '600',
    color: C.text, marginTop: 15, marginBottom: 8,
  },
  input: {
    backgroundColor: C.white, borderRadius: 13,
    padding: 15, fontSize: 15, color: C.text,
  },
});
