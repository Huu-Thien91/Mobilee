import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function PhoneCardScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const phoneCardList = [
    {
      id: 1,
      provider: 'Mobifone',
      logo: require('./assets/Mobip.png'),
      prices: ['10.000 VND', '20.000 VND', '50.000 VND', '100.000 VND', '200.000 VND', '500.000 VND']
    },
    {
      id: 2,
      provider: 'Vina',
      logo: require('./assets/Vinap.png'),
      prices: ['10.000 VND', '20.000 VND', '50.000 VND', '100.000 VND', '200.000 VND', '500.000 VND']
    },
    {
      id: 3,
      provider: 'Viettel',
      logo: require('./assets/Viettel.png'),
      prices: ['10.000 VND', '20.000 VND', '50.000 VND', '100.000 VND', '200.000 VND', '500.000 VND']
    },
    {
      id: 4,
      provider: 'Vietnamobile',
      logo: require('./assets/VIetnammobile.png'),
      prices: ['10.000 VND', '20.000 VND', '50.000 VND', '100.000 VND', '200.000 VND', '500.000 VND']
    }
  ];

  // Hàm điều hướng đến RegistrationScreen với thông tin mệnh giá
  const handlePriceSelect = (provider, price, logo) => {
    navigation.navigate('RegistrationScreen', {
      provider,
      price,
      logo,
      package: price // Gói cước là giá của mệnh giá
    });
  };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color="gray" />
        <TextInput 
          placeholder="Tìm theo nhà mạng hoặc mệnh giá" 
          style={styles.searchInput} 
          value={searchText}
          onChangeText={setSearchText} // Cập nhật giá trị tìm kiếm
        />
        <Ionicons name="options-outline" size={24} color="gray" />
      </View>

      {/* Thanh điều hướng tab */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tab}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Sim')}>
          <Text style={styles.tab}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Data')}>
          <Text style={styles.tab}>Data 4G</Text>
        </TouchableOpacity>
        <Text style={[styles.tab, styles.activeTab]}>Thẻ Điện Thoại</Text>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text style={styles.tab}>Giới Thiệu</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách thẻ điện thoại */}
      <ScrollView>
        {phoneCardList.map((card) => (
          <View key={card.id} style={styles.cardContainer}>
            {/* Logo nhà mạng */}
            <Image source={card.logo} style={styles.logo} />

            {/* Mệnh giá */}
            <View style={styles.priceContainer}>
              <Text style={styles.priceTitle}>Mệnh giá</Text>
              <View style={styles.pricesRow}>
                <View style={styles.leftColumn}>
                  {card.prices.slice(0, 3).map((price, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.priceBox} 
                      onPress={() => handlePriceSelect(card.provider, price, card.logo)}>
                      <Text style={styles.priceText}>{price}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.rightColumn}>
                  {card.prices.slice(3, 6).map((price, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.priceBox} 
                      onPress={() => handlePriceSelect(card.provider, price, card.logo)}>
                      <Text style={styles.priceText}>{price}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

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
  cardContainer: {
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
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  priceContainer: {
    flex: 1,
    marginLeft: 10,
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  pricesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    alignItems: 'center', // Canh giữa cột trái
  },
  rightColumn: {
    flex: 1,
    alignItems: 'center', // Canh giữa cột phải
  },
  priceBox: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
