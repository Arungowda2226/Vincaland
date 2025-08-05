import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import API from "../apidetails/Api";

export default function LoginScreen({onSwitchToSignin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEye, setShowEye] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const navigation = useNavigation();

  const toggleEye = () => setShowEye((prev) => !prev);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password");
      return;
    }

    try {
      const response = await fetch(`${API}/investors/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId: email, password }),
      });
      const data = await response.json();
      if (!data.error) {
        navigation.navigate("DashBoard", { userDetails: data });
      } else {
        Alert.alert("Authentication Failed", data.message || "Try again");
      }
    } catch (err) {
      console.log("Login error:", err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNum) {
      Alert.alert("Validation", "Enter phone number");
      return;
    }

    try {
      const res = await fetch(`${API}/otp/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phoneNum }),
      });
      const data = await res.json();
      console.log("OTP Sent:", data);
      setShowOtp(true);
    } catch (error) {
      console.error("OTP send error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Validation", "Enter OTP");
      return;
    }

    try {
      const res = await fetch(`${API}/otp/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: phoneNum,
          otp,
          isSignup: false,
        }),
      });

      const data = await res.json();
      console.log("OTP verified:", data);

      if (!data.error) {
        handleOtpLogin();
      } else {
        Alert.alert("Invalid OTP", data.message || "Try again");
      }
    } catch (err) {
      console.log("Verify OTP error:", err);
    }
  };

  const handleOtpLogin = async () => {
    try {
      const res = await fetch(`${API}/otp/loginByOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phoneNum }),
      });
      const data = await res.json();
      console.log("OTP Login:", data);
      if (!data.error) {
        navigation.navigate("DashBoard", { userDetails: data });
        setShowLoginModal(false);
        setOtp("");
        setPhoneNum("");
        setShowOtp(false);
      } else {
        Alert.alert("Login failed", data.message || "Try again");
      }
    } catch (error) {
      console.error("LoginByOtp error:", error);
    }
  };

  const handleSignUp = () => {
    onSwitchToSignin();
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.label}>Sign In</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          placeholder="Enter Your Email"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputIcon}>
          <TextInput
            placeholder="Enter Your Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!showEye}
            style={{ flex: 1 }}
          />
          <Ionicons
            onPress={toggleEye}
            name={!showEye ? "eye" : "eye-off"}
            size={20}
          />
        </View>
      </View>

      <Pressable onPress={handleSignIn} style={styles.signInBtn}>
        <Text style={styles.btnTxt}>Login</Text>
      </Pressable>

      <View style={styles.loginType}>
        <Pressable onPress={handleSignUp} style={styles.typeBtn}>
          <Text style={styles.dontAc}>
            Don't have an account?{" "}
            <Text style={styles.withOtp}>Sign Up</Text>
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setShowLoginModal(true)}
          style={styles.typeBtn}
        >
          <Text style={styles.withOtp}>Login with OTP</Text>
        </Pressable>
      </View>

      {/* OTP Modal */}
      <Modal visible={showLoginModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.bottomModal}>
            <View style={styles.modalMain}>
              <Text style={styles.modalTitle}>Login with OTP</Text>
              <Ionicons
                onPress={() => setShowLoginModal(false)}
                name="close-circle-outline"
                size={30}
              />
            </View>

            <Text style={styles.modalText}>Phone Number</Text>
            <View style={styles.modalInput}>
              <Image
                source={require("../../../assets/phone.png")}
                style={{ marginRight: 5 }}
              />
              <TextInput
                placeholder="Enter your phone number"
                keyboardType="number-pad"
                onChangeText={setPhoneNum}
                value={phoneNum}
                style={{ flex: 1 }}
              />
            </View>

            {showOtp && (
              <>
                <Text style={styles.modalText}>OTP</Text>
                <View style={styles.modalInput}>
                  <TextInput
                    placeholder="Enter your OTP"
                    keyboardType="number-pad"
                    onChangeText={setOtp}
                    value={otp}
                    style={{ flex: 1 }}
                  />
                </View>
              </>
            )}

            <Pressable
              onPress={showOtp ? handleVerifyOtp : handleSendOtp}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>
                {showOtp ? "Login" : "Send OTP"}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  label: {
    fontWeight: "800",
    fontSize: 18,
    color: "blue",
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#F6F6F6",
  },
  inputIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
  },
  signInBtn: {
    padding: 12,
    borderRadius: 13,
    marginVertical: 10,
    backgroundColor: "#5D17EB",
    alignItems: "center",
  },
  btnTxt: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  inputLabel: {
    fontWeight: "700",
    fontSize: 15,
  },
  loginType: {
    alignItems: "center",
  },
  withOtp: {
    fontWeight: "700",
    fontSize: 16,
    textDecorationLine: "underline",
    color: "blue",
  },
  dontAc: {
    fontWeight: "600",
    fontSize: 14,
    color: "blue",
  },
  typeBtn: {
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomModal: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  modalMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  modalButton: {
    backgroundColor: "#0516D3",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
