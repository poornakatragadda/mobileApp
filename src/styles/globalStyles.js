// src/styles/globalStyles.js
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  bodyText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#004170",
    backgroundColor: "#FFFFFF",
  },
  h1: {
    fontFamily: "Roboto-Light",
    fontSize: 29,
    lineHeight: 40,
    color: "#6BACDD",
    backgroundColor: "#FFFFFF",
  },
  h2: {
    fontFamily: "Roboto-Bold",
    fontSize: 22,
    lineHeight: 31,
    color: "#004170",
    backgroundColor: "#FFFFFF",
  },
  h3: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 24,
    color: "#004170",
    backgroundColor: "#FFFFFF",
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#004170",
    backgroundColor: "#FFFFFF",
    textDecorationLine: "underline",
  },
  formLabel: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#4E595D",
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: "#F0F2F5",
    borderRadius: 5,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Roboto-Regular",
    color: "#004170",
    height: 38,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  formError: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "#b94a48",
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },
  formButton: {
    backgroundColor: "#004170",
    borderRadius: 5,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  formButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#FFFFFF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  // New Styles for PolicyDetailsScreen
  sectionTitle: {
    color: "#004170",
    fontFamily: "Roboto-Medium",
    fontSize: 20,
  },
});
