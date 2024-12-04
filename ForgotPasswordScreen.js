import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false); // Theo dõi trạng thái gửi OTP

  // Giả lập gửi OTP
  const sendOtp = () => {
    if (!phoneNumber) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại');
      return;
    }
    Alert.alert('Mã OTP đã được gửi', `Mã OTP đã được gửi đến: ${phoneNumber}`);
    setIsOtpSent(true); // Đánh dấu OTP đã gửi
  };

  // Xử lý khi bấm "Tiếp tục"
  const handleContinue = () => {
    if (!otp) {
      Alert.alert('Lỗi', 'Vui lòng nhập mã OTP');
      return;
    }
    if (otp === '1234') {
      navigation.navigate('NewPassword'); // Điều hướng đến màn hình tạo mật khẩu
    } else {
      Alert.alert('Lỗi', 'Mã OTP không hợp lệ');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên Mật Khẩu</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Số điện thoại"
          style={styles.input}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {isOtpSent && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Mã OTP"
            style={styles.input}
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
        </View>
      )}

      {!isOtpSent ? (
        <TouchableOpacity style={styles.continueButton} onPress={sendOtp}>
          <Text style={styles.continueButtonText}>Gửi mã OTP</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Tiếp Tục</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    width: '80%',
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  continueButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginBottom: 15,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
