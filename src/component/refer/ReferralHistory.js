import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../header/Header";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const users = [
  {
    id: 1,
    name: "John Doe",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    photo: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Chris Brown",
    photo: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

const ReferralHistory = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title={"Referral History"} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Card */}
        <LinearGradient
          colors={["#1F31FF", "#04B004"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.profileContainer}
        >
          <View style={styles.profileHeader}>
            <Text style={styles.profileTitle}>Profile</Text>
            <View style={styles.premiumIconBox}>
              <Image
                source={require("../../../assets/premium.png")}
                style={styles.premiumIcon}
              />
              <Text style={styles.premiumText}>PREMIUM</Text>
            </View>
          </View>

          <View style={[styles.profileImageBox, styles.mtNegative]}>
            <Image
              source={require("../../../assets/dummyprofile.png")}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Mariya Joseph</Text>
              <View style={styles.profileImageBox}>
                <Ionicons name="call-outline" size={20} color={"#FFFFFF"} />
                <Text style={styles.profilePhone}>+91 123 456 7890</Text>
              </View>
            </View>
          </View>

          <View style={[styles.profileImageBox, styles.profileEarnings]}>
            <Ionicons name="star" color={"#EBA81A"} />
            <Text style={styles.earningsText}>
              Referral Earnings{" "}
              <Text style={styles.earningsAmount}>: ₹4000</Text>
            </Text>
          </View>
        </LinearGradient>

        {/* Referral History */}
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Referral History</Text>
            <Ionicons name="search-outline" size={24} />
          </View>
          <View style={styles.historyDivider} />
          {users.map((item, index) => (
            <View style={styles.historyItem} key={index}>
              <Image
                source={require("../../../assets/dummyprofile.png")}
                style={styles.historyImage}
                resizeMode="cover"
              />
              <View style={styles.historyInfo}>
                <Text style={styles.historyName}>{item.name}</Text>
                <Text style={styles.historyStatus}>Premium member</Text>
              </View>
              <View style={styles.subscribedBadge}>
                <Text style={styles.subscribedText}>Subscribed</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReferralHistory;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 24 },
  profileContainer: { padding: 10, borderRadius: 13 },
  profileHeader: { flexDirection: "row", justifyContent: "space-between" },
  profileTitle: { fontWeight: "600", fontSize: 18, color: "#FFFFFF" },
  premiumIconBox: { alignItems: "center" },
  premiumIcon: { width: 30, height: 30, resizeMode: "stretch" },
  premiumText: {
    color: "#FCD522",
    fontWeight: "bold",
    fontSize: 8,
    textAlign: "center",
  },
  profileImageBox: { flexDirection: "row", alignItems: "center" },
  mtNegative: { marginTop: -20 },
  profileImage: { height: 50, width: 50 },
  profileInfo: { marginLeft: 20, marginVertical: 10 },
  profileName: { fontWeight: "500", fontSize: 16, color: "#FFFFFF" },
  profilePhone: { fontWeight: "500", fontSize: 14, color: "#FFFFFF" },
  profileEarnings: { marginVertical: 10 },
  earningsText: {
    fontWeight: "500",
    fontSize: 14,
    color: "#FFFFFF",
    marginLeft: 10,
  },
  earningsAmount: { fontWeight: "500", fontSize: 14, color: "#EFC51D" },
  historyContainer: { flex: 1, paddingVertical: 10 },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  historyTitle: { fontWeight: "600", fontSize: 16 },
  historyDivider: {
    borderWidth: 1,
    borderColor: "#DADADA",
    marginVertical: 10,
  },
  historyItem: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  historyImage: { height: 60, width: 60, borderRadius: 20 },
  historyInfo: { flex: 1, marginLeft: 10 },
  historyName: { fontWeight: "500", fontSize: 14 },
  historyStatus: { fontSize: 12, color: "#888" },
  subscribedBadge: {
    borderWidth: 1,
    borderColor: "#219F29",
    borderRadius: 13,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  subscribedText: { color: "#079710", fontSize: 12, fontWeight: "600" },
});
