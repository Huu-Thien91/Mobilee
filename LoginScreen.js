import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen({ route, navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Trạng thái ghi nhớ tài khoản
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  // Tự động nhận thông tin tài khoản từ màn hình đăng ký
  useEffect(() => {
    const fetchTempCredentials = async () => {
      const tempPhone = await AsyncStorage.getItem('tempPhoneNumber');
      const tempPass = await AsyncStorage.getItem('tempPassword');
      if (tempPhone && tempPass) {
        setPhoneNumber(tempPhone);
        setPassword(tempPass);
      }
    };
    fetchTempCredentials();
  }, []);

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    try {
      const storedPhoneNumber = await AsyncStorage.getItem('storedPhoneNumber'); // Lấy số điện thoại đã lưu
      const storedPassword = await AsyncStorage.getItem('storedPassword'); // Lấy mật khẩu đã lưu

      if (phoneNumber === storedPhoneNumber && password === storedPassword) {
        if (rememberMe) {
          await AsyncStorage.setItem('phoneNumber', phoneNumber); // Lưu số điện thoại
          await AsyncStorage.setItem('password', password); // Lưu mật khẩu
        } else {
          await AsyncStorage.removeItem('phoneNumber'); // Xóa nếu không ghi nhớ
          await AsyncStorage.removeItem('password'); // Xóa nếu không ghi nhớ
        }

        // Điều hướng đến màn hình Home
        navigation.navigate('Home');
      } else {
        Alert.alert('Lỗi', 'Tài khoản hoặc mật khẩu không chính xác.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xử lý đăng nhập. Vui lòng thử lại.');
    }
  };

  // Tự động điền thông tin nếu đã ghi nhớ
  const loadRememberedCredentials = async () => {
    try {
      const rememberedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
      const rememberedPassword = await AsyncStorage.getItem('password');
      if (rememberedPhoneNumber && rememberedPassword) {
        setPhoneNumber(rememberedPhoneNumber);
        setPassword(rememberedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.error('Lỗi khi tải thông tin đăng nhập đã ghi nhớ:', error);
    }
  };

  useEffect(() => {
    loadRememberedCredentials(); // Gọi hàm khi component mount
  }, []);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Số điện thoại"
          style={styles.input}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange} // Áp dụng logic định dạng
          maxLength={12} // Bao gồm cả khoảng trắng
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Mật khẩu"
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="black"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Ghi nhớ mật khẩu */}
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <Ionicons
            name={rememberMe ? 'checkbox-outline' : 'square-outline'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Ghi nhớ mật khẩu</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordLink}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
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
  eyeIcon: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordLink: {
    color: '#ffa500',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  registerText: {
    color: '#000',
  },
  registerLink: {
    color: '#ffa500',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
