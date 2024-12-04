import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePhoneNumberChange = (text) => {
    // Loại bỏ tất cả các ký tự không phải số và khoảng trắng
    const cleanedText = text.replace(/\D/g, '');

    // Định dạng theo nhóm xxxx xxx xxx
    let formattedText = cleanedText;
    if (cleanedText.length > 4 && cleanedText.length <= 7) {
      formattedText = `${cleanedText.slice(0, 4)} ${cleanedText.slice(4)}`;
    } else if (cleanedText.length > 7) {
      formattedText = `${cleanedText.slice(0, 4)} ${cleanedText.slice(4, 7)} ${cleanedText.slice(7)}`;
    }

    setPhoneNumber(formattedText); // Cập nhật giá trị với định dạng
  };


  const handleRegister = async () => {
    if (!phoneNumber || !password || password !== confirmPassword) {
      Alert.alert('Lỗi', 'mật khẩu nhập lại không đúng.');
      return;
    }
  
    try {
      await AsyncStorage.setItem('storedPhoneNumber', phoneNumber); // Lưu số điện thoại
      await AsyncStorage.setItem('storedPassword', password); // Lưu mật khẩu
      await AsyncStorage.setItem('storedLastName', lastName); // Lưu họ
      await AsyncStorage.setItem('storedFirstName', firstName); // Lưu tên
      await AsyncStorage.setItem('storedAddress', address); // Lưu địa chỉ
      await AsyncStorage.setItem('storedCreationDate', new Date().toISOString());

      Alert.alert('Thành công', 'Tài khoản đã được tạo!');
      navigation.navigate('Login'); // Điều hướng sang LoginScreen
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tạo tài khoản. Vui lòng thử lại.');
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng ký</Text>

      {/* Input Fields */}
      <TextInput
        placeholder="Họ"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        editable={true}
      />
      <TextInput
        placeholder="Tên"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        editable={true}
      />
      <TextInput
        placeholder="Địa chỉ"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        editable={true}
      />
      <TextInput
        placeholder="Số điện thoại"
        style={styles.input}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange} // Áp dụng logic định dạng
        maxLength={12} // Bao gồm cả khoảng trắng
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Mật khẩu"
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Nhập lại mật khẩu"
          style={styles.passwordInput}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons
            name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Đăng ký</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Bạn đã có tài khoản ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
  backgroundColor: '#f0f0f0', // Màu nền sáng
  borderRadius: 25,
  height: 50,
  paddingHorizontal: 20,
  marginBottom: 15,
  color: '#000', // Màu chữ đảm bảo hiển thị
},
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
  },
  registerButton: {
    backgroundColor: '#000',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#000',
  },
  loginLink: {
    fontSize: 16,
    color: '#ffa500',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
