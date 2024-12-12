// src/screens/PolicyClaimsScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function PolicyClaimsScreen({ route }) {
  const { policy } = route.params || {};
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={["#004170", "#001B44"]}
        style={styles.gradientContainer}
      >
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <Text style={[globalStyles.h2, styles.title]}>Claims</Text>
            <Text style={globalStyles.bodyText}>
              Policy: {policy.policyNumber}
            </Text>
            <Text style={[globalStyles.bodyText, { marginTop: 10 }]}>
              Claims history and details...
            </Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  gradientContainer: { flex: 1 },
  contentContainer: { flex: 1, padding: 20 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
});