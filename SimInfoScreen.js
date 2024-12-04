import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SimInfoScreen({ route, navigation }) {
  const { provider, number, price, logo } = route.params;

  // Giá gốc và giá sau khi giảm
  const originalPrice = parseInt(price.replace(/\./g, '').replace(' VND', ''));
  const discountedPrice = originalPrice * 0.8;

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = async () => {
    const newCartItem = {
      provider,
      number,
      price: discountedPrice.toLocaleString() + ' VND', // Giá sau giảm
      logo,
    };

    try {
      // Lấy giỏ hàng hiện tại từ AsyncStorage
      const storedCart = await AsyncStorage.getItem('cartItems');
      let cartItems = storedCart ? JSON.parse(storedCart) : [];

      // Thêm sản phẩm mới vào giỏ hàng
      cartItems.push(newCartItem);

      // Lưu lại giỏ hàng vào AsyncStorage
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Hiển thị thông báo thành công
      Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng');
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Lỗi', 'Có lỗi khi thêm sản phẩm vào giỏ hàng');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.headerTitle}>Thông tin Sim</Text>
        </TouchableOpacity>
      </View>

      {/* Sim Information */}
      <View style={styles.simContainer}>
        <Image source={logo} style={styles.logo} />

        <View style={styles.networkContainer}>
          <Text style={styles.networkName}>{provider}</Text>
          <Text style={styles.phoneNumber}>{number}</Text>
          <Text style={styles.discountBadge}>Giảm giá 20%</Text>
        </View>

        <Text style={styles.simType}>Nhà mạng: {provider}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>{originalPrice.toLocaleString()} VND</Text>
          <Text style={styles.discountedPrice}>{discountedPrice.toLocaleString()} VND</Text>
        </View>

        <Text style={styles.sectionTitle}>Mô tả</Text>
        <Text style={styles.description}>
          Sim {provider}, Sim số đẹp, đang được giảm giá 20%.
        </Text>

        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color="#FFC107" />
            <Text style={styles.infoText}>Thời hạn sim 6 tháng</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#FFC107" />
            <Text style={styles.infoText}>Cam kết 12 tháng</Text>
          </View>
        </View>
      </View>

      {/* Buy Button */}
      <TouchableOpacity style={styles.buyButton} onPress={addToCart}>
        <Text style={styles.buyButtonText}>Mua ngay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerContainer: {
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  simContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  networkContainer: {
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  networkLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  discountBadge: {
    position: 'absolute',
    top: -10,
    right: -20,
    backgroundColor: '#FF4D4F',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  simType: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  discountedPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d9534f',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  additionalInfo: {
    width: '100%',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  buyButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 30,
  },
});
