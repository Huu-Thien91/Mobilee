import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';

export default function DataScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('Data');  // Trạng thái lưu tab đang chọn

  const dataPackages = [
    { id: 1, provider: 'Mobifone', package: '10GB + 200MB', price: '100k/30 ngày', logo: require('./assets/Mobip.png') },
    { id: 2, provider: 'Vina', package: '10GB + 200MB', price: '100k/30 ngày', logo: require('./assets/Vinap.png') },
    { id: 3, provider: 'Vietnammobil', package: '10GB + 200MB', price: '100k/30 ngày', logo: require('./assets/VIetnammobile.png') },
    { id: 4, provider: 'Viettel', package: '10GB + 200MB', price: '100k/30 ngày', logo: require('./assets/Viettel.png') },
    { id: 5, provider: 'Mobifone', package: '20GB + 500MB', price: '250k/30 ngày', logo: require('./assets/Mobip.png') },
    { id: 6, provider: 'Vina', package: '20GB + 250MB', price: '200k/30 ngày', logo: require('./assets/Vinap.png') },
    { id: 7, provider: 'Vietnammobil', package: '50GB + 1GB', price: '500k/30 ngày', logo: require('./assets/VIetnammobile.png') },
    { id: 8, provider: 'Viettel', package: '30GB + 500MB', price: '300k/30 ngày', logo: require('./assets/Viettel.png') },
  ];

  const handlePackagePress = (dataPackage) => {
    navigation.navigate('DataPackageInfoS', {
      provider: dataPackage.provider,
      package: dataPackage.package,
      price: dataPackage.price,
      logo: dataPackage.logo,
    });
  };

  const filteredPackages = dataPackages.filter((dataPackage) =>
    dataPackage.provider.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={24} color="gray" />
        <TextInput 
          placeholder="Nhập những gì bạn muốn" 
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
        <Text style={[styles.tab, styles.activeTab]}>Data/4G</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PhoneCard')}>
          <Text style={styles.tab}>Thẻ Điện Thoại</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text style={styles.tab}>Giới Thiệu</Text>
        </TouchableOpacity>
      </View>
      
      {/* ScrollView for Data Packages */}
      <ScrollView>
        {filteredPackages.map((dataPackage) => (
          <TouchableOpacity
            key={dataPackage.id}
            style={styles.packageCard}
            onPress={() => handlePackagePress(dataPackage)}
          >
            <Image source={dataPackage.logo} style={styles.logo} />
            <View style={styles.packageInfo}>
              <Text style={styles.provider}>{dataPackage.provider}</Text>
              <Text style={styles.package}>{dataPackage.package}</Text>
              <Text style={styles.price}>{dataPackage.price}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="gray" />
          </TouchableOpacity>
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
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  tab: {
    fontSize: 16,
    color: 'gray',
  },
  activeTab: {
    fontWeight: 'bold',
    color: 'black',
  },
  packageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  packageInfo: {
    flex: 1,
    marginLeft: 10,
  },
  provider: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  package: {
    color: 'gray',
    marginTop: 5,
  },
  price: {
    marginTop: 5,
    fontWeight: 'bold',
    color: 'orange',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
