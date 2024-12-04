import React, { useState } from 'react'; // Đảm bảo đã import useState
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen'; 
import AboutScreen from './AboutScreen';
import DataScreen from './DataScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import NewPasswordScreen from './NewPasswordScreen';
import NotificationScreen from './NotificationScreen';
import PhoneCardScreen from './PhoneCardScreen';
import RegisterScreen from './RegisterScreen';
import SettingsScreen from './SettingsScreen';
import SimScreen from './SimScreen';
import PersonScreen from './PersonScreen';
import ShoppingCartScreen from './ShoppingCartScreen';
import CheckoutScreen from './CheckoutScreen';
import MomoPaymentScreen from './MomoPaymentScreen';
import VisaPaymentScreen from './VisaPaymentScreen';
import PhoneCardPaymentScreen from './PhoneCardPaymentScreen';
import SimInfoScreen from './SimInfoScreen';
import DataPackageInfoScreen from './DataPackageInfoScreen';
import PurchaseHistoryScreen from './PurchaseHistoryScreen';
import ChatBot from './Chatbot'; // Import ChatBot component
import RegistrationScreen from './RegistrationScreen';
import AccountSettingsScreen from './AccountSettingsScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
const Stack = createStackNavigator();

export default function App() {
  const [showChatBot, setShowChatBot] = useState(true);

  const handleRouteChange = (state) => {
    const routesWithoutChatBot = [
      'Login',
      'Register',
      'ForgotPassword',
      'NewPassword',
      'SimStore',
    ];
    const currentRoute = state.routes[state.index]?.name;
    setShowChatBot(!routesWithoutChatBot.includes(currentRoute));
  };

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} // Ẩn tiêu đề trên màn hình Welcome
        />
         <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Ẩn tiêu đề màn hình đăng nhập
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Đăng ký', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: 'Quên Mật Khẩu', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPasswordScreen}
          options={{ title: 'Tạo Mật Khẩu Mới', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Ẩn tiêu đề màn hình Home
        />
        <Stack.Screen
          name="Sim"
          component={SimScreen}
          options={{ title: 'SIM', headerTitleAlign: 'center', animationEnabled: false  }}
        />
        <Stack.Screen
          name="Data"
          component={DataScreen}
          options={{ title: 'Data/4G', headerTitleAlign: 'center', animationEnabled: false  }}
        />
        <Stack.Screen
          name="PhoneCard"
          component={PhoneCardScreen}
          options={{ title: 'Thẻ điện thoại', headerTitleAlign: 'center', animationEnabled: false  }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{  title: 'Giới thiệu', headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ title: 'Thông báo', headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Cài đặt', headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="Person"
          component={PersonScreen}
          options={{title: 'Thông tin cá nhân', headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="Cart"
          component={ShoppingCartScreen}
          options={{ headerShown: false, headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ headerShown: false, headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="MomoPayment"
          component={MomoPaymentScreen}
          options={{ headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="VisaPayment"
          component={VisaPaymentScreen}
          options={{ headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="PhoneCardPayment"
          component={PhoneCardPaymentScreen}
          options={{ headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="SimInfo"
          component={SimInfoScreen}
          options={{ headerShown: false, headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="DataPackageInfoS"
          component={DataPackageInfoScreen}
          options={{ headerShown: false, headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="PurchaseHistory"
          component={PurchaseHistoryScreen}
          options={{ headerShown: false, headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{ headerShown: false, headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="AccountSettings"
          component={AccountSettingsScreen}
          options={{ headerShown: false, headerTitleAlign: 'center', animationEnabled: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{ headerShown: false, headerTitleAlign: 'center', animationEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
 {/* Conditionally display ChatBot */}
{showChatBot && <ChatBot />}
</> 
);
}
