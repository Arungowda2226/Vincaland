import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Header from "../header/Header";
import { LinearGradient } from "expo-linear-gradient";

const subscribPolicy = [
  { id: 1, title: "36 Months returns" },
  { id: 2, title: "A maximum of 5000 premium members will be accepted." },
  { id: 3, title: "30% referral commission per loan" },
  { id: 4, title: "30% referral commission per person investment." },
  { id: 5, title: "30% referral commission per construction project." },
  { id: 6, title: "30% referral commission per interiors project." },
  { id: 7, title: "30% referral commission real estate per transaction" },
  { id: 8, title: "30% referral commission per CIBIL repair service" },
];

const referralData = [
  {
    id: 1,
    title:
      "Incentives and commissions are payable only to active subscribers who pay ₹1200 per month without fail.",
  },
  {
    id: 2,
    title:
      "Referrals are eligible only for the services that are active during the month.",
  },
  {
    id: 3,
    title: "Each month, two services will be opened for referral earnings",
  },
  {
    id: 4,
    title: "Commission rates are fixed as per the services listed above.",
  },
];

const payCancelData = [
  {
    id: 1,
    title: "Payments must be made every month without delay",
  },
  {
    id: 2,
    title:
      "Missing a payment for any month will result in cancellation of the subscription ID",
  },
  {
    id: 3,
    title:
      "Once cancelled, the investor will not be eligible for any commissions, bonuses, or payouts under this plan",
  },
  {
    id: 4,
    title:
      "Cancelled IDs cannot be reinstated, and rejoining will require fresh registration (if slots are available)",
  },
];

const termsData = [
  {
    id: 1,
    title:
      "All commissions and payouts will be processed as per Vincaland’s payment schedule and policies",
  },
  {
    id: 2,
    title:
      "Vincaland reserves the right to update, modify, or discontinue any service with prior notice to subscribers",
  },
  {
    id: 3,
    title:
      "This plan is not a fixed return investment scheme Earnings depend on referrals and commissions generated.",
  },
  {
    id: 4,
    title:
      "Misuse of the program, fraudulent referrals, or violation of policy terms will result in immediate termination of the subscription without refund",
  },
];

const { height, width } = Dimensions.get("window");

const Subscribe = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <Header navigation={navigation} title={"Subscription details"} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ position: "relative" }}>
          <LinearGradient colors={["#0F15CE", "#BB108C"]} style={styles.card}>
            <Text style={styles.title}>PREMIUM USER</Text>
            <Text style={styles.priceLine}>
              ₹2000 <Text style={styles.discountPrice}>₹1200</Text>
              <Text style={styles.monthText}>/month</Text>
            </Text>
            <Text style={styles.feeText}>
              Subscription Fee: ₹1000 + ₹200 GST
            </Text>

            <View style={styles.dashedLine} />

            <View style={styles.policyContainer}>
              {subscribPolicy.map((sub) => (
                <View key={sub.id} style={styles.policyRow}>
                  <Image
                    source={require("../../../assets/greenTic.png")}
                    style={styles.policyIcon}
                  />
                  <Text style={styles.policyText}>{sub.title}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
          <Image
            source={require("../../../assets/offer.png")}
            style={styles.offer}
          />
        </View>

        <View style={styles.upcomingCard}>
          <Text style={styles.upcomingTitle}>Upcoming...</Text>
          <View style={styles.upcomingDashedLine} />
          <View style={styles.upcomingRow}>
            <View style={styles.dot} />
            <Text style={styles.upcomingText}>
              Insurance (Third-Party) - Launching after 8 months.
            </Text>
          </View>
          <View style={styles.upcomingRow}>
            <View style={styles.dot} />
            <Text style={styles.upcomingText}>
              Purchasing of Goods–Launching after 8 months
            </Text>
          </View>
          <View style={styles.upcomingRow}>
            <View style={styles.dot} />
            <Text style={styles.upcomingText}>
              Emergency Fund–Launching after 8 months, exclusive to subscribers
            </Text>
          </View>
          <View style={styles.repayContainer}>
            <View style={styles.repayContentContainer}>
              <Image
                source={require("../../../assets/tic.png")}
                style={styles.ticIcon}
              />
              <Text style={styles.repayLabel}>Loan up to ₹25,000</Text>
            </View>
            <View style={styles.repayContentContainer}>
              <Image
                source={require("../../../assets/tic.png")}
                style={styles.ticIcon}
              />
              <Text style={styles.repayLabel}>
                Repayment within 3months (maximum 6 months)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.referralCard}>
          <Text style={styles.referralTitle}>Referral Conditions</Text>
          <View style={styles.border} />
          {referralData.map((refer) => (
            <View key={refer.id} style={styles.upcomingRow}>
              <View style={styles.referralDot} />
              <Text style={styles.referralText}>{refer.title}</Text>
            </View>
          ))}
        </View>

        <View style={styles.referralCard}>
          <Text style={styles.referralTitle}>
            Payment & Cancellation Policy
          </Text>
          <View style={styles.border} />
          {payCancelData.map((paycancel) => (
            <View key={paycancel.id} style={styles.upcomingRow}>
              <View style={styles.referralDot} />
              <Text style={styles.referralText}>{paycancel.title}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bonusBox}>
          <Text style={styles.referralTitle}>End-of-Term Bonus</Text>
          <Text style={styles.bonusLabel}>
            Investors who complete the full 36 months without any referrals will
            still receive a bonus payout of
          </Text>
          <Text style={styles.bounsCalLabel}>
            ₹1000 (subscription value) + ₹2000 (service value) = ₹3000
          </Text>
          <Text style={styles.bonusSubLabel}>
            (Bonus payout is only applicable if all monthly payments are made on
            time for the full term)
          </Text>
        </View>

        <View style={styles.termBox}>
          <Text style={styles.termsLabel}>General Terms</Text>
          {termsData.map((term) => (
            <View key={term.id} style={styles.upcomingRow}>
              <View style={styles.referralDot} />
              <Text style={styles.referralText}>{term.title}</Text>
            </View>
          ))}
        </View>

        <View style={styles.lastBorder} />
        <View style={styles.cautionBox}>
          <Image source={require("../../../assets/cautionIcon.png")} />
          <Text style={styles.cautionLabel}>
            By subscribing to the Vincaland Investor Subscription Plan, the
            investor confirms that they have read, understood, and agreed to all
            the above terms and conditions.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Image
          source={require("../../../assets/admin.png")}
          style={styles.footerImage}
        />
        <Text style={styles.footerText}>
          This document outlines the terms, conditions, and benefits of the
          Vincaland Investor Subscription Plan. By subscribing, the investor
          agrees to pay the monthly fee, abide by the rules stated herein, and
          enjoy the benefits and incentives offered by Vincaland Services
        </Text>
      </View>
    </View>
  );
};

export default Subscribe;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    padding: 24,
  },
  card: {
    borderRadius: 13,
    padding: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: "#FFFFFF",
    alignSelf: "center",
  },
  priceLine: {
    textDecorationLine: "line-through",
    color: "#FFCD07",
    textAlign: "center",
    fontSize: 12,
    marginTop: 20,
  },
  discountPrice: {
    fontWeight: "800",
    fontSize: 30,
    textDecorationLine: "none",
    marginLeft: 8,
    color: "#FFCD07",
  },
  monthText: {
    textDecorationLine: "none",
    color: "#FFCD07",
  },
  feeText: {
    fontWeight: "400",
    fontSize: 15,
    color: "#FFFFFF",
    textAlign: "center",
  },
  dashedLine: {
    borderBottomColor: "#FFCE0A",
    borderBottomWidth: 2,
    borderStyle: "dashed",
    marginVertical: 10,
    marginTop: 30,
    marginHorizontal: 10,
  },
  policyContainer: {
    marginVertical: 10,
  },
  policyRow: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  policyIcon: {
    height: height * 0.04,
    width: width * 0.08,
    resizeMode: "stretch",
    marginRight: 5,
  },
  policyText: {
    flex: 1,
    flexWrap: "wrap",
    color: "white",
  },
  offer: {
    position: "absolute",
    top: -15,
    left: -15,
    width: 80,
    height: 80,
    resizeMode: "contain",
    zIndex: 10,
  },
  // Upcoming Section
  upcomingCard: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
    elevation: 6,
    shadowColor: "#0000004A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 9.65,
    borderRadius: 15,
  },
  upcomingTitle: {
    fontWeight: "500",
    fontSize: 20,
  },
  upcomingDashedLine: {
    borderWidth: 0.7,
    borderColor: "#D5D5D5",
    borderStyle: "dashed",
    marginVertical: 10,
  },
  upcomingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 20,
    backgroundColor: "black",
  },
  upcomingText: {
    marginLeft: 10,
    flex: 1,
    flexWrap: "wrap",
    fontWeight: "700",
    fontSize: 16,
  },

  // Footer Section
  footer: {
    marginBottom: 40,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  footerImage: {
    height: height * 0.06,
    width: width * 0.12,
    resizeMode: "stretch",
    marginRight: 8,
  },
  footerText: {
    width: "85%",
  },
  repayContainer: {
    width: width * 0.6,
    alignSelf: "center",
    marginTop: 10,
  },
  repayContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  ticIcon: {
    height: height * 0.02,
    width: width * 0.04,
    resizeMode: "stretch",
  },
  repayLabel: {
    marginLeft: 5,
    fontWeight: "400",
    fontSize: 16,
  },
  referralCard: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
    borderColor: "#000000",
  },
  referralTitle: {
    fontWeight: "500",
    fontSize: 20,
  },
  border: {
    borderWidth: 0.7,
    borderStyle: "dashed",
    marginVertical: 10,
  },
  referralDot: {
    height: 5,
    width: 5,
    borderRadius: 20,
    backgroundColor: "black",
  },
  referralText: {
    fontWeight: "400",
    fontSize: 16,
    color: "#000000",
    marginLeft: 5,
  },
  bonusBox: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    elevation: 6,
    shadowColor: "#0000006B",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 9.65,
  },
  bonusLabel: {
    fontWeight: "400",
    fontSize: 16,
    marginVertical: 10,
  },
  bounsCalLabel: {
    fontWeight: "700",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginVertical: 10,
  },
  bonusSubLabel: {
    fontWeight: "400",
    fontSize: 14,
    color: "#000000",
    textAlign: "center",
    marginVertical: 10,
  },
  termBox: {
    marginVertical: 10,
    padding: 10,
  },
  termsLabel: {
    fontWeight: "500",
    fontSize: 20,
    color: "#000000",
  },
  lastBorder: {
    borderWidth: 1,
    borderColor: "#979797",
  },
  cautionBox: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cautionLabel: {
    fontWeight: "400",
    fontSize: 10,
    color: "#151515",
    marginLeft: 5,
  },
});
