// src/screens/HomeScreen.js
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { fetchPoliciesFromBackend } from "../services/api";
import { globalStyles } from "../styles/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserContext";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen({ navigation }) {
  const { userId } = useContext(UserContext); // Access userId from context
  const [policyData, setPolicyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // For Notifications Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPolicyIndex, setSelectedPolicyIndex] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadPolicies() {
      if (!userId) {
        console.error("No userId found in context");
        setLoading(false);
        return;
      }
      setLoading(true);
      const policies = await fetchPoliciesFromBackend(userId);
      const enriched = policies.map((p) => ({ ...p, expanded: false }));
      setPolicyData(enriched);
      setLoading(false);
    }
    loadPolicies();
  }, [userId]);

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const updated = [...policyData];
    updated[index].expanded = !updated[index].expanded;
    setPolicyData(updated);
  };

  const openNotifications = (index) => {
    // Fetch or set notifications for the selected policy
    // For demonstration, we'll use mocked notifications
    setSelectedPolicyIndex(index);
    setNotifications([
      "Your premium is due in 10 days.",
      "Policy documents have been updated.",
      "Claim #1234 is under review.",
    ]);
    setModalVisible(true);
  };

  const renderPolicy = ({ item, index }) => (
    <View style={styles.policyCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate("PolicyDetails", { policy: item })}
      >
        <Text style={styles.policyNumber}>{item.policyNumber}</Text>
      </TouchableOpacity>

      <Text style={globalStyles.bodyText}>{item.address}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{item.status}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Annual Premium:</Text>
        <Text style={styles.value}>{item.annualPremium}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Effective Dates:</Text>
        <Text style={styles.value}>{item.effectiveDates}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Premium Due:</Text>
        <Text style={styles.value}>{item.premiumDue}</Text>
      </View>

      <View style={styles.actionsRow}>
        {/* File a Claim */}
        <TouchableOpacity
          onPress={() => navigation.navigate("FileClaim", { policy: item })}
          style={styles.actionButton}
        >
          <Ionicons name="document-text-outline" size={18} color="#004170" />
          <Text style={styles.actionText}>File a Claim</Text>
        </TouchableOpacity>

        {/* Make Payment */}
        <TouchableOpacity
          onPress={() => navigation.navigate("MakePayment", { policy: item })}
          style={styles.actionButton}
        >
          <Ionicons name="cash-outline" size={18} color="#004170" />
          <Text style={styles.actionText}>Make Payment</Text>
        </TouchableOpacity>

        <View style={styles.iconsRight}>
          {/* Notifications Icon */}
          <TouchableOpacity
            onPress={() => openNotifications(index)}
            style={styles.iconButton}
          >
            <Ionicons name="notifications-outline" size={20} color="#004170" />
          </TouchableOpacity>

          {/* Expand/Collapse Icon */}
          <TouchableOpacity
            onPress={() => toggleExpand(index)}
            style={styles.iconButton}
          >
            <Ionicons
              name={item.expanded ? "remove-outline" : "add-outline"}
              size={20}
              color="#004170"
            />
          </TouchableOpacity>
        </View>
      </View>

      {item.expanded && (
        <View style={styles.expandedSection}>
          <View style={styles.divider} />
          <Text style={[styles.label, { marginTop: 10 }]}>Agency Name:</Text>
          <Text style={styles.value}>{item.agencyName}</Text>

          <Text style={styles.label}>Agency Mailing Address:</Text>
          <Text style={styles.value}>{item.agencyAddress}</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <LinearGradient
        colors={["#004170", "#001B44"]}
        style={styles.gradientContainer}
      >
        <View style={styles.contentContainer}>
          {/* Header with Hamburger, Logo, Messages, ContactUs, FAQ, Logout */}
          <View style={styles.headerCard}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="menu-outline" size={24} color="#004170" />
            </TouchableOpacity>

            {/* <View style={styles.headerCenter}>
              <Ionicons
                name="shield-checkmark-outline"
                size={30}
                color="#004170"
              />
            </View> */}

            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("Messages")}
              >
                <Ionicons name="chatbox-outline" size={24} color="#004170" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("ContactUs")}
              >
                <Ionicons name="call-outline" size={24} color="#004170" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("FAQ")}
              >
                <Ionicons
                  name="help-circle-outline"
                  size={24}
                  color="#004170"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.replace("Login")}
              >
                <Ionicons name="log-out-outline" size={24} color="#004170" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.greetingText}>Welcome back!</Text>

          {/* My Policies Header with Add Policy Button */}
          <View style={styles.myPoliciesHeaderCard}>
            <Ionicons
              name="home-outline"
              size={24}
              color="#004170"
              style={{ marginRight: 10 }}
            />
            <Text style={[globalStyles.h2, styles.myPoliciesTitle]}>
              My Policies ({policyData.length})
            </Text>
            <TouchableOpacity
              style={styles.addPolicyButton}
              onPress={() => navigation.navigate("AddPolicy")}
            >
              <Ionicons name="add-circle-outline" size={24} color="#004170" />
              <Text style={styles.addPolicyText}>Add Policy</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={{ color: "#FFFFFF", marginTop: 10 }}>
                Loading Policies...
              </Text>
            </View>
          ) : (
            <FlatList
              data={policyData}
              keyExtractor={(item, idx) => `policy-${idx}`}
              renderItem={renderPolicy}
              contentContainerStyle={styles.policiesList}
            />
          )}
        </View>

        {/* Notifications Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={[globalStyles.h2, { marginBottom: 20 }]}>
                Notifications
              </Text>
              {selectedPolicyIndex != null && notifications.length > 0 ? (
                notifications.map((note, i) => (
                  <Text key={i} style={globalStyles.bodyText}>
                    • {note}
                  </Text>
                ))
              ) : (
                <Text style={globalStyles.bodyText}>
                  No notifications available.
                </Text>
              )}
              <View style={{ alignItems: "flex-end", marginTop: 20 }}>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
  iconButton: { padding: 5 },
  headerCenter: { flex: 1, alignItems: "center" },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  greetingText: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    marginBottom: 15,
  },
  myPoliciesHeaderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  myPoliciesTitle: {
    flex: 1,
  },
  addPolicyButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  addPolicyText: {
    marginLeft: 5,
    color: "#004170",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  policiesList: {
    paddingBottom: 20,
  },
  policyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  policyNumber: {
    marginBottom: 5,
    fontWeight: "bold",
    color: "#004170",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: "#4E595D",
    width: 120,
  },
  value: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: "#004170",
    flex: 1,
  },
  actionsRow: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F2F5",
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  actionText: {
    marginLeft: 5,
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    color: "#004170",
  },
  iconsRight: {
    flexDirection: "row",
  },
  expandedSection: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#4E595D",
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: "#004170",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
  },
});
