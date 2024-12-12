// src/screens/LoginScreen.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { login } from "../services/api";
import { globalStyles } from "../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../contexts/UserContext";
import * as WebBrowser from "expo-web-browser";

export default function LoginScreen({ navigation }) {
  const { setUserId } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const result = login(email.trim(), password);
    if (result.success) {
      setError("");
      // Assume login returns userId: result.userId
      setUserId(result.userId);
      navigation.replace("DrawerNavigator");
    } else {
      setError(result.error);
    }
  };

  const quickLinks = [
    {
      name: "Quick Pay",
      icon: "cash-outline",
      url: "https://www.example.com/quickpay",
    },
    {
      name: "Payment Status Look-Up",
      icon: "search-outline",
      url: "https://www.example.com/paymentstatus",
    },
    {
      name: "Claim Estimate",
      icon: "document-text-outline",
      url: "https://www.example.com/claimestimate",
    },
    {
      name: "Help",
      icon: "help-circle-outline",
      url: "https://www.example.com/help",
    },
  ];

  const openInApp = async (url) => {
    await WebBrowser.openBrowserAsync(url, { toolbarColor: "#004170" });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          {/* Replace with your actual logo image */}
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Gradient Background */}
        <LinearGradient
          colors={["#004170", "#001B44"]}
          style={styles.gradientContainer}
        >
          <View style={styles.innerContainer}>
            {/* Form Card */}
            <View style={styles.formCard}>
              <Text style={[globalStyles.h2, styles.formTitle]}>
                Welcome Back
              </Text>

              <Text style={globalStyles.formLabel}>Email</Text>
              <TextInput
                style={globalStyles.formInput}
                placeholder="Enter your email"
                placeholderTextColor="#4e595d99"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={globalStyles.formLabel}>Password</Text>
              <TextInput
                style={globalStyles.formInput}
                placeholder="Enter your password"
                placeholderTextColor="#4e595d99"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
              />

              {error ? (
                <Text style={globalStyles.formError}>{error}</Text>
              ) : null}

              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text
                  style={[globalStyles.linkText, styles.forgotPasswordLink]}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={globalStyles.formButton}
                onPress={handleLogin}
              >
                <Text style={globalStyles.formButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={[globalStyles.linkText, styles.registerLink]}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider Line */}
            <View style={styles.divider} />

            {/* Quick Links Sub-Header */}
            <View style={styles.quickLinksHeader}>
              <Text style={styles.quickLinksHeaderText}>Quick Links</Text>
              <Text style={styles.quickLinksHeaderText}>No login required</Text>
            </View>

            {/* Quick Links Section */}
            <View style={styles.quickLinksContainer}>
              {quickLinks.map((link, index) => (
                <View key={link.name}>
                  <TouchableOpacity
                    style={styles.quickLinkRow}
                    onPress={() => openInApp(link.url)}
                  >
                    <Ionicons
                      name={link.icon}
                      size={20}
                      color="#FFFFFF"
                      style={styles.quickLinkIcon}
                    />
                    <Text style={[styles.quickLinkText, styles.quickLinkName]}>
                      {link.name}
                    </Text>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={20}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                  {index < quickLinks.length - 1 && (
                    <View style={styles.linkDivider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  logoContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 50,
    marginVertical: 20,
  },
  gradientContainer: { flex: 1 },
  innerContainer: { flex: 1, padding: 20 },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 40,
  },
  formTitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  forgotPasswordLink: {
    textAlign: "right",
    marginBottom: 10,
  },
  registerLink: {
    textAlign: "center",
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#4E595D",
    marginVertical: 20,
  },
  quickLinksHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  quickLinksHeaderText: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  quickLinksContainer: {},
  quickLinkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#4E595D",
  },
  quickLinkIcon: {
    marginRight: 10,
  },
  quickLinkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
  },
  quickLinkIconEnd: {
    marginLeft: 10,
  },
});
