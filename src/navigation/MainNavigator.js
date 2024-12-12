// src/navigation/MainNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Screens
import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import PolicyDetailsScreen from "../screens/PolicyDetailsScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import MyPreferencesScreen from "../screens/MyPreferencesScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import eDocEnrolmentScreen from "../screens/EDocEnrolmentScreen";

import FileClaimScreen from "../screens/FileClaimScreen";
import MakePaymentScreen from "../screens/MakePaymentScreen";
import PolicyDocumentsScreen from "../screens/PolicyDocumentsScreen";
import PolicyBillingScreen from "../screens/PolicyBillingScreen";
import PolicyClaimsScreen from "../screens/PolicyClaimsScreen";

import MessagesScreen from "../screens/MessagesScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import FAQScreen from "../screens/FAQScreen";
import AddPolicyScreen from "../screens/AddPolicyScreen"; // Import AddPolicyScreen

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#F0F2F5", width: 250 },
        drawerActiveTintColor: "#004170",
        drawerInactiveTintColor: "#4E595D",
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="My Profile" component={MyProfileScreen} />
      <Drawer.Screen name="My Preferences" component={MyPreferencesScreen} />
      <Drawer.Screen name="Change Password" component={ChangePasswordScreen} />
      <Drawer.Screen name="eDoc Enrolment" component={eDocEnrolmentScreen} />
    </Drawer.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      {/* Authentication Screens */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Main App Screens */}
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="PolicyDetails" component={PolicyDetailsScreen} />

      {/* Internal Action Screens */}
      <Stack.Screen name="FileClaim" component={FileClaimScreen} />
      <Stack.Screen name="MakePayment" component={MakePaymentScreen} />
      <Stack.Screen name="PolicyDocuments" component={PolicyDocumentsScreen} />
      <Stack.Screen name="PolicyBilling" component={PolicyBillingScreen} />
      <Stack.Screen name="PolicyClaims" component={PolicyClaimsScreen} />

      {/* Header Icon Screens */}
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />

      {/* Add Policy Screen */}
      <Stack.Screen name="AddPolicy" component={AddPolicyScreen} />
    </Stack.Navigator>
  );
}
