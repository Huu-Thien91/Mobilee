import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const purchaseHistory = [
  {
    id: '1',
    orderNumber: 'Đơn Hàng 1',
    status: 'Đã Nhận Hàng',
    date: '20-10 đến 21-10',
    brand: 'Viettel',
    itemName: 'Sim số đẹp',
    phoneNumber: '0863.471.258',
    price: '100.000 VND',
  },
  {
    id: '2',
    orderNumber: 'Đơn Hàng 2',
    status: 'Đã Nhận Hàng',
    date: '20-10 đến 21-10',
    brand: 'Viettel',
    itemName: 'Sim số đẹp',
    phoneNumber: '0863.471.258',
    price: '100.000 VND',
  },
  {
    id: '3',
    orderNumber: 'Đơn Hàng 3',
    status: 'Đang trên đường giao',
    date: '20-10 đến 21-10',
    brand: 'Viettel',
    itemName: 'Sim số đẹp',
    phoneNumber: '0863.471.258',
    price: '100.000 VND',
  },
];

export default function PurchaseHistoryScreen() {
  const navigation = useNavigation();  // Hook useNavigation để chuyển hướng

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
        <Text style={styles.orderStatus}>{item.status}</Text>
      </View>
      <View style={styles.orderDetails}>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.itemName}</Text>
          <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}> {/* Chuyển hướng về màn hình Home */}
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.headerTitle}>Lịch Sử Mua Hàng</Text>
        </TouchableOpacity>
        <Text style={styles.subHeader}>Đơn hàng đã mua gần đây</Text>
      </View>
      <FlatList
        data={purchaseHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerContainer: {
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
  },
  listContent: {
    paddingBottom: 20,
  },
  orderContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    fontSize: 14,
    color: '#28a745',
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBrand: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d9534f',
    paddingHorizontal: 8,
    borderRadius: 5,
    borderColor: '#d9534f',
    borderWidth: 1,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 16,
    color: '#d9534f',
    fontWeight: 'bold',
  },
});
