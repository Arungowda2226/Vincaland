import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../apidetails/Api";

const PaymentModal = ({ closeModal }) => {
  const [token, setToken] = useState(null);
  const [utrNumber, setUtrNumber] = useState("");
  const [amountToPay, setAmountToPay] = useState(1200); // default
  const [isPaying, setIsPaying] = useState(false);

  const qrCodeData = `upi://pay?mc=5968&pa=yespay.smessi24427@yesbankltd&pn=VINCALAND SERVICES PRIVATE LIMITED&am=${amountToPay}`;

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((storedToken) => {
        if (storedToken) {
          console.log(storedToken, "thisIsAsyncToken");
          setToken(storedToken);
        } else {
          console.log("No token found in AsyncStorage");
        }
      })
      .catch((error) => console.error("Error reading token:", error));
  }, []);

  // ✅ Confirm Payment Completion
  const confirmPaymentCompletion = () => {
    setIsPaying(true);
    fetch(`${API}/payments/paymentUpdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        paymentAmount: amountToPay,
        transactionId: utrNumber,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "thisIsData");
        Alert.alert(
          "Payment Submitted",
          "Your payment is done. Amount will be credited to your wallet within 30 minutes. If not credited, please contact our support team.",
          [{ text: "OK", onPress: () => closeModal(false) }]
        );
      })
      .catch((err) => {
        console.log(err, "thisIsError");
        Alert.alert("Error", "Something went wrong. Please try again.");
      })
      .finally(() => setIsPaying(false));
  };

  return (
    <View style={styles.container}>
      <Header title={"Payment"} closeModal={closeModal} />
      <ScrollView style={styles.main}>
        {/* Monthly Subscription Info */}
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>
            Monthly Subscription Amount : ₹{amountToPay}
          </Text>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrContainer}>
          <QRCode
            value={qrCodeData}
            size={200}
            color="black"
            backgroundColor="white"
            logoBackgroundColor="transparent"
          />
        </View>

        <Text style={styles.noteText}>
          Scan this QR code and pay the amount. Once the payment is completed,
          enter your UTR number and click "Submit Payment".
        </Text>

        {/* UTR Input and Submit */}
        <TextInput
          style={styles.input}
          placeholder="Enter UTR Number"
          value={utrNumber}
          onChangeText={setUtrNumber}
          keyboardType="numeric"
        />

        <Pressable
          style={styles.submitBtn}
          onPress={confirmPaymentCompletion}
          disabled={isPaying || utrNumber.trim() === ""}
        >
          {isPaying ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit Payment</Text>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  main: { flex: 1, padding: 24 },
  qrContainer: { marginVertical: 30, alignItems: "center" },
  noteText: {
    marginTop: 15,
    // textAlign: "center",
    color: "#555",
    fontSize: 14,
    paddingHorizontal: 20,
    fontWeight:"800"
  },
  input: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginVertical: 15,
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: "#3DC426",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 5,
    alignItems: "center",
  },
  amountBox: {
    backgroundColor: "#5D17EB",
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  amountText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
