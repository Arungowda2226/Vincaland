import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../apidetails/Api";

const BACKEND_URL = API;

const PaymentModal = ({ closeModal }) => {
  const [token, setToken] = useState(null);
  const [utrNumber, setUtrNumber] = useState("");
  const [amountToPay, setAmountToPay] = useState(1200); // default
  const [qrCodeData, setQrCodeData] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  // ✅ Fetch token from AsyncStorage
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          console.log(storedToken, "thisIsAsyncToken");
          setToken(storedToken);
        } else {
          console.log("No token found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error reading token from AsyncStorage:", error);
      }
    };

    fetchToken();
  }, []);

  // ✅ Prepare Payment (generate QR Code)
  const preparePayment = () => {
    if (!amountToPay || amountToPay < 1000 || amountToPay > 5000) {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid amount between ₹1000 and ₹5000."
      );
      return;
    }

    const upiString = `upi://pay?mc=5968&pa=yespay.smessi24427@yesbankltd&pn=VINCALAND SERVICES PRIVATE LIMITED&am=${amountToPay}`;
    setQrCodeData(upiString);
    Alert.alert(
      "QR Code Ready",
      `Scan the QR code to pay ₹${amountToPay}. After payment, enter your UTR number.`
    );
  };

  // ✅ Confirm Payment Completion
  const confirmPaymentCompletion = () => {
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
    .then(res=> res.json())
    .then((data)=>{
      console.log(data,"thisIsData");
    })
    .catch((err)=>{
      console.log(err,"thisIsError");
    })
  };

  return (
    <View style={styles.container}>
      <Header title={"Payment"} closeModal={closeModal} />
      <View style={styles.main}>
        {/* QR Code Section */}
        {qrCodeData ? (
          <View style={styles.qrContainer}>
            <QRCode
              value={qrCodeData}
              size={200}
              color="black"
              backgroundColor="white"
              logoBackgroundColor="transparent"
            />
          </View>
        ) : (
          <View>
            <View style={[styles.prepareBtn, { marginTop: 40 }]}>
              <Text style={styles.submitText}>
                Monthly Subscription Amount : ₹{amountToPay}
              </Text>
            </View>
            <Pressable style={styles.prepareBtn} onPress={preparePayment}>
              <Text style={styles.submitText}>Generate QR Code</Text>
            </Pressable>
          </View>
        )}

        {/* Info Section */}
        {qrCodeData !== "" && (
          <>
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
              disabled={isPaying}
            >
              {isPaying ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitText}>Submit Payment</Text>
              )}
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  main: { flex: 1, padding: 24 },
  qrContainer: { marginVertical: 30, alignItems: "center" },
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
  prepareBtn: {
    backgroundColor: "#5D17EB",
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
