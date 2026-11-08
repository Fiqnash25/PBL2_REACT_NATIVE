
import React, { useState } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, Alert, Modal,
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

const food = [
  {
    id: 'f1', name: 'ProDiet Adult Cat Food',
    price: 18, category: 'Food',
    image: require('../../assets/images/prodiet_adult.jpg'),
  },
  {
    id: 'f2', name: 'Whiskas Adult Cat Food',
    price: 20, category: 'Food',
    image: require('../../assets/images/whiskas_adult.jpeg'),
  },
  {
    id: 'f3', name: 'Kucinta Beef 150g',
    price: 5, category: 'Food',
    image: require('../../assets/images/kucinta_beef_150g.jpg'),
  },
  {
    id: 'f4', name: 'Kucinta Tuna 150g',
    price: 5, category: 'Food',
    image: require('../../assets/images/kucinta_tuna_150g.jpg'),
  },
];

const toys = [
  {
    id: 't1', name: 'Interactive Bird Cat Toy',
    price: 15, category: 'Toys',
    image: require('../../assets/images/interactive_bird.jpg'),
  },
  {
    id: 't2', name: 'Feather Wand with Bell',
    price: 10, category: 'Toys',
    image: require('../../assets/images/feather_wand.jpg'),
  },
  {
    id: 't3', name: 'Magic Organ Cat Scratcher',
    price: 20, category: 'Toys',
    image: require('../../assets/images/magic_organ_scratcher.jpg'),
  },
  {
    id: 't4', name: 'Turbo Scratcher with Ball',
    price: 40, category: 'Toys',
    image: require('../../assets/images/turbo_scratcher.jpg'),
  },
  {
    id: 't5', name: 'Silvervine Plush Mouse',
    price: 10, category: 'Toys',
    image: require('../../assets/images/silvervine_mouse.jpg'),
  },
];

const everClean = [
  {
    id: 'litter_ever_clean_unscented',
    name: 'Ever Clean - Unscented',
    variant: 'Unscented',
    price: 85,
    stock: 20,
    image: require('../../assets/images/ever_clean_unscented.jpg'),
  },
  {
    id: 'litter_ever_clean_fresh_scent',
    name: 'Ever Clean - Fresh Scent Extra Strong Clump',
    variant: 'Fresh Scent - Extra Strong Clump',
    price: 90,
    stock: 20,
    image: require('../../assets/images/ever_clean_fresh_scent.jpg'),
  },
  {
    id: 'litter_ever_clean_multiple_cat',
    name: 'Ever Clean - Fresh Scent Multiple Cat',
    variant: 'Fresh Scent - Multiple Cat',
    price: 100,
    stock: 20,
    image: require('../../assets/images/ever_clean_multiple_cat.jpg'),
  },
];

const featured = [
  {
    id: 'litter_pets_academy',
    name: "Pet's Academy",
    description: 'Bentonite Cat Litter - Lavender - 12L',
    price: 20,
    stock: 20,
    image: require('../../assets/images/pets_academy_12l.jpg'),
  },
  {
    id: 'litter_unico',
    name: 'Unico',
    description: 'Tofu Cat Litter - Original - 6L',
    price: 19,
    stock: 20,
    image: require('../../assets/images/unico_tofu_original_6l.jpg'),
  },
  {
    id: 'litter_misha',
    name: 'Misha Cat Litter',
    description: 'Clumping Cat Litter - 5L',
    price: 15,
    stock: 20,
    image: require('../../assets/images/cat_litter.jpeg'),
  },
];

export default function ShopScreen({ navigation, route }) {
  const [category, setCategory] = useState(null);
  const [variantModal, setVariantModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);

  const cart = route.params?.cart || [];
  const updateCart = route.params?.updateCart;

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const addToCart = product => {
    if (!updateCart) {
      Alert.alert('Cart Unavailable', 'Please reopen the shop.');
      return;
    }

    const existing = cart.find(item => item.id === product.id);
    if ((existing?.quantity || 0) >= (product.stock ?? 999)) {
      Alert.alert('Out of Stock', 'Not enough stock available.');
      return;
    }

    updateCart(previous => {
      const found = previous.find(item => item.id === product.id);

      if (found) {
        return previous.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });

    Alert.alert('Added to Cart', `${product.name} added to cart!`);
  };

  const selectedEverClean = everClean[selectedVariant];

  const ProductCard = ({ product, isEverClean = false }) => (
    <View style={styles.productCard}>
      <Image
        source={product.image}
        style={styles.productImage}
        resizeMode="contain"
      />

      <Text style={styles.productName} numberOfLines={2}>
        {product.name}
      </Text>

      <Text style={styles.productDescription} numberOfLines={3}>
        {product.description || ''}
      </Text>

      <Text style={styles.productPrice}>
        RM {product.price.toFixed(2)}
      </Text>

      <Text style={styles.stock}>
        Stock: {product.stock ?? 20}
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (isEverClean) {
            setSelectedVariant(0);
            setVariantModal(true);
          } else {
            addToCart(product);
          }
        }}
      >
        <Text style={styles.addText}>
          {isEverClean ? 'Choose Variant' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const regularProducts = category === 'Food' ? food : toys;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={25}
            color={C.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Neko Suki Shop</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('OrderHistory')}
        >
          <MaterialIcons
            name="receipt-long"
            size={25}
            color={C.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => navigation.navigate('Cart')}
        >
          <MaterialIcons
            name="shopping-cart"
            size={26}
            color={C.text}
          />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartCount}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {category === null ? (
          <>
            <View style={styles.banner}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerSmall}>Shop for your</Text>
                <Text style={styles.bannerTitle}>Lovely Cat 🐱</Text>
                <Text style={styles.bannerSubtitle}>
                  Food, toys and more!
                </Text>
              </View>
              <MaterialIcons
                name="shopping-bag"
                size={72}
                color={C.primary}
              />
            </View>

            <Text style={styles.sectionTitle}>Categories</Text>

            <View style={styles.categoryRow}>
              {['Food', 'Toys'].map(item => (
                <TouchableOpacity
                  key={item}
                  style={styles.categoryCard}
                  onPress={() => setCategory(item)}
                >
                  <MaterialIcons
                    name={item === 'Food' ? 'restaurant' : 'toys'}
                    size={39}
                    color={C.primary}
                  />
                  <Text style={styles.categoryText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Featured Products</Text>

            <View style={styles.productGrid}>
              <ProductCard
                product={{
                  id: 'ever_clean',
                  name: 'Ever Clean',
                  description:
                    'Super Premium Clumping Cat Litter · 25lb (11.3kg)',
                  price: 85,
                  stock: 60,
                  image: everClean[0].image,
                }}
                isEverClean
              />

              {featured.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.backCategory}
              onPress={() => setCategory(null)}
            >
              <MaterialIcons
                name="arrow-back"
                size={21}
                color={C.primary}
              />
              <Text style={styles.backCategoryText}>
                Back to Shop
              </Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>
              {category === 'Food' ? 'Cat Food' : 'Cat Toys'}
            </Text>

            <View style={styles.productGrid}>
              {regularProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <Modal
        visible={variantModal}
        animationType="slide"
        transparent
        onRequestClose={() => setVariantModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ever Clean</Text>
              <TouchableOpacity
                onPress={() => setVariantModal(false)}
              >
                <MaterialIcons
                  name="close"
                  size={26}
                  color={C.text}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Super Premium Clumping Cat Litter · 25lb (11.3kg)
            </Text>

            <Image
              source={selectedEverClean.image}
              style={styles.modalImage}
              resizeMode="contain"
            />

            <Text style={styles.variantHeading}>
              Choose Variant
            </Text>

            {everClean.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.variantRow,
                  selectedVariant === index && styles.activeVariant,
                ]}
                onPress={() => setSelectedVariant(index)}
              >
                <MaterialIcons
                  name={
                    selectedVariant === index
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  size={23}
                  color={C.primary}
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.variantName}>
                    {item.variant}
                  </Text>
                  <Text style={styles.variantStock}>
                    Stock: {item.stock}
                  </Text>
                </View>

                <Text style={styles.variantPrice}>
                  RM {item.price.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                const chosen = everClean[selectedVariant];
                setVariantModal(false);
                addToCart(chosen);
              }}
            >
              <Text style={styles.addText}>
                Add to Cart · RM {selectedEverClean.price.toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 15,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: C.text,
  },
  cartIcon: { padding: 4 },
  cartBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: C.primary,
    borderRadius: 12,
    minWidth: 19,
    height: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: C.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: { padding: 20, paddingBottom: 40 },
  banner: {
    height: 170,
    backgroundColor: C.secondary,
    borderRadius: 25,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerSmall: { fontSize: 16, color: C.text },
  bannerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: C.text,
    marginTop: 4,
  },
  bannerSubtitle: {
    color: C.grey,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: C.text,
    marginTop: 30,
    marginBottom: 15,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 15,
  },
  categoryCard: {
    flex: 1,
    height: 130,
    backgroundColor: C.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  categoryText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: C.text,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: C.white,
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: C.text,
    marginTop: 12,
    minHeight: 42,
  },
  productDescription: {
    fontSize: 12,
    color: C.grey,
    marginTop: 6,
    minHeight: 54,
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: C.primary,
    marginTop: 8,
  },
  stock: {
    fontSize: 11,
    color: C.grey,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: C.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  addText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: C.white,
  },
  backCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  backCategoryText: {
    color: C.primary,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: C.bg,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 35,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: C.text,
  },
  modalSubtitle: {
    fontSize: 13,
    color: C.grey,
    marginTop: 8,
  },
  modalImage: {
    height: 175,
    width: '100%',
    marginVertical: 12,
  },
  variantHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: C.text,
    marginBottom: 10,
  },
  variantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    borderRadius: 13,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  activeVariant: {
    backgroundColor: C.secondary,
  },
  variantName: {
    fontSize: 12,
    fontWeight: '600',
    color: C.text,
  },
  variantStock: {
    fontSize: 11,
    color: C.grey,
    marginTop: 3,
  },
  variantPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: C.primary,
  },
  modalButton: {
    backgroundColor: C.primary,
    borderRadius: 15,
    padding: 17,
    alignItems: 'center',
    marginTop: 12,
  },
});
