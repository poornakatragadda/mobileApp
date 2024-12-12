// src/screens/RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from "../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerUser } from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = () => {
    setSuccessMsg("");
    const result = registerUser(email.trim(), password, confirmPassword);
    if (result.success) {
      setError("");
      setSuccessMsg("Registration successful! Please login.");
    } else {
      setError(result.error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <LinearGradient
          colors={["#004170", "#001B44"]}
          style={styles.gradientContainer}
        >
          <View style={styles.innerContainer}>
            <View style={styles.formCard}>
              <Text style={[globalStyles.h2, styles.formTitle]}>Register</Text>

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

              <Text style={globalStyles.formLabel}>Confirm Password</Text>
              <TextInput
                style={globalStyles.formInput}
                placeholder="Re-enter your password"
                placeholderTextColor="#4e595d99"
                value={confirmPassword}
                secureTextEntry
                onChangeText={setConfirmPassword}
              />

              {error ? (
                <Text style={globalStyles.formError}>{error}</Text>
              ) : null}
              {successMsg ? (
                <Text
                  style={{
                    textAlign: "center",
                    color: "#004170",
                    marginBottom: 10,
                  }}
                >
                  {successMsg}
                </Text>
              ) : null}

              <TouchableOpacity
                style={globalStyles.formButton}
                onPress={handleRegister}
              >
                <Text style={globalStyles.formButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={[globalStyles.linkText, styles.backLink]}>
                  Back to Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  gradientContainer: { flex: 1 },
  innerContainer: { flex: 1, padding: 20 },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  backLink: {
    textAlign: "center",
    marginTop: 10,
  },
});
