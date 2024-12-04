import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Tự động cập nhật giờ mỗi giây
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Tự động chuyển đến màn hình Đăng nhập sau 5 giây
    const navigateTimer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);

    // Xóa timer khi component bị unmount
    return () => {
      clearInterval(timer);
      clearTimeout(navigateTimer);
    }; 
  }, [navigation]);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const day = time.getDate();
  const month = time.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = time.getFullYear();

  return (
    <ImageBackground
      source={require('./assets/anhnen.jpg')}
      style={styles.background}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          {/* Hiển thị giờ */}
          <Text style={styles.time}>{`${hours}:${minutes}:${seconds}`}</Text>

          {/* Hiển thị ngày tháng năm */}
          <Text style={styles.date}>{`${day}/${month}/${year}`}</Text>

          {/* Tiêu đề */}
          <Text style={styles.title}>Welcome to SIM Store</Text>
          <Text style={styles.subtitle}>Mua SIM, kết nối nhanh</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,  // Thêm khoảng cách dưới giờ
  },
  date: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 20,  // Thêm khoảng cách dưới ngày tháng
  },
});

export default WelcomeScreen;
