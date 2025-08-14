import React, { useEffect, useState, useRef } from "react";
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
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

const { height, width } = Dimensions.get("window");

export default function PaymentReceipt({ navigation, route }) {
  const viewShotRef = useRef();
  const { data, chartData, dashBoardDetails } = route?.params;

  const [remainAmount, setRemainAmount] = useState(0);
  const [remainMonth, setRemainMonth] = useState(0);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (!data || !chartData || chartData.length === 0) return;

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

    const getMonthString = (val) =>
      Array.isArray(val) ? val[0] : typeof val === "string" ? val.trim() : null;

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

    const firstMonth = getMonthString(chartData[0]?.month);
    const lastMonth = getMonthString(data?.month);

    const startDate = parseMonth(firstMonth);
    const endDate = parseMonth(lastMonth);
    if (!startDate || !endDate) return;

    const monthsPaid =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth()) +
      1;

    const totalMonths = 36;
    const monthlyPayment = 1200;
    const remainingMonths = Math.max(totalMonths - monthsPaid, 0);
    const remainingAmount = remainingMonths * monthlyPayment;

    const nextPaymentDate = new Date(endDate);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

    const monthNames = Object.keys(monthMap);
    const nextPaymentFormatted = `${
      monthNames[nextPaymentDate.getMonth()]
    } ${nextPaymentDate.getFullYear()}`;

    setRemainMonth(remainingMonths);
    setRemainAmount(remainingAmount);
    setNoteText(
      `Note: This payment covers the ${
        monthsPaid === 1 ? "first" : monthsPaid + "th"
      } month of your ${totalMonths}-month subscription. The remaining balance of ₹${remainingAmount} is payable in ${remainingMonths} monthly installments. Your next payment of ₹${monthlyPayment} is due on [25 ${nextPaymentFormatted}].`
    );
  }, [data, chartData]);

// ---- helpers ------------------------------------------------------
async function assetToDataURI(mod) {
  const asset = Asset.fromModule(mod);
  await asset.downloadAsync();
  const uri = asset.localUri || asset.uri;
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  // try to infer mime; default to png
  const ext = (asset.name?.split(".").pop() || "png").toLowerCase();
  const mime =
    ext === "jpg" || ext === "jpeg"
      ? "image/jpeg"
      : ext === "svg"
      ? "image/svg+xml"
      : "image/png";
  return `data:${mime};base64,${base64}`;
}

/**
 * Builds the HTML string. Pass in your dynamic values.
 */
function buildReceiptHTML({
  logoSrc,       // Vector.png (brand mark)
  headerIconSrc, // paymentScreenIcon.png (top-right icon)
  watermarkSrc,  // backgroundIcon.png (center faint image)
}) {
  const name = dashBoardDetails?.name;
  const phone = dashBoardDetails?.phoneNumber ?? "";
  const email = dashBoardDetails?.emailId ?? "";

  console.log(name,"this");
  

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1"
/>
<style>
  *{box-sizing:border-box}
  body{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, "Helvetica Neue", sans-serif;
    background:#F2F2F2; margin:0; padding:24px;
  }
  .card{
    background:#fff; margin:0 auto; max-width:680px; position:relative; overflow:hidden;
    border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,.08);
  }
  .gradBar{height:20px; background:linear-gradient(90deg,#5D17EB,#350D85);}
  .headerRow{display:flex; align-items:center; justify-content:space-between; padding:12px 16px;}
  .brand{display:flex; align-items:center; gap:8px; font-weight:700; color:#22184f}
  .brand img{height:32px; width:auto}
  .title{font-size:14px; font-weight:600; text-align:center; margin:8px 0; text-decoration:underline;}
  .content{padding:10px 16px 16px}
  .subtitle{font-size:8px; color:#555; margin:0 0 12px; font-weight:500; line-height:1.6}
  .box{border:1px solid #ccc; border-radius:4px; padding:8px;}
  .row{display:flex; align-items:center; justify-content:space-between; margin:4px 0;}
  .label{font-size:12px; font-weight:700;}
  .value{font-size:12px;}
  .section{margin-top:12px;}
  .sectionTitle{font-size:14px; font-weight:700; margin:0 0 4px; background:#D8D6D680; padding:5px; border-radius:2px;}
  .detailRow{display:flex; align-items:center; justify-content:space-between; margin:4px 0;}
  .detailLabel{font-size:12px;}
  .detailValue{font-size:12px;}
  .totalRow{background:#D7D5D580; padding:6px; margin:6px 0; border-radius:2px; display:flex; justify-content:space-between;}
  .totalLabel{font-size:12px; font-weight:700;}
  .totalValue{font-size:12px; font-weight:700; color:green;}
  .remaining{background:#DAD8D880; padding:10px; border-radius:4px;}
  .remainingLabel, .remainingValue{font-weight:600; font-size:10px; color:#000}
  .note{font-size:7px; color:#000; margin-top:8px; font-weight:600; line-height:1.6}
  .bullet{display:flex; gap:6px; margin:10px 0;}
  .bulletText{font-size:7px; font-weight:600; width:90%}
  .footerText{font-size:10px; text-align:center; margin-top:12px; font-weight:600; color:#000;}
  .footerBox{background:#D2D1D1; padding:10px; display:flex; align-items:center; justify-content:space-between;}
  .addr{width:30%; font-weight:500; font-size:7px;}
  .footerRight{font-weight:500; font-size:7px; text-align:right}
  .gradBarBottom{height:20px; background:linear-gradient(90deg,#5D17EB,#350D85);}
  .headerIcon{height:28px; width:auto;}
  .watermark{
    position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    pointer-events:none;
  }
  .watermark img{max-width:80%; height:auto; opacity:.06;}
</style>
</head>
<body>
  <div class="card">
    <div class="gradBar"></div>

    <div class="watermark">
      <img src="${watermarkSrc}" />
    </div>

    <div class="headerRow">
      <div class="brand">
        <img src="${logoSrc}" />
        <span>VINCALAND</span>
      </div>
    </div>

    <div class="title">PAYMENT RECEIPT</div>

    <div class="content">
      <p class="subtitle">
        We hereby confirm that we have successfully received your payment of ₹1,200
        (One Thousand Two Hundred Only), which includes:
      </p>

      <!-- Customer info -->
      <div class="box">
        <div class="row"><span class="label">Customer name:</span><span class="value">${name}</span></div>
        <div class="row"><span class="label">Mobile number:</span><span class="value">+${phone}</span></div>
        <div class="row"><span class="label">Email:</span><span class="value">${email}</span></div>
      </div>

      <!-- Payment details -->
      <div class="section">
        <div class="sectionTitle">Payment details</div>
        <div class="detailRow"><span class="detailLabel">Subscription Charges</span><span class="detailValue">₹ 1000/-</span></div>
        <div class="detailRow"><span class="detailLabel">GST</span><span class="detailValue">₹ 180/-</span></div>
        <div class="detailRow"><span class="detailLabel">Service Charges</span><span class="detailValue">₹ 20/-</span></div>
        <div class="totalRow"><span class="totalLabel">Total Amount</span><span class="totalValue">₹ 1200/-</span></div>
      </div>

      <!-- Remaining -->
      <div class="section remaining">
        <div class="detailRow"><span class="remainingLabel">Remaining amount</span><span class="remainingValue">${remainAmount}/-</span></div>
        <div class="detailRow"><span class="remainingLabel">Remaining months</span><span class="remainingValue">${remainMonth} Months</span></div>
      </div>

      <!-- Note -->
      <p class="note">${noteText}</p>

      <div class="bullet">
        <!-- simple dot -->
        <div style="width:10px;height:10px;border-radius:10px;border:1px solid #000;margin-top:1px"></div>
        <div class="bulletText">
          This payment has been credited towards your active subscription, and your services will continue without interruption for the subscribed period. Please retain this receipt for your records.
        </div>
      </div>

      <div class="footerText">
        We appreciate your prompt payment and thank you for choosing Vincaland Services Pvt Ltd.
      </div>
    </div>

    <div class="footerBox">
      <div class="addr">
        430,HBR 2nd Layout,2nd floor, Uniworks Pro, Kalyan Nagar, Bangalore, Karnataka 560043
      </div>
      <div class="footerRight">
        Email : help@vincaland.com<br/>
        www.vincaland.com
      </div>
    </div>

    <div class="gradBarBottom"></div>
  </div>
</body>
</html>
`;
}

// ---- call this to build + share the PDF --------------------------------
async function generateReceipt({
  dashBoardDetails,
  remainAmount,
  remainMonth,
  noteText,
}) {
  // convert local images to data URIs
  const [logoSrc, headerIconSrc, watermarkSrc] = await Promise.all([
    assetToDataURI(require("../../../assets/Vector.png")),
    assetToDataURI(require("../../../assets/paymentScreenIcon.png")),
    assetToDataURI(require("../../../assets/backgroundIcon.png")),
  ]);

  const html = buildReceiptHTML({
    dashBoardDetails,
    remainAmount,
    remainMonth,
    noteText,
    logoSrc,
    headerIconSrc,
    watermarkSrc,
  });

  // ✅ generate with custom filename
  const { uri } = await Print.printToFileAsync({
    html,
    fileName: "vincaland", // 👈 name without extension
  });

  // ✅ move file to a permanent location with .pdf extension
  const newPath = FileSystem.documentDirectory + "vincaland.pdf";
  await FileSystem.moveAsync({ from: uri, to: newPath });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(newPath, {
      mimeType: "application/pdf",
      dialogTitle: "Share your receipt",
      UTI: "com.adobe.pdf",
    });
  }

  return newPath;
}



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header navigation={navigation} title={"Receipt history"} />
        <View style={styles.receiptCard}>
          <LinearGradient
            colors={["#5D17EB", "#350D85"]}
            style={{ height: 20, width: "auto" }}
          />
          <View style={styles.headerRow}>
            <Image source={require("../../../assets/paymentScreenIcon.png")} />
            <View>
              <View style={styles.iconImageBox}>
                <Image
                  source={require("../../../assets/Vector.png")}
                  style={styles.iconImage}
                />
                <Text style={styles.vincLabel}>VINCALAND</Text>
              </View>
            </View>
          </View>
          <Text style={styles.title}>PAYMENT RECEIPT</Text>
          <View style={{ padding: 10 }}>
            <Text style={styles.subtitle}>
              We hereby confirm that we have successfully received your payment
              of ₹1,200 (One Thousand Two Hundred Only), which includes:
            </Text>
            <View style={styles.infoBox}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Customer name:</Text>
                <Text style={styles.infoValue}>{dashBoardDetails?.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mobile number:</Text>
                <Text style={styles.infoValue}>
                  +{dashBoardDetails?.phoneNumber}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>
                  {dashBoardDetails?.emailId}
                </Text>
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
                  {
                    backgroundColor: "#D7D5D580",
                    padding: 5,
                    marginVertical: 5,
                  },
                ]}
              >
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>₹ 1200/-</Text>
              </View>
            </View>
            {/* Remaining */}
            <View
              style={[
                styles.section,
                { backgroundColor: "#DAD8D880", padding: 10 },
              ]}
            >
              <View style={styles.detailRow}>
                <Text style={styles.remainingLabel}>Remaining amount</Text>
                <Text style={styles.remainingValue}>{remainAmount}/-</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.remainingLabel}>Remaining months</Text>
                <Text style={styles.remainingValue}>{remainMonth} Months</Text>
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
          <View style={styles.footerBox}>
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
          <LinearGradient
            colors={["#5D17EB", "#350D85"]}
            style={{ height: 20 }}
          />
        </View>
      <Pressable onPress={generateReceipt} style={styles.downloadBtn}>
        <Ionicons name="download-outline" size={24} color="#fff" />
        <Text style={styles.downloadText}>Download</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F2F2F2", paddingBottom: 24 },
  receiptCard: { backgroundColor: "#fff", margin: 16 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconImage: {
    height: height * 0.05,
    width: width * 0.12,
    resizeMode: "stretch",
  },
  iconImageBox: { flexDirection: "row", alignItems: "center" },
  vincLabel: { fontWeight: "bold", fontSize: 14, marginRight: 10 },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 8,
    textDecorationLine: "underline",
  },
  subtitle: {
    fontSize: 8,
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
  remainingLabel: { fontWeight: "600", fontSize: 10, color: "#000000" },
  remainingValue: { fontWeight: "600", fontSize: 10, color: "#000000" },
  note: { fontSize: 7, color: "#000000", marginTop: 8, fontWeight: "600" },
  footerText: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 12,
    fontWeight: "600",
    color: "#000000",
  },
  footerBox: {
    backgroundColor: "#D2D1D1",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
});
