import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Thêm useNavigation để sử dụng navigation

export default function AboutScreen() {
  const navigation = useNavigation(); // Khởi tạo đối tượng navigation
  const [activeTab, setActiveTab] = useState('Giới Thiệu'); // Trạng thái để quản lý tab đang được chọn

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color="gray" />
        <TextInput placeholder="Nhập những gì bạn muốn" style={styles.searchInput} />
        <Ionicons name="options-outline" size={24} color="gray" />
      </View>

      {/* Thanh điều hướng tab */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => { setActiveTab('Home'); navigation.navigate('Home'); }}>
          <Text style={[styles.tab, activeTab === 'Home' && styles.activeTab]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setActiveTab('Sim'); navigation.navigate('Sim'); }}>
          <Text style={[styles.tab, activeTab === 'Sim' && styles.activeTab]}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setActiveTab('Data'); navigation.navigate('Data'); }}>
          <Text style={[styles.tab, activeTab === 'Data' && styles.activeTab]}>Data 4G</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setActiveTab('PhoneCard'); navigation.navigate('PhoneCard'); }}>
          <Text style={[styles.tab, activeTab === 'PhoneCard' && styles.activeTab]}>Thẻ Điện Thoại</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setActiveTab('Giới Thiệu'); navigation.navigate('About'); }}>
          <Text style={[styles.tab, activeTab === 'Giới Thiệu' && styles.activeTab]}>Giới Thiệu</Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung cuộn */}
      <ScrollView contentContainerStyle={styles.contentContainer}> {/* contentContainerStyle để đảm bảo cuộn cả trang */}
        {/* Hình ảnh giới thiệu */}
        <Image
          source={require('./assets/gt.png')} // Thay bằng đường dẫn ảnh của bạn
          style={styles.introImage}
        />

        {/* Văn bản giới thiệu */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            • Chúng tôi là đội ngũ chuyên nghiệp và nhiệt huyết, chuyên cung cấp sim và thẻ điện thoại với nhiều ưu đãi hấp dẫn. Với các loại sim đa dạng từ sim số đẹp đến sim data khủng, chúng tôi luôn sẵn sàng tư vấn và hỗ trợ khách hàng tìm sản phẩm phù hợp.
          </Text>
          <Text style={styles.text}>
            • Với phương châm "Tiện lợi - Minh bạch - Uy tín", chúng tôi cam kết mang đến trải nghiệm mua sắm nhanh chóng và đáng tin cậy, đồng hành cùng bạn trong mọi kết nối cuộc sống.
          </Text>
        </View>
      </ScrollView>

      {/* Thanh điều hướng dưới cùng */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Person')}>
          <Ionicons name="person-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Ionicons name="notifications-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  tab: {
    fontSize: 16,
    color: 'gray',
  },
  activeTab: {
    color: '#000',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 10,
    flexGrow: 1, // Đảm bảo nội dung có thể cuộn lên và xuống
  },
  introImage: {
    width: '100%',
    height: 250, // Chỉnh sửa chiều cao của hình ảnh
    borderRadius: 10,
    marginBottom: 20,
  },
  textContainer: {
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#333',
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
