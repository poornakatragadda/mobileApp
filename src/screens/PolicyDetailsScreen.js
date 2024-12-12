// src/screens/PolicyDetailsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  Animated,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CoverageItem from "../components/CoverageItem";
import BillingItem from "../components/BillingItem";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function PolicyDetailsScreen({ route, navigation }) {
  const { policy } = route.params;

  const [isCoverageExpanded, setIsCoverageExpanded] = useState(false);
  const [isBillingExpanded, setIsBillingExpanded] = useState(false);

  const toggleCoverage = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCoverageExpanded(!isCoverageExpanded);
  };

  const toggleBilling = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsBillingExpanded(!isBillingExpanded);
  };

  const coverageLabels = {
    coverageA: "Dwelling",
    coverageB: "Other Structures",
    coverageC: "Personal Property",
    coverageD: "Loss of Use",
    coverageE: "Personal Liability",
    coverageF: "Medical Payments",
    allOtherPerilsDeductible: "All Other Perils Deductible",
    coverageL: "Other Coverage L",
    coverageM: "Other Coverage M",
  };

  const renderCoverageLevels = () => {
    const coverages = policy.coverages || {};
    const coverageItems = Object.keys(coverages)
      .filter(
        (key) =>
          coverages[key] !== undefined &&
          coverages[key] !== 0 &&
          coverages[key] !== ""
      )
      .map((key, index) => {
        // Determine deductible only for All Other Perils Deductible
        const deductible =
          key === "allOtherPerilsDeductible"
            ? parseFloat(coverages[key]).toLocaleString()
            : "N/A";

        // Placeholder descriptions; replace with actual descriptions if available
        const descriptions = {
          Dwelling:
            "Covers damage to the structure of your home from covered perils.",
          "Other Structures":
            "Covers structures not attached to your home, such as garages or sheds.",
          "Personal Property":
            "Covers personal belongings in case of damage or theft.",
          "Loss of Use":
            "Covers additional living expenses if your home becomes uninhabitable.",
          "Personal Liability":
            "Protects you against legal claims for bodily injury or property damage.",
          "Medical Payments":
            "Covers medical expenses for guests injured on your property.",
          "All Other Perils Deductible":
            "Deductible amount for all other covered perils.",
          "Other Coverage L": "Description for Other Coverage L.",
          "Other Coverage M": "Description for Other Coverage M.",
        };

        return (
          <CoverageItem
            key={index}
            coverageType={coverageLabels[key] || key.replace(/([A-Z])/g, " $1")}
            limit={coverages[key]}
            deductible={deductible}
            description={descriptions[coverageLabels[key]] || ""}
          />
        );
      });

    return coverageItems.length > 0 ? (
      coverageItems
    ) : (
      <Text style={globalStyles.bodyText}>No coverage details available.</Text>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={["#004170", "#001B44"]}
        style={styles.gradientContainer}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.headerCard}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              accessibilityLabel="Go Back"
            >
              <Ionicons name="chevron-back-outline" size={24} color="#004170" />
            </TouchableOpacity>
            <Text style={[globalStyles.h2, styles.headerTitle]}>
              Policy Details
            </Text>
            {/* Placeholder for alignment */}
            <View style={styles.backButton} />
          </View>

          {/* Title Card */}
          <View style={styles.titleCard}>
            <Ionicons
              name="document-text-outline"
              size={30}
              color="#004170"
              style={{ marginRight: 10 }}
            />
            <Text style={[globalStyles.h1, styles.policyTitle]}>
              {policy.coverage} Insurance
            </Text>
          </View>

          {/* Details Card */}
          <View style={styles.detailsCard}>
            {/* Policy Number */}
            <View style={styles.row}>
              <Ionicons
                name="pricetag-outline"
                size={20}
                color="#004170"
                style={styles.iconMargin}
              />
              <View style={styles.infoBlock}>
                <Text style={globalStyles.h3}>Policy Number:</Text>
                <Text style={globalStyles.bodyText}>{policy.policyNumber}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Address */}
            <View style={styles.row}>
              <Ionicons
                name="home-outline"
                size={20}
                color="#004170"
                style={styles.iconMargin}
              />
              <View style={styles.infoBlock}>
                <Text style={globalStyles.h3}>Address:</Text>
                <Text style={globalStyles.bodyText}>{policy.address}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Agency Details */}
            <View style={styles.row}>
              <Ionicons
                name="business-outline"
                size={20}
                color="#004170"
                style={styles.iconMargin}
              />
              <View style={styles.infoBlock}>
                <Text style={globalStyles.h3}>Agency Name:</Text>
                <Text style={globalStyles.bodyText}>{policy.agencyName}</Text>
                <Text style={globalStyles.h3}>Agency Address:</Text>
                <Text style={globalStyles.bodyText}>
                  {policy.agencyAddress}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Billing Information */}
            <View style={styles.row}>
              <Ionicons
                name="cash-outline"
                size={20}
                color="#004170"
                style={styles.iconMargin}
              />
              <View style={styles.infoBlock}>
                <Text style={globalStyles.h3}>Annual Premium:</Text>
                <Text style={globalStyles.bodyText}>
                  {policy.annualPremium}
                </Text>

                <Text style={globalStyles.h3}>Effective Dates:</Text>
                <Text style={globalStyles.bodyText}>
                  {policy.effectiveDates}
                </Text>

                <Text style={globalStyles.h3}>Premium Due:</Text>
                <Text style={globalStyles.bodyText}>{policy.premiumDue}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Coverages Section */}
            <TouchableOpacity
              onPress={toggleCoverage}
              style={styles.sectionHeader}
              accessibilityLabel="Toggle Coverage Levels Section"
            >
              <Text style={[globalStyles.h2, styles.sectionTitle]}>
                Coverages
              </Text>
              <Ionicons
                name={
                  isCoverageExpanded
                    ? "chevron-up-outline"
                    : "chevron-down-outline"
                }
                size={24}
                color="#004170"
              />
            </TouchableOpacity>
            {isCoverageExpanded && (
              <View style={styles.coveragesContainer}>
                {renderCoverageLevels()}
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PolicyDocuments", { policy: policy })
              }
              style={styles.bottomButton}
              accessibilityLabel="Navigate to Documents"
            >
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#004170"
              />
              <Text style={styles.bottomButtonText}>Documents</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PolicyBilling", { policy: policy })
              }
              style={styles.bottomButton}
              accessibilityLabel="Navigate to Billing"
            >
              <Ionicons name="card-outline" size={20} color="#004170" />
              <Text style={styles.bottomButtonText}>Billing</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PolicyClaims", { policy: policy })
              }
              style={styles.bottomButton}
              accessibilityLabel="Navigate to Claims"
            >
              <Ionicons name="medkit-outline" size={20} color="#004170" />
              <Text style={styles.bottomButtonText}>Claims</Text>
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
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "space-between",
  },
  backButton: { marginRight: 15 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  titleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  policyTitle: {
    flex: 1,
    fontFamily: "Roboto-Light",
    fontSize: 24,
    color: "#004170",
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  iconMargin: {
    marginRight: 10,
  },
  infoBlock: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#004170",
    fontFamily: "Roboto-Regular",
    fontSize: 20,
  },
  coveragesContainer: {
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 30,
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  bottomButtonText: {
    marginLeft: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#004170",
    fontWeight: "500",
  },
});
