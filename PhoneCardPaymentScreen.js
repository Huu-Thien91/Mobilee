import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Sử dụng Picker từ thư viện này
import { Ionicons } from '@expo/vector-icons';

export default function PhoneCardPaymentScreen() {
  const [couponCode, setCouponCode] = useState('');
  const [cardType, setCardType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const handleContinue = () => {
    if (!cardType) {
      Alert.alert('Lỗi', 'Vui lòng chọn loại thẻ.');
      return;
    }
    if (!serialNumber) {
      Alert.alert('Lỗi', 'Vui lòng nhập mã serial.');
      return;
    }
    if (!cardNumber) {
      Alert.alert('Lỗi', 'Vui lòng nhập mã thẻ.');
      return;
    }
    Alert.alert(
      'Xác nhận',
      `Thanh toán thành công với loại thẻ: ${cardType.toUpperCase()}\nMã Serial: ${serialNumber}\nMã Thẻ: ${cardNumber}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thanh toán Thẻ điện thoại</Text>

      {/* Payment Method Header */}
      <View style={styles.paymentMethod}>
        <Image source={require('./assets/Phonecard-icon.png')} style={styles.paymentIcon} />
        <Text style={styles.paymentText}>Thẻ Điện Thoại</Text>
        <Ionicons name="radio-button-on" size={24} color="black" />
      </View>

      {/* Card Type Picker */}
      <View style={styles.input}>
        <Picker
          selectedValue={cardType}
          onValueChange={(itemValue) => setCardType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Chọn loại thẻ" value="" />
          <Picker.Item label="Viettel" value="viettel" />
          <Picker.Item label="Mobifone" value="mobifone" />
          <Picker.Item label="Vinaphone" value="vinaphone" />
        </Picker>
      </View>

      {/* Serial Number Input */}
      <TextInput
        placeholder="Mã serial"
        value={serialNumber}
        onChangeText={setSerialNumber}
        style={styles.input}
        keyboardType="numeric"
      />

      {/* Card Number Input */}
      <TextInput
        placeholder="Mã thẻ"
        value={cardNumber}
        onChangeText={setCardNumber}
        style={styles.input}
        keyboardType="numeric"
      />

      {/* Coupon Code Section */}
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
  paymentIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    height: 50,
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
