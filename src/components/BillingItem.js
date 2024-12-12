// src/components/CoverageItem.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";

const CoverageItem = ({ coverageType, limit, deductible, description }) => {
  return (
    <View style={styles.coverageItem}>
      <Ionicons
        name="shield-checkmark-outline"
        size={24}
        color="#004170"
        style={styles.icon}
      />
      <View style={styles.coverageDetails}>
        <Text style={[globalStyles.h3, styles.coverageTitle]}>
          {coverageType}
        </Text>
        <Text style={globalStyles.bodyText}>
          Limit: ${limit.toLocaleString()}
        </Text>
        {deductible !== "N/A" && (
          <Text style={globalStyles.bodyText}>
            Deductible: ${deductible.toLocaleString()}
          </Text>
        )}
        {description && (
          <Text style={globalStyles.bodyText}>{description}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  coverageItem: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  icon: {
    marginRight: 10,
    marginTop: 5,
  },
  coverageDetails: {
    flex: 1,
  },
  coverageTitle: {
    color: "#004170",
    marginBottom: 5,
  },
});

export default React.memo(CoverageItem);
