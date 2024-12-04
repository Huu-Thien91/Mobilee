import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation(); // Lấy đối tượng navigation

  return (
    <View style={styles.container}>
      {/* Nội dung cuộn được */}
      <ScrollView style={styles.contentContainer}>
        {/* Thanh tìm kiếm */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={24} color="gray" />
          <TextInput placeholder="Nhập những gì bạn muốn" style={styles.searchInput} />
          <Ionicons name="options-outline" size={24} color="gray" />
        </View>

        {/* Thanh điều hướng tab */}
        <View style={styles.tabContainer}>
          <Text style={[styles.tab, styles.activeTab]}>Home</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sim')}>
            <Text style={styles.tab}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Data')}>
            <Text style={styles.tab}>Data 4G</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PhoneCard')}>
            <Text style={styles.tab}>Thẻ Điện Thoại</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <Text style={styles.tab}>Giới Thiệu</Text>
          </TouchableOpacity>
        </View>

        {/* Banner quảng cáo */}
        <View style={styles.bannerContainer}>
          <Image
            source={require('./assets/1234.jpg')} // Thay bằng đường dẫn ảnh của bạn
            style={styles.bannerImage}
          />
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Tham gia ngay</Text>
          </TouchableOpacity>
        </View>

        {/* Danh mục sản phẩm */}
        <View style={styles.productContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Sim')}>
            <View style={styles.productItem}>
              <Image source={require('./assets/sim-card.png')} style={styles.productImage} /> {/* Ảnh danh mục Sim */}
              <Text style={styles.productText}>Danh mục Sim</Text>
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>Giảm 10%</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PhoneCard')}>
            <View style={styles.productItem}>
              <Image source={require('./assets/sim-card.png')} style={styles.productImage} /> {/* Ảnh thẻ điện thoại */}
              <Text style={styles.productText}>Thẻ điện thoại</Text>
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>Giảm 5%</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Data')}>
            <View style={styles.productItem}>
              <Image source={require('./assets/4g-connection.png')} style={styles.productImage} /> {/* Ảnh gói cước */}
              <Text style={styles.productText}>Gói Cước</Text>
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>Giảm 25%</Text>
              </View>
            </View>
          </TouchableOpacity>          
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <View style={styles.productItem}>
              <Image source={require('./assets/tb.png')} style={styles.productImage} /> {/* Ảnh thông báo */}
              <Text style={styles.productText}>Thông Báo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <View style={styles.productItem}>
              <Image source={require('./assets/settings.png')} style={styles.productImage} /> {/* Ảnh cài đặt */}
              <Text style={styles.productText}>Cài Đặt</Text>
            </View>
          </TouchableOpacity>
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
  contentContainer: {
    flex: 1,
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
  bannerContainer: {
    margin: 10,
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  bannerButton: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#ff3d00',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  bannerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productContainer: {
    padding: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    position: 'relative',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  productText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  discountTag: {
    backgroundColor: '#ff3d00',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    position: 'absolute',
    right: 0,
    top: 15,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
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
  activeDot: {
    width: 6,
    height: 6,
    backgroundColor: '#000',
    borderRadius: 3,
    marginTop: 4,
  },
});
