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
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function PolicyDetailsScreen({ route, navigation }) {
  const { policy } = route.params; // policy is an object from policies array
  const term = policy.terms[0]; // Assuming one term per policy
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

  // Mapping coverage keys to readable types
  const coverageMapping = {
    coverageA: "Personal Liability",
    coverageB: "Property Damage",
    coverageC: "Medical Payments",
    coverageD: "Uninsured/Underinsured Motorist",
    coverageE: "Comprehensive",
    coverageF: "Collision",
    coverageL: "Other Coverage L",
    coverageM: "Other Coverage M",
    allOtherPerilsDeductible: "All Other Perils Deductible",
  };

  // Function to format coverage details
  const renderCoverageLevels = () => {
    const coverages = term.coverages;
    const coverageItems = Object.keys(coverageMapping)
      .filter(
        (key) =>
          coverages[key] !== undefined &&
          coverages[key] !== 0 &&
          coverages[key] !== ""
      )
      .map((key, index) => (
        <View key={index} style={styles.coverageItem}>
          <Ionicons
            name="shield-checkmark-outline"
            size={20}
            color="#004170"
            style={{ marginRight: 10 }}
          />
          <View style={styles.coverageDetails}>
            <Text style={[globalStyles.h3, { color: "#004170" }]}>
              {coverageMapping[key]}
            </Text>
            {key !== "allOtherPerilsDeductible" && (
              <>
                <Text style={globalStyles.bodyText}>
                  Limit: ${coverages[key]}
                </Text>
                <Text style={globalStyles.bodyText}>
                  Deductible: ${term.billing.paymentPlan.deductible || "N/A"}
                </Text>
              </>
            )}
            {key === "allOtherPerilsDeductible" && (
              <Text style={globalStyles.bodyText}>
                Deductible: ${coverages[key]}
              </Text>
            )}
            <Text style={globalStyles.bodyText}>
              {/* Placeholder for description; replace with actual descriptions if available */}
              Description for {coverageMapping[key]}.
            </Text>
          </View>
        </View>
      ));

    return coverageItems.length > 0 ? (
      coverageItems
    ) : (
      <Text style={globalStyles.bodyText}>No coverage details available.</Text>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={["#004170", "#001B44"]} // Consistent with other screens
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

          {/* Policy Overview Card */}
          <View style={styles.overviewCard}>
            <View style={styles.overviewHeader}>
              <Ionicons
                name="shield-checkmark-outline"
                size={30}
                color="#004170"
                style={{ marginRight: 10 }}
              />
              <Text style={[globalStyles.h1, styles.policyTitle]}>
                {policy.lobType} Insurance
              </Text>
            </View>

            <View style={styles.overviewContent}>
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
                  <Text style={globalStyles.bodyText}>
                    {policy.policyNumber}
                  </Text>
                </View>
              </View>

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
                  <Text style={globalStyles.bodyText}>
                    {policy.address.formattedAddress}
                  </Text>
                </View>
              </View>

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
                  <Text style={globalStyles.bodyText}>
                    {policy.agency.name}
                  </Text>
                  <Text style={globalStyles.h3}>Agency Address:</Text>
                  <Text style={globalStyles.bodyText}>
                    {policy.address.formattedAddress}
                  </Text>
                  <Text style={globalStyles.h3}>Agency Phone:</Text>
                  <Text style={globalStyles.bodyText}>
                    {policy.agency.phone}
                  </Text>
                </View>
              </View>

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
                    ${policy.billing.currentTermPremiumBalance.toFixed(2)}
                  </Text>

                  <Text style={globalStyles.h3}>Effective Dates:</Text>
                  <Text style={globalStyles.bodyText}>
                    {new Date(term.effectiveDate).toLocaleDateString()} -{" "}
                    {new Date(term.expirationDate).toLocaleDateString()}
                  </Text>

                  <Text style={globalStyles.h3}>Premium Due:</Text>
                  <Text style={globalStyles.bodyText}>
                    {policy.billing.currentAmountDueDisplay}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Coverage Levels Section */}
          <View style={styles.sectionCard}>
            <TouchableOpacity
              onPress={toggleCoverage}
              style={styles.sectionHeader}
              accessibilityLabel="Toggle Coverage Levels Section"
            >
              <Text style={[globalStyles.h2, styles.sectionTitle]}>
                Coverage Levels
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
              <View style={styles.sectionContent}>
                {renderCoverageLevels()}
              </View>
            )}
          </View>

          {/* Billing Information Section */}
          <View style={styles.sectionCard}>
            <TouchableOpacity
              onPress={toggleBilling}
              style={styles.sectionHeader}
              accessibilityLabel="Toggle Billing Information Section"
            >
              <Text style={[globalStyles.h2, styles.sectionTitle]}>
                Billing Information
              </Text>
              <Ionicons
                name={
                  isBillingExpanded
                    ? "chevron-up-outline"
                    : "chevron-down-outline"
                }
                size={24}
                color="#004170"
              />
            </TouchableOpacity>
            {isBillingExpanded && (
              <View style={styles.sectionContent}>
                <View style={styles.billingItem}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#004170"
                    style={{ marginRight: 10 }}
                  />
                  <View>
                    <Text style={[globalStyles.h3, { color: "#004170" }]}>
                      Billing Effective Date:
                    </Text>
                    <Text style={globalStyles.bodyText}>
                      {new Date(
                        policy.billingEffectiveDate
                      ).toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                <View style={styles.billingItem}>
                  <Ionicons
                    name="cash-outline"
                    size={20}
                    color="#004170"
                    style={{ marginRight: 10 }}
                  />
                  <View>
                    <Text style={[globalStyles.h3, { color: "#004170" }]}>
                      Current Amount Due:
                    </Text>
                    <Text style={globalStyles.bodyText}>
                      ${policy.billing.currentAmountDue.toFixed(2)}
                    </Text>
                  </View>
                </View>

                <View style={styles.billingItem}>
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color="#004170"
                    style={{ marginRight: 10 }}
                  />
                  <View>
                    <Text style={[globalStyles.h3, { color: "#004170" }]}>
                      Current Premium Invoice:
                    </Text>
                    <Text style={globalStyles.bodyText}>
                      Due Date:{" "}
                      {new Date(
                        policy.billing.currentPremiumInvoice.dueDate
                      ).toLocaleDateString()}
                    </Text>
                    <Text style={globalStyles.bodyText}>
                      Amount Due: $
                      {policy.billing.currentPremiumInvoice.amountDue.toFixed(
                        2
                      )}
                    </Text>
                  </View>
                </View>
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
                size={18}
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
              <Ionicons name="card-outline" size={18} color="#004170" />
              <Text style={styles.bottomButtonText}>Billing</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PolicyClaims", { policy: policy })
              }
              style={styles.bottomButton}
              accessibilityLabel="Navigate to Claims"
            >
              <Ionicons name="medkit-outline" size={18} color="#004170" />
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
  overviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  policyTitle: {
    flex: 1,
    fontSize: 24,
    color: "#004170",
    fontFamily: "Roboto-Light",
  },
  overviewContent: {
    marginTop: 10,
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
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#004170",
    fontFamily: "Roboto-Regular",
    fontSize: 20,
    marginBottom: 10,
  },
  sectionContent: {
    marginTop: 15,
  },
  coverageItem: {
    flexDirection: "row",
    marginBottom: 15,
  },
  coverageDetails: {
    flex: 1,
  },
  billingItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bottomButtonText: {
    marginLeft: 5,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#004170",
  },
});
