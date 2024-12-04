import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DataPackageInfoScreen({ route }) {
  const navigation = useNavigation();
  const { provider, package: packageName, price, logo } = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);

  // Format phone number for display (without affecting input)
  const formatPhoneNumber = (text) => {
    let formatted = text.replace(/\D/g, ''); // Remove non-numeric characters

    if (formatted.length > 3 && formatted.length <= 7) {
      formatted = formatted.replace(/(\d{4})(\d{0,3})/, '$1 $2');
    } else if (formatted.length > 7) {
      formatted = formatted.replace(/(\d{4})(\d{3})(\d{0,3})/, '$1 $2 $3');
    }

    return formatted;
  };

  const handlePhoneNumberChange = (text) => {
    // Check if the user is editing the input again, and reset the value
    if (text.length === 0 || text.length === phoneNumber.length - 1) {
      // If the input is empty or the user is deleting characters, reset phone number
      setPhoneNumber(text);
    } else {
      setPhoneNumber(text); // Update with new input
    }

    const cleanPhone = text.replace(/\s/g, ''); // Remove spaces for validation
    if (/^\d{10}$/.test(cleanPhone)) {
      setIsValidPhone(true);
    } else {
      setIsValidPhone(false);
    }
  };

  const handleRegisterPress = () => {
    if (!isValidPhone) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại hợp lệ');
      return;
    }

    // Close the keyboard when register button is pressed
    Keyboard.dismiss();

    // Navigate to the Payment screen and pass the phone number and package details
    navigation.navigate('Checkout', {
      phoneNumber,
      provider,
      package: packageName,
      price,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin Gói Data</Text>
      </View>

      {/* Package Information */}
      <View style={styles.packageContainer}>
        {/* Logo and Package Details */}
        <View style={styles.packageHeader}>
          <Image source={logo} style={styles.packageLogo} />
          <Text style={styles.packageName}>{packageName}</Text>
        </View>

        {/* Provider and Price */}
        <Text style={styles.provider}>{provider}</Text>
        <Text style={styles.price}>{price}</Text>

        {/* Description */}
        <Text style={styles.sectionTitle}>Mô tả</Text>
        <Text style={styles.description}>
          Gói {packageName} của {provider} giúp bạn sử dụng Internet một cách thoải mái với giá hấp dẫn.
        </Text>

        {/* Additional Information */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#FFC107" />
            <Text style={styles.infoText}>Thời hạn 30 ngày</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="pricetag-outline" size={20} color="#FFC107" />
            <Text style={styles.infoText}>Không giới hạn ứng dụng</Text>
          </View>
        </View>

        {/* Phone Number Input */}
        <TextInput
          style={styles.phoneInput}
          placeholder="Nhập số điện thoại"
          keyboardType="numeric"
          value={formatPhoneNumber(phoneNumber)} // Format phone number only for display
          onChangeText={handlePhoneNumberChange}
          maxLength={12} // Limit to 12 characters to accommodate spaces
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={[styles.registerButton, { backgroundColor: isValidPhone ? '#000' : '#ccc' }]}
        onPress={handleRegisterPress}
        disabled={!isValidPhone} // Disable button if phone number is not valid
      >
        <Text style={styles.registerButtonText}>Đăng ký ngay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  packageContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  packageHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  packageLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  packageName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 10,
    padding: 10,
  },
  provider: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  additionalInfo: {
    width: '100%',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#555',
  },
  phoneInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginBottom: 20,
  },
  registerButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
