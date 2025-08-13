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
import React, { useEffect, useState, useRef } from "react";
import Header from "../header/Header";
import QRCode from "react-native-qrcode-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../apidetails/Api";
import { Ionicons } from "@expo/vector-icons";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

const PaymentModal = ({ closeModal, onPaymentSuccess }) => {
  const [token, setToken] = useState(null);
  const [utrNumber, setUtrNumber] = useState("");
  const [utrError, setUtrError] = useState("");
  const [amountToPay, setAmountToPay] = useState(1200);
  const [isPaying, setIsPaying] = useState(false);

  const qrRef = useRef(); // ✅ Reference to QR code container

  const qrCodeData = `upi://pay?mc=5968&pa=yespay.smessi24427@yesbankltd&pn=VINCALAND SERVICES PRIVATE LIMITED&am=${amountToPay}`;

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((storedToken) => {
        if (storedToken) {
          console.log(storedToken, "thisIsAsyncToken");
          setToken(storedToken);
        }
      })
      .catch((error) => console.error("Error reading token:", error));
  }, []);

  // ✅ Download QR Code Image
  const handleQrDownload = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        return Alert.alert(
          "Permission Required",
          "Please allow storage access to save QR Code"
        );
      }

      const uri = await captureRef(qrRef, {
        format: "png",
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("Success", "QR Code saved to your gallery!");
    } catch (error) {
      console.error("QR download error:", error);
      Alert.alert("Error", "Could not save QR Code");
    }
  };

  // ✅ UTR Validation
  const validateUTR = (utr) => /^[a-zA-Z0-9]{12}$/.test(utr);

  const confirmPaymentCompletion = () => {
    if (!validateUTR(utrNumber)) {
      setUtrError("Invalid UTR. Must be 12 characters.");
      return;
    }

    setUtrError("");
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
        Alert.alert(
          "Payment Submitted",
          "Your payment is done. Amount will be credited to your wallet within 30 minutes.",
          [
            {
              text: "OK",
              onPress: () => {
                if (onPaymentSuccess) onPaymentSuccess();
                closeModal(false);
              },
            },
          ]
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
      <ScrollView contentContainerStyle={styles.main}>
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>
            Monthly Subscription Amount : ₹{amountToPay}
          </Text>
        </View>

        {/* QR Code Box */}
        <View ref={qrRef} collapsable={false} style={styles.qrContainer}>
          <QRCode
            value={qrCodeData}
            size={200}
            color="black"
            backgroundColor="white"
          />
        </View>

        {/* Download Button */}
        <Pressable
          onPress={handleQrDownload}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 6,
            paddingHorizontal: 20,
            backgroundColor: "#5D17EB",
            borderRadius: 30,
            alignSelf: "center",
          }}
        >
          <Ionicons name="download-outline" size={24} color={"#FFFFFF"} />
          <Text
            style={{
              color: "#FFFFFF",
              marginLeft: 10,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            QR Code
          </Text>
        </Pressable>

        <Text style={styles.noteText}>
          Scan this QR code and pay the amount. Once the payment is completed,
          enter your UTR number and click "Submit Payment".
        </Text>

        <TextInput
          style={[styles.input, { borderColor: utrError ? "red" : "#ccc" }]}
          placeholder="Enter UTR Number"
          value={utrNumber}
          onChangeText={setUtrNumber}
          keyboardType="number-pad"
        />

        {utrError ? <Text style={styles.utrError}>{utrError}</Text> : null}

        <Pressable
          style={[
            styles.submitBtn,
            { opacity: isPaying || utrNumber.trim() === "" ? 0.6 : 1 },
          ]}
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
  qrContainer: { marginVertical: 30, alignItems: "center", backgroundColor: "#fff", padding: 10, borderRadius: 10 },
  noteText: {
    marginTop: 15,
    color: "#555",
    fontSize: 14,
    paddingHorizontal: 20,
    fontWeight: "800",
  },
  input: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginVertical: 15,
    fontSize: 16,
  },
  utrError: {
    color: "red",
    marginLeft: 12,
    marginTop: -10,
    marginBottom: 10,
    fontSize: 13,
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
