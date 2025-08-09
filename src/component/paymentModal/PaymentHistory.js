import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../header/Header";
import { Ionicons } from "@expo/vector-icons";

const PaymentHistory = ({ navigation }) => {
  const PaymentHistoryData = [
    { id: 1, time: "Jun 18 . 16:02 pm" },
    { id: 2, time: "May 12 . 11:04 am" },
    { id: 3, time: "March 28 . 12:04 am" },
  ];
  return (
    <View style={styles.container}>
      <Header title={"Payment History"} navigation={navigation} />
      <View style={styles.content}>
        {/* Subscription Card */}
        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionLabel}>
            <Text style={styles.subscriptionLabelText}>
              Pay Subscription Installment
            </Text>
          </View>
          <Text style={styles.priceText}>
            ₹2000 <Text style={styles.highlightedPrice}>₹1200</Text>/month
          </Text>
          <Text style={styles.dueDate}>
            Your next subscription installment is due 29 jun 2025
          </Text>
          <View style={styles.payNowBtn}>
            <Text style={styles.payNowText}>Pay now</Text>
          </View>
        </View>

        {/* History Header */}
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Referral History</Text>
          <Ionicons name="search-outline" size={24} />
        </View>
        <View style={styles.historyDivider} />

        {/* History List */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {PaymentHistoryData.map((item, index) => (
            <View style={styles.historyItem} key={index}>
              <View style={styles.iconContainer}>
                <Image source={require("../../../assets/shear.png")} />
              </View>
              <View>
                <Text style={styles.itemTitle}>Payment Paid successfully.</Text>
                <Text style={styles.itemDate}>{item.time}</Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemAmount}>₹1200</Text>
                <Ionicons
                  name="chevron-forward-outline"
                  style={styles.itemArrow}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 24 },
  subscriptionCard: {
    padding: 10,
    backgroundColor: "#1E32FB",
    borderRadius: 15,
    elevation: 6,
    shadowColor: "#00000040",
    shadowOpacity: 0.2,
    shadowRadius: 13,
  },
  subscriptionLabel: {
    padding: 6,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    alignSelf: "flex-start",
    marginVertical: 5,
  },
  subscriptionLabelText: { fontSize: 12, fontWeight: "600" },
  priceText: { fontWeight: "500", fontSize: 12, color: "#FFFFFF" },
  highlightedPrice: { fontWeight: "700", fontSize: 20 },
  dueDate: {
    fontWeight: "500",
    fontSize: 12,
    color: "#AFB6FE",
    marginVertical: 10,
  },
  payNowBtn: {
    backgroundColor: "#3EDF03",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 13,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  payNowText: { fontWeight: "600", color: "#FFFFFF", fontSize: 12 },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  historyTitle: { fontWeight: "600", fontSize: 16 },
  historyDivider: {
    borderWidth: 1,
    borderColor: "#DADADA",
    marginVertical: 10,
  },
  scrollContainer: { paddingVertical: 10 },
  historyItem: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical:10
  },
  iconContainer: {
    backgroundColor: "#E5FBDD",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  itemTitle: { fontWeight: "600", fontSize: 13, color: "#000000" },
  itemDate: { fontWeight: "400", fontSize: 13, color: "#626262" },
  itemRight: { justifyContent: "space-between" },
  itemAmount: { fontWeight: "600", fontSize: 16, color: "#000000" },
  itemArrow: { marginTop: 10, alignSelf: "flex-end", color: "#575656" },
});
