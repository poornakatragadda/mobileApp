// src/screens/MyProfileScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function MyProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={["#004170", "#001B44"]}
        style={styles.gradientContainer}
      >
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <Text style={[globalStyles.h2, styles.title]}>My Profile</Text>
            <Text style={globalStyles.bodyText}>Name: John Doe</Text>
            <Text style={globalStyles.bodyText}>
              Email: john.doe@example.com
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
