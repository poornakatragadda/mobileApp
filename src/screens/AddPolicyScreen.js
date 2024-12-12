// src/screens/AddPolicyScreen.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { UserContext } from "../contexts/UserContext";
import { addPolicyToBackend } from "../services/api"; // Ensure this function is implemented

export default function AddPolicyScreen({ navigation }) {
  const { userId } = useContext(UserContext);
  const [policyNumber, setPolicyNumber] = useState("");
  const [agencyCode, setAgencyCode] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!policyNumber.trim())
      newErrors.policyNumber = "Policy Number is required.";
    if (!agencyCode.trim()) newErrors.agencyCode = "Agency Code is required.";
    if (!zipCode.trim()) {
      newErrors.zipCode = "Zip Code is required.";
    } else if (!/^\d{5}(-\d{4})?$/.test(zipCode.trim())) {
      newErrors.zipCode = "Enter a valid Zip Code.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPolicy = async () => {
    if (!validate()) return;

    // Assuming addPolicyToBackend is a function that sends the policy data to the backend
    const result = await addPolicyToBackend(userId, {
      policyNumber: policyNumber.trim(),
      agencyCode: agencyCode.trim(),
      zipCode: zipCode.trim(),
    });

    if (result.success) {
      Alert.alert("Success", "Policy added successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert("Error", result.error || "Failed to add policy.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={["#004170", "#001B44"]} // Matching the existing gradient colors
        style={styles.gradientContainer}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.headerCard}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back-outline" size={24} color="#004170" />
            </TouchableOpacity>
            <Text style={[globalStyles.h2, styles.headerTitle]}>
              Add New Policy
            </Text>
            {/* Placeholder for alignment */}
            <View style={styles.backButton} />
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Policy Number */}
            <Text style={styles.label}>Policy Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Policy Number"
              placeholderTextColor="#4E595D99"
              value={policyNumber}
              onChangeText={setPolicyNumber}
            />
            {errors.policyNumber && (
              <Text style={styles.errorText}>{errors.policyNumber}</Text>
            )}

            {/* Agency Code */}
            <Text style={styles.label}>Agency Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Agency Code"
              placeholderTextColor="#4E595D99"
              value={agencyCode}
              onChangeText={setAgencyCode}
            />
            {errors.agencyCode && (
              <Text style={styles.errorText}>{errors.agencyCode}</Text>
            )}

            {/* Zip Code */}
            <Text style={styles.label}>Zip Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Zip Code"
              placeholderTextColor="#4E595D99"
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="number-pad"
            />
            {errors.zipCode && (
              <Text style={styles.errorText}>{errors.zipCode}</Text>
            )}

            {/* Note */}
            <Text style={styles.note}>
              You can find this information on the quote summary you received
              from your agent or on any policy documents.
            </Text>

            {/* Sample Policy and Invoice */}
            <View style={styles.sampleDocs}>
              <TouchableOpacity
                style={styles.sampleDoc}
                onPress={() =>
                  Alert.alert(
                    "Sample Policy",
                    "Displaying Sample Policy Document..."
                  )
                }
              >
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#004170"
                />
                <Text style={styles.sampleDocText}>Sample Policy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sampleDoc}
                onPress={() =>
                  Alert.alert(
                    "Sample Invoice",
                    "Displaying Sample Invoice Document..."
                  )
                }
              >
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#004170"
                />
                <Text style={styles.sampleDocText}>Sample Invoice</Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddPolicy}
            >
              <Text style={styles.submitButtonText}>Add Policy</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  gradientContainer: { flex: 1 },
  container: { padding: 20 },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "space-between",
  },
  backButton: { padding: 5 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#4E595D",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F0F2F5",
    borderRadius: 5,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#004170",
    height: 38,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  errorText: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: "#b94a48",
    marginBottom: 10,
    textAlign: "center",
  },
  note: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: "#4E595D",
    marginTop: 10,
    marginBottom: 20,
  },
  sampleDocs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sampleDoc: {
    flexDirection: "row",
    alignItems: "center",
  },
  sampleDocText: {
    marginLeft: 5,
    color: "#004170",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#004170",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "bold",
  },
});
