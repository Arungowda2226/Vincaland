import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../header/Header";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

export default function PaymentReceipt({ navigation, route }) {
  const { data, chartData, dashBoardDetails } = route?.params;

  const [remainAmount, setRemainAmount] = useState(0);
  const [remainMonth, setRemainMonth] = useState(0);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (!data || !chartData || chartData.length === 0) return;

    console.log("Raw data:", data);
    console.log("Raw chartData[0]:", chartData[0]);

    const getMonthString = (val) => {
      if (Array.isArray(val)) return val[0];
      if (typeof val === "string") return val.trim();
      return null;
    };

    const firstMonth = getMonthString(chartData[0]?.month);
    const lastMonth = getMonthString(data?.month);

    const monthMap = {
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
    };

    const parseMonth = (monthYear) => {
      if (!monthYear) return null;
      const clean = monthYear.replace(",", "").trim().toLowerCase();
      const parts = clean.split(/\s+/);
      if (parts.length !== 2) return null;
      const [monthName, year] = parts;
      const monthIndex = monthMap[monthName];
      if (monthIndex === undefined || isNaN(parseInt(year))) return null;
      return new Date(parseInt(year), monthIndex, 1);
    };

    const startDate = parseMonth(firstMonth);
    const endDate = parseMonth(lastMonth);

    if (!startDate || !endDate) {
      console.warn("Invalid month after parsing:", firstMonth, lastMonth);
      return;
    }

    const monthsPaid =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth()) +
      1;

    const totalMonths = 36;
    const monthlyPayment = 1200;
    const remainingMonths = Math.max(totalMonths - monthsPaid, 0);
    const remainingAmount = remainingMonths * monthlyPayment;

    // Calculate next payment date = endDate + 1 month
    const nextPaymentDate = new Date(endDate);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

    // Format next payment date
    const monthNames = Object.keys(monthMap);
    const nextPaymentFormatted = `${
      monthNames[nextPaymentDate.getMonth()]
    } ${nextPaymentDate.getFullYear()}`;

    setRemainMonth(remainingMonths);
    setRemainAmount(remainingAmount);

    // Set note dynamically
    setNoteText(
      `Note: This payment covers the ${
        monthsPaid === 1 ? "first" : monthsPaid + "th"
      } month of your ${totalMonths}-month subscription. The remaining balance of ₹${remainingAmount} is payable in ${remainingMonths} monthly installments. Your next payment of ₹${monthlyPayment} is due on [25 ${nextPaymentFormatted}].`
    );
  }, [data, chartData]);

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} title={"Receipt history"} />

      <View style={styles.receiptCard}>
        <LinearGradient
          colors={["#5D17EB", "#350D85"]}
          style={{ height: 20, width: "auto" }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image source={require("../../../assets/paymentScreenIcon.png")} />
          <View>
            <View style={styles.iconImageBox}>
              <Image
                source={require("../../../assets/Vector.png")}
                style={styles.iconImage}
              />
              <Text style={styles.vincLabel}>VINCALAND</Text>
            </View>
            {/* <Text style={styles.date}>Date: 18 July 2025 9:11AM</Text> */}
          </View>
        </View>
        <Text style={styles.title}>PAYMENT RECEIPT</Text>
        <View style={{ padding: 10 }}>
          <Text style={styles.subtitle}>
            We hereby confirm that we have successfully received your payment of
            ₹1,200 (One Thousand Two Hundred Only), which includes:
          </Text>
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Customer name:</Text>
              <Text style={styles.infoValue}>{dashBoardDetails?.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Mobile number:</Text>
              <Text style={styles.infoValue}>+{dashBoardDetails?.phoneNumber}</Text>
            </View>
            {/* <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Subscription ID:</Text>
            <Text style={styles.infoValue}>VIN001</Text>
          </View> */}
            {/* <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Transaction ID:</Text>
            <Text style={styles.infoValue}>7754630045632</Text>
          </View> */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{dashBoardDetails?.emailId}</Text>
            </View>
          </View>
          {/* Payment Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Subscription Charges</Text>
              <Text style={styles.detailValue}>₹ 1000/-</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>GST</Text>
              <Text style={styles.detailValue}>₹ 180/-</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Service Charges</Text>
              <Text style={styles.detailValue}>₹ 20/-</Text>
            </View>
            <View
              style={[
                styles.detailRow,
                { backgroundColor: "#D7D5D580", padding: 5, marginVertical: 5 },
              ]}
            >
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹ 1200/-</Text>
            </View>
          </View>

          {/* Remaining */}
          <View style={[styles.section,{backgroundColor:"#DAD8D880", padding:10}]}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel,{fontWeight:"600", fontSize:10, color:"#000000"}]}>Remaining amount</Text>
              <Text style={[styles.detailValue,{fontWeight:"600", fontSize:10, color:"#000000"}]}>{remainAmount}/-</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel,{fontWeight:"600", fontSize:10, color:"#000000"}]}>Remaining months</Text>
              <Text style={[styles.detailValue,{fontWeight:"600", fontSize:10, color:"#000000"}]}>{remainMonth} Months</Text>
            </View>
          </View>

          {/* Note */}
          <Text style={styles.note}>{noteText}</Text>

          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Ionicons
              name="alert-circle-outline"
              size={15}
              style={{ marginRight: 5, marginTop: 2 }}
            />
            <Text style={{ fontSize: 7, fontWeight: "600", width: "90%" }}>
              This payment has been credited towards your active subscription,
              and your services will continue without interruption for the
              subscribed period. Please retain this receipt for your records.
            </Text>
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>
            We appreciate your prompt payment and thank you for choosing
            Vincaland Services Pvt Ltd.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#D2D1D1",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ width: "30%", fontWeight: "500", fontSize: 7 }}>
            430,HBR 2nd Layout,2nd floor,Uniworks Pro,kalyan
            nagar,Bangalore,Karnatka 560043
          </Text>
          <View>
            <Text style={{ fontWeight: "500", fontSize: 7 }}>
              Email :help@vincaland.com
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 7 }}>
              www.vincaland.com
            </Text>
          </View>
        </View>
        <LinearGradient colors={["#5D17EB", "#350D85"]} style={{height:20}}/>
      </View>

      <Pressable style={styles.downloadBtn}>
        <Ionicons name="download-outline" size={24} color="#fff" />
        <Text style={styles.downloadText}>Download</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },
  header: { flexDirection: "row", alignItems: "center", padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 8 },
  receiptCard: {
    backgroundColor: "#fff",
    // borderRadius: 8,
    margin: 16,
    // padding: 16,
    position: "relative",
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.1,
  },
  logoRow: { flexDirection: "row", justifyContent: "space-between" },
  logoText: { fontSize: 16, fontWeight: "bold", color: "#5D17EB" },
  date: { fontSize: 8, color: "#000000", marginTop: 5 },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 8,
    textDecorationLine: "underline",
  },
  subtitle: {
    fontSize: 8,
    // textAlign: "center",
    color: "#555",
    marginBottom: 12,
    fontWeight: "500",
  },
  infoBox: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  infoLabel: { fontSize: 12, fontWeight: "bold" },
  infoValue: { fontSize: 12 },
  section: { marginTop: 12 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    backgroundColor: "#D8D6D680",
    padding: 5,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  detailLabel: { fontSize: 12 },
  detailValue: { fontSize: 12 },
  totalLabel: { fontSize: 12, fontWeight: "bold" },
  totalValue: { fontSize: 12, fontWeight: "bold", color: "green" },
  note: { fontSize: 7, color: "#000000", marginTop: 8, fontWeight: "600" },
  footerText: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 12,
    fontWeight: "600",
    color: "#000000",
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5D17EB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: "center",
    marginBottom: 30,
  },
  downloadText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  iconImage: {
    height: height * 0.05,
    width: width * 0.12,
    resizeMode: "stretch",
  },
  iconImageBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  vincLabel: {
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 10,
  },
});
