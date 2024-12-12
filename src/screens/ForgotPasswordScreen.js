// src/screens/ForgotPasswordScreen.js
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
import { forgotPassword } from "../services/api";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleReset = () => {
    setSuccessMsg("");
    const result = forgotPassword(email.trim());
    if (result.success) {
      setError("");
      setSuccessMsg("Password reset instructions sent to your email.");
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
              <Text style={[globalStyles.h2, styles.formTitle]}>
                Forgot Password
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
                onPress={handleReset}
              >
                <Text style={globalStyles.formButtonText}>Reset Password</Text>
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
