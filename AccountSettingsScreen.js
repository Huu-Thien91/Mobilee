import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Lưu trạng thái cài đặt
import { useNavigation } from '@react-navigation/native';

export default function AccountSettingsScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState(''); // Thêm trường địa chỉ

  // Load dữ liệu từ AsyncStorage khi màn hình được khởi chạy
  useEffect(() => {
    const loadAccountSettings = async () => {
      try {
        const storedName = await AsyncStorage.getItem('accountName');
        const storedPhone = await AsyncStorage.getItem('accountPhone');
        const storedAddress = await AsyncStorage.getItem('accountAddress'); // Load địa chỉ

        if (storedName !== null) setName(storedName);
        if (storedPhone !== null) setPhone(storedPhone);
        if (storedAddress !== null) setAddress(storedAddress); // Set địa chỉ
      } catch (error) {
        console.error('Error loading account settings:', error);
      }
    };

    loadAccountSettings();
  }, []);

  // Lưu dữ liệu cài đặt tài khoản vào AsyncStorage
  const saveAccountSettings = async () => {
    try {
      await AsyncStorage.setItem('accountName', name);
      await AsyncStorage.setItem('accountPhone', phone);
      await AsyncStorage.setItem('accountAddress', address); // Lưu địa chỉ

      Alert.alert('Thành công', 'Cài đặt tài khoản đã được lưu!');
    } catch (error) {
      console.error('Error saving account settings:', error);
      Alert.alert('Lỗi', 'Không thể lưu cài đặt tài khoản.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.header}>Cài đặt tài khoản</Text>

      {/* Nhập Tên */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên của bạn"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Nhập Số Điện Thoại */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      {/* Nhập Địa Chỉ */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ của bạn"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Nút Lưu */}
      <TouchableOpacity style={styles.saveButton} onPress={saveAccountSettings}>
        <Text style={styles.saveButtonText}>Lưu cài đặt</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#000', // Đổi màu nút Lưu thành màu đen
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto', // Đẩy nút xuống dưới cùng
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute', // Đặt nút quay lại ở vị trí trên bên trái
    top: 40,
    left: 20,
    zIndex: 1, // Đảm bảo nút quay lại không bị che khuất
  },
});
