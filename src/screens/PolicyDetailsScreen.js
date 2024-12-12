// src/screens/PolicyDetailsScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

export default function PolicyDetailsScreen({ route, navigation }) {
  const { policy } = route.params;

  const openInApp = async (url) => {
    await WebBrowser.openBrowserAsync(url, { toolbarColor: "#004170" });
  };

  const coverageLabels = {
    coverageA: "Dwelling",
    coverageB: "Other Structures",
    coverageC: "Personal Property",
    coverageD: "Loss of Use",
    coverageE: "Personal Liability",
    coverageF: "Medical Payments",
    allOtherPerilsDeductible: "All Other Perils Deductible",
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={["#004170", "#001B44"]}
        style={styles.gradientContainer}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerCard}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back-outline" size={24} color="#004170" />
            </TouchableOpacity>
            <Text style={[globalStyles.h2, styles.headerTitle]}>
              Policy Details
            </Text>
          </View>

          <View style={styles.titleCard}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color="#004170"
              style={{ marginRight: 10 }}
            />
            <Text style={[globalStyles.h1, styles.policyTitle]}>
              {policy.coverage} Insurance
            </Text>
          </View>

          <View style={styles.detailsCard}>
            <View style={styles.row}>
              <Ionicons
                name="pricetag-outline"
                size={18}
                color="#004170"
                style={styles.iconMargin}
              />
              <View style={styles.infoBlock}>
                <Text style={globalStyles.h3}>Policy Number:</Text>
                <Text style={globalStyles.bodyText}>{policy.policyNumber}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Ionicons
                name="home-outline"
                size={18}
                color="#004170"
                style={styles.iconMargin}
              />
              <View style={styles.infoBlock}>
                <Text style={globalStyles.h3}>Address:</Text>
                <Text style={globalStyles.bodyText}>{policy.address}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Ionicons
                name="business-outline"
                size={18}
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

            <View style={styles.row}>
              <Ionicons
                name="cash-outline"
                size={18}
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

            <Text style={[globalStyles.h3, styles.sectionTitle]}>
              Coverages:
            </Text>
            {Object.keys(policy.coverages || {}).map((key, index) => (
              <View key={index} style={styles.coverageItem}>
                <Text style={globalStyles.h3}>
                  {coverageLabels[key] || key.replace(/([A-Z])/g, " $1")}:
                </Text>
                <Text style={globalStyles.bodyText}>
                  ${parseFloat(policy.coverages[key]).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PolicyDocuments", { policy: policy })
              }
              style={styles.bottomButton}
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
            >
              <Ionicons name="card-outline" size={18} color="#004170" />
              <Text style={styles.bottomButtonText}>Billing</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PolicyClaims", { policy: policy })
              }
              style={styles.bottomButton}
            >
              <Ionicons name="medkit-outline" size={18} color="#004170" />
              <Text style={styles.bottomButtonText}>Claims</Text>
            </TouchableOpacity>
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
  },
  backButton: { marginRight: 15 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
  },

  titleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  policyTitle: {
    flex: 1,
  },
  coverageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailsCard: {
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
    backgroundColor: "#4E595D",
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
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
