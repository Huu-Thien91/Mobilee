import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotificationScreen() {
  const navigation = useNavigation(); // Lấy đối tượng navigation


  // Dữ liệu mẫu cho thông báo
  const notifications = [
    { id: 1, title: 'Đã Mua', date: '12/10/2024', isNew: true },
    { id: 2, title: 'Đã Mua ', date: '13/10/2024', isNew: true },
    { id: 3, title: 'Đã Mua', date: '14/10/2024', isNew: true },
    { id: 4, title: 'Đã Mua', date: '15/10/2024', isNew: true },
    { id: 5, title: 'Đã Mua', date: '16/10/2024', isNew: true },
    { id: 6, title: 'Chưa Thanh Toán', date: '17/10/2024', isNew: true },
    { id: 7, title: 'Chưa Thanh Toán', date: '18/10/2024', isNew: true },
    { id: 8, title: 'Chưa Thanh Toán', date: '19/10/2024', isNew: true },
    { id: 9, title: 'Chưa Thanh Toán', date: '20/10/2024', isNew: true },
    { id: 10, title: 'Chưa Thanh Toán', date: '21/10/2024', isNew: true },
  ];

  return (
    <View style={styles.container}>

      {/* Danh sách thông báo */}
      <ScrollView style={styles.contentContainer}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            <View style={styles.notificationLeft}>
              <Image
                source={require('./assets/tb.png')}  // Thay bằng đường dẫn đến biểu tượng chuông của bạn
                style={styles.notificationIcon}
              />
              {notification.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newText}>NEW</Text>
                </View>
              )}
            </View>
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDate}>{notification.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Thanh điều hướng dưới cùng */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Person')}>
          <Ionicons name="person-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="gray" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 70,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    marginLeft: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 5,
  },
  notificationLeft: {
    position: 'relative',
  },
  notificationIcon: {
    width: 40,
    height: 40,
  },
  newBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff3d00',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  newText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  notificationInfo: {
    flex: 1,
    marginLeft: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDate: {
    color: 'gray',
    marginTop: 5,
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
