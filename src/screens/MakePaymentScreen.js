// src/screens/MakePaymentScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function MakePaymentScreen({ route, navigation }) {
  const { policy } = route.params || {};

  const handlePayment = () => {
    // Implement your payment logic here
    alert("Payment successful!");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerCard}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back-outline" size={24} color="#004170" />
          </TouchableOpacity>
          <Text style={[globalStyles.h2, styles.headerTitle]}>
            Make a Payment
          </Text>
          {/* Placeholder for alignment */}
          <View style={styles.backButton} />
        </View>

        {/* Payment Form */}
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={globalStyles.bodyText}>
            Policy: {policy.policyNumber}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Amount to Pay"
            placeholderTextColor="#666"
            keyboardType="decimal-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Payment Method"
            placeholderTextColor="#666"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handlePayment}>
            <Text style={globalStyles.buttonText}>Submit Payment</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 20, backgroundColor: "#004170" }, // Preserved original background
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "space-between",
  },
  backButton: { padding: 5 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18 },

  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 50,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "#000000",
  },
  submitButton: {
    backgroundColor: "#004170",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
});
