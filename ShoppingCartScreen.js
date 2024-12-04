import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ShoppingCartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Tổng tiền

  // Lấy giỏ hàng từ AsyncStorage khi màn hình được mở
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cartItems');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart)); // Tải giỏ hàng từ AsyncStorage
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };

    loadCartItems();
  }, []);

  // Cập nhật tổng tiền khi cartItems thay đổi
  useEffect(() => {
    const total = calculateTotalPrice(cartItems);
    setTotalPrice(total);
    saveTotalPriceToStorage(total); // Lưu tổng tiền vào AsyncStorage
  }, [cartItems]);

  // Hàm tính tổng tiền
  const calculateTotalPrice = (cart) => {
    const total = cart.reduce((sum, item) => {
      const priceValue = parseFloat(item.price?.replace(/[^0-9.-]+/g, '')); // Lọc số từ chuỗi giá
      const quantity = item.quantity || 1; // Mặc định số lượng là 1
      if (isNaN(priceValue)) {
        console.error(`Giá trị không hợp lệ cho sản phẩm: ${item.provider}, giá: ${item.price}`);
        return sum; // Bỏ qua sản phẩm nếu giá không hợp lệ
      }
      return sum + priceValue * quantity;
    }, 0);

    console.log(`Tổng tiền tính được: ${total}`);
    return total;
  };

  // Hàm lưu tổng tiền vào AsyncStorage
  const saveTotalPriceToStorage = async (price) => {
    try {
      await AsyncStorage.setItem('totalPrice', JSON.stringify(price));
    } catch (error) {
      console.error('Error saving total price:', error);
    }
  };

  // Hàm lưu giỏ hàng vào AsyncStorage
  const saveCartToStorage = async (newCart) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(newCart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItemFromCart = (id) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.quantity > 0) {
        // Nếu là sản phẩm cần xóa, giảm số lượng đi 1
        return { ...item, quantity: item.quantity - 1 };
      }
      return item; // Các sản phẩm khác giữ nguyên
    }).filter((item) => item.quantity > 0); // Xóa sản phẩm khỏi giỏ nếu quantity <= 0

    setCartItems(updatedCart); // Cập nhật giỏ hàng trong state
    saveCartToStorage(updatedCart); // Lưu lại giỏ hàng mới vào AsyncStorage
  };


  // Định dạng tiền theo kiểu VND
  const formattedTotalPrice = totalPrice.toLocaleString('vi-VN') + ' VND';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giỏ hàng</Text>

      {/* Hiển thị các sản phẩm trong giỏ hàng */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.logo} style={styles.icon} />
            <View style={styles.itemDetails}>
              <Text style={styles.brand}>{item.provider}</Text>
              <Text style={styles.number}>{item.number}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
            </View>
            {/* Nút xóa sản phẩm khỏi giỏ hàng */}
            <TouchableOpacity style={styles.removeButton} onPress={() => removeItemFromCart(item.id)}>
              <Ionicons name="close-circle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.payment}>
        {/* Hiển thị tổng số lượng và giá */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Số lượng: {cartItems.length}</Text>
          <Text style={styles.totalText}>Tổng tiền: {formattedTotalPrice}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout', { totalPrice })} // Truyền tổng tiền qua
        >
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>

      {/* Thanh điều hướng dưới cùng */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Person')} style={styles.navItem}>
          <Ionicons name="person" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.navItem}>
          <Ionicons name="cart-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={styles.navItem}>
          <Ionicons name="notifications-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.navItem}>
          <Ionicons name="settings-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Định nghĩa styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 40,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  brand: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  number: {
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  quantity: {
    fontSize: 14,
    color: '#888',
  },
  removeButton: {
    padding: 5,
  },
  payment: {
    bottom: 140,
    paddingHorizontal: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 40,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 15,
    marginBottom: 20,
    paddingVertical: 25,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    right: 16,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
});
