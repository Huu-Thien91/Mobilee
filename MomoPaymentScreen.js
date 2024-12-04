import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';  // Import QRCode

export default function MomoPaymentScreen({ route, navigation }) {
  const [couponCode, setCouponCode] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [paymentCode, setPaymentCode] = useState(''); // Mã thanh toán ngẫu nhiên
  const [qrValue, setQrValue] = useState(''); // Chuỗi mã QR

  // Hàm định dạng giá tiền theo VND
  const formatCurrency = (value) => {
    if (!value || isNaN(value)) return '';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // Hàm tạo mã thanh toán ngẫu nhiên
  const generateRandomPaymentCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Nhận dữ liệu từ `route.params` hoặc `AsyncStorage`
  useEffect(() => {
    const loadTotalAmount = async () => {
      try {
        if (route.params?.totalAmount) {
          setTotalAmount(route.params.totalAmount.toString()); // Gán từ route.params
        } else {
          const storedAmount = await AsyncStorage.getItem('totalAmount');
          if (storedAmount) {
            setTotalAmount(storedAmount); // Gán từ AsyncStorage
          }
        }

        // Tạo mã thanh toán ngẫu nhiên và tạo mã QR
        const paymentCode = generateRandomPaymentCode();
        setPaymentCode(paymentCode);
        setQrValue(`momo://payment?amount=${totalAmount}&receiver=0965346160&description=Thanh toán hóa đơn&paymentCode=${paymentCode}`);
      } catch (error) {
        console.error('Error loading total amount:', error);
      }
    };

    loadTotalAmount();
  }, [route.params, totalAmount]);

  // Lưu giá trị tổng thanh toán vào AsyncStorage
  const saveTotalAmount = async (value) => {
    try {
      await AsyncStorage.setItem('totalAmount', value);
    } catch (error) {
      console.error('Error saving total amount:', error);
    }
  };

  // Xử lý thay đổi trong ô nhập tổng thanh toán
  const handleTotalAmountChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Loại bỏ các ký tự không phải số
    setTotalAmount(numericValue);
    saveTotalAmount(numericValue); // Lưu vào AsyncStorage
  };

  // Hàm xử lý thanh toán khi nhấn nút "Xác nhận thanh toán"
  const handlePayment = () => {
    // Hiển thị thông báo sau khi thanh toán
    Alert.alert(
      "Thông báo",
      `Bạn đã thanh toán thành công số tiền ${formatCurrency(totalAmount)}. Mã thanh toán: ${paymentCode}`,
      [
        {
          text: "OK",
          onPress: () => {
            // Chuyển hướng về trang Home
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thanh toán MOMO</Text>

      {/* Phương thức thanh toán MOMO */}
      <View style={styles.paymentMethod}>
        <Image source={require('./assets/Momo-icon.png')} style={styles.paymentIcon} />
        <Text style={styles.paymentText}>Momo</Text>
        <Ionicons name="radio-button-on" size={24} color="black" />
      </View>

      {/* Mã QR với logo MOMO */}
      <View style={styles.qrCodeContainer}>
        {qrValue && (
          <View style={styles.qrWrapper}>
            <QRCode
              value={qrValue} // Sử dụng mã thanh toán ngẫu nhiên tạo ra mã QR
              size={200}
              color="black"
              backgroundColor="white"
            />
            {/* Chèn logo vào giữa mã QR */}
            <Image
              source={require('./assets/Momo-icon.png')} // Logo Momo
              style={styles.qrLogo}
            />
          </View>
        )}
      </View>

      {/* Mã giảm giá */}
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
        placeholder="Mời nhập số tiền thanh toán"
        value={totalAmount ? formatCurrency(totalAmount) : ''} // Định dạng giá trị hiển thị
        onChangeText={handleTotalAmountChange} // Lưu vào AsyncStorage khi thay đổi
        style={styles.totalInput}
        keyboardType="numeric" // Hiển thị bàn phím số
      />

      {/* Nút Tiếp tục */}
      <TouchableOpacity style={styles.continueButton} onPress={handlePayment}>
        <Text style={styles.continueText}>Xác nhận thanh toán</Text>
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
  qrCodeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrWrapper: {
    position: 'relative',
    width: 200,
    height: 200,
  },
  qrLogo: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: '38%',
    left: '38%',
    resizeMode: 'contain',
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
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
