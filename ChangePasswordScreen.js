import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }

    try {
      // Lấy mật khẩu hiện tại từ AsyncStorage
      const storedPassword = await AsyncStorage.getItem('storedPassword');

      if (storedPassword !== currentPassword) {
        Alert.alert('Lỗi', 'Mật khẩu hiện tại không đúng!');
        return;
      }

      // Lưu mật khẩu mới vào AsyncStorage
      await AsyncStorage.setItem('storedPassword', newPassword);

      Alert.alert('Thành công', 'Mật khẩu đã được thay đổi!');
      navigation.goBack(); // Quay lại màn hình trước đó (SettingsScreen)
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Lỗi', 'Không thể thay đổi mật khẩu.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Đổi mật khẩu</Text>

      {/* Nhập mật khẩu hiện tại */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Mật khẩu hiện tại"
          style={styles.passwordInput}
          secureTextEntry={!showCurrentPassword}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
          <Ionicons
            name={showCurrentPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Nhập mật khẩu mới */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Mật khẩu mới"
          style={styles.passwordInput}
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
          <Ionicons
            name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Nhập lại mật khẩu mới */}
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

      {/* Nút Lưu thay đổi */}
      <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
        <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
  saveButton: {
    backgroundColor: '#000',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 'auto', // Đặt nút ở dưới cùng
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
