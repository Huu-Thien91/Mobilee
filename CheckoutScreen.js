import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CheckoutScreen({ navigation }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [totalAmount, setTotalAmount] = useState(''); // Tổng tiền

  const paymentMethods = [
    { id: '1', name: 'Visa', icon: require('./assets/Visa-icon.png'), screen: 'VisaPayment' },
    { id: '2', name: 'Momo', icon: require('./assets/Momo-icon.png'), screen: 'MomoPayment' },
    { id: '3', name: 'Thẻ Điện Thoại', icon: require('./assets/Phonecard-icon.png'), screen: 'PhoneCardPayment' },
  ];

  // Lấy tổng tiền từ AsyncStorage khi mở trang
  useEffect(() => {
    const loadTotalAmount = async () => {
      try {
        const storedAmount = await AsyncStorage.getItem('totalPrice');
        if (storedAmount) {
          setTotalAmount(JSON.parse(storedAmount)); // Lấy giá trị nếu có
        }
      } catch (error) {
        console.error('Error loading total amount:', error);
      }
    };

    loadTotalAmount();
  }, []);

  const handleContinue = () => {
    if (selectedPayment) {
      // Điều hướng đến màn hình tương ứng, truyền số tiền và phương thức thanh toán
      navigation.navigate(selectedPayment.screen, {
        methodName: selectedPayment.name,
        totalAmount,
      });
    } else {
      alert('Vui lòng chọn phương thức thanh toán!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Thanh toán</Text>

      {/* Payment Methods */}
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[styles.paymentMethod, selectedPayment?.id === method.id && styles.selectedMethod]}
          onPress={() => setSelectedPayment(method)}
        >
          <Image source={method.icon} style={styles.paymentIcon} />
          <Text style={styles.paymentText}>{method.name}</Text>
          <Ionicons
            name={selectedPayment?.id === method.id ? 'radio-button-on' : 'radio-button-off'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ))}

      {/* Coupon Code */}
      <View style={styles.couponContainer}>
        <Ionicons name="pricetag-outline" size={24} color="#000" />
        <Text style={styles.couponText}>Mã giảm giá</Text>
      </View>

      <TextInput
        placeholder="Mã giảm giá"
        value={couponCode}
        onChangeText={setCouponCode}
        style={styles.couponInput}
      />

      {/* Tổng thanh toán */}
      <TextInput
        placeholder="Phương thức thanh toán: Chưa chọn"
        style={styles.totalInput}
        editable={false}
        value={`Phương thức thanh toán: ${selectedPayment ? selectedPayment.name : 'Chưa chọn'}`}
      />

      {/* Hiển thị tổng tiền */}
      <Text style={styles.totalAmount}>Tổng tiền: {totalAmount.toLocaleString('vi-VN')} VND</Text>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedMethod: {
    borderColor: '#000',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdd835',
    padding: 10,
    borderRadius: 10,
    marginVertical: 15,
  },
  couponText: {
    fontSize: 16,
    marginLeft: 10,
  },
  couponInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  totalInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
