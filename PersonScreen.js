import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Share } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function PersonScreen() {
  const navigation = useNavigation();
  const route = useRoute();  // Dùng để nhận dữ liệu từ route params
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [registrationDate, setRegistrationDate] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Nếu có ngày đăng ký từ params, sử dụng ngày đó
    if (route.params?.registrationDate) {
      setRegistrationDate(route.params.registrationDate);
    } else {
      loadRegistrationDate();
    }

    const fetchData = async () => {
      try {
        const storedLastName = await AsyncStorage.getItem('storedLastName') || '';
        const storedFirstName = await AsyncStorage.getItem('storedFirstName') || '';
        const storedPhoneNumber = await AsyncStorage.getItem('storedPhoneNumber') || '';
        const storedAddress = await AsyncStorage.getItem('storedAddress') || '';

        setLastName(storedLastName);
        setFirstName(storedFirstName);
        setPhoneNumber(storedPhoneNumber);
        setAddress(storedAddress);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ AsyncStorage:', error);
      }
    };

    fetchData();
  }, [route.params?.registrationDate]);  // Theo dõi thay đổi từ route.params

  const loadRegistrationDate = async () => {
    try {
      const storedDate = await AsyncStorage.getItem('storedCreationDate');
      if (storedDate) {
        setRegistrationDate(storedDate);  // Lưu ngày vào state
      }
    } catch (error) {
      console.error('Lỗi khi lấy ngày đăng ký:', error);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('storedLastName', lastName);
      await AsyncStorage.setItem('storedFirstName', firstName);
      setIsEditing(false); // Thoát chế độ chỉnh sửa
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.input}
              placeholder="Họ"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Tên"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.displayContainer}>
            <Text style={styles.name}>{`${firstName} ${lastName}`.trim()}</Text>
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setIsEditing(true)}>
              <Ionicons name="pencil-outline" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.email}>{phoneNumber}</Text>
      </View>

      {/* Action Buttons */}
      <ScrollView style={styles.actionContainer}>
        {[ 
          {
            source: require('./assets/calendar-icon.png'),
            text: registrationDate ? (
              <Text>
                Ngày đăng ký: 
                <Text style={styles.dateText}>{"\n"}{formatDate(registrationDate)}</Text>
              </Text>
            ) : 'Ngày đăng ký chưa có',
            onPress: () => navigation.navigate('RegistrationDate'),
          },
          {
            source: require('./assets/address-icon.png'),
            text: address ? (
              <Text>
                Địa chỉ: 
                <Text style={styles.addressText}>{"\n"}{address}</Text>
              </Text>
            ) : 'Địa chỉ chưa có',
            onPress: () => navigation.navigate('AddressScreen'),
          },
          {
            source: require('./assets/settings-icon.png'),
            text: 'Đổi mật khẩu',
            onPress: () => navigation.navigate('ChangePassword'),
          },
          {
            source: require('./assets/contact-icon.png'),
            text: 'Liên hệ',
            onPress: () => navigation.navigate('ContactScreen'),
          },
          {
            source: require('./assets/rate-icon.png'),
            text: 'Đánh giá',
            onPress: () => {
              Alert.alert('Đánh giá', 'Cảm ơn bạn đã đánh giá!');
            },
          },
          {
            source: require('./assets/share-icon.png'),
            text: 'Chia sẻ',
            onPress: () => {
              Share.share({
                message: 'Hãy tham gia ứng dụng của chúng tôi!',
              });
            },
          },
          {
            source: require('./assets/logout-icon.png'),
            text: 'Đăng xuất',
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            }),
          },
          {

            text: '  ',
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            }),
          },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionButton}
            onPress={item.onPress}
          >
            <Image source={item.source} style={styles.actionIcon} />
            <Text style={styles.actionText}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Notification')}>
          <Ionicons name="notifications-outline" size={24} color="gray" />
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
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
    marginBottom: 50,
    marginTop: 130,
    justifyContent: 'flex-end'
  },
  displayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 30,
  },
  email: {
    marginTop: 13,
    fontSize: 28,
    color: '#888',
  },
  editContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 200,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },

  addressText: {
    color: '#007BFF',  
    fontWeight: 'bold',
  },
  actionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: '110%',
    marginHorizontal: 35, 
    backgroundColor: '#fff',
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15, 
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3, 
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
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
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 56,
    color: '#555',
  },
});
