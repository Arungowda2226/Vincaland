import React, { useState, useRef, useEffect } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import axios from "axios";
import API from "../apidetails/Api";

const { width } = Dimensions.get("window");

const Register = ({ onSwitchToLogin }) => {
  const [isChecked, setChecked] = useState(false);
  const [showAddPhoneModal, setShowAddPhoneModal] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);

  // ✅ Added missing states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const otpRefs = useRef([]);

  useEffect(() => {
    console.log(otpDigits, "checkOTP");
  }, [otpDigits]);

  const handleAddPhone = () => {
    setShowAddPhoneModal(true);
    console.log(`${API}/otp/sendOtp`,"thisIsSendOtp");
    
    fetch(`${API}/otp/sendOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);

    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSignIn = () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match");
      return;
    }

    axios
      .post(`${API}/investors/register`, {
        name,
        emailId: email,
        password,
        phoneNumber: phone,
      })
      .then((res) => {
        console.log("User registered:", res.data);
        Alert.alert("Success", "Account created successfully");
        navigation.navigate("DashBoard", { userDetails: res.data.investor });
      })
      .catch((err) => {
        console.error("Registration error:", err);
        Alert.alert("Error", "Failed to create account");
      });
  };

  const handleVerfityOtp = () => {
    const otpCode = otpDigits.join(""); // Combine digits into one string

    if (otpCode.length < 6) {
      Alert.alert("Incomplete OTP", "Please enter all 6 digits of the OTP.");
      return;
    }

    console.log(`${API}/otp/verify-otp`);
    fetch(`${API}/otp/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phone,
        otp: otpCode,
        isSignup: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data);
        if (!data.error) {
          if (!data.error) {
            Alert.alert("Success", "OTP verified successfully!");
            setShowAddPhoneModal(false);
            setIsPhoneVerified(true); // ✅ Set phone as verified
          }
        } else {
          Alert.alert("Error", data.message || "OTP verification failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Network Error", "Failed to verify OTP. Please try again.");
      });
  };

  const handleSignUp = () => {
    onSwitchToLogin();
  }

  return (
    <View style={styles.main}>
      <Text style={styles.createLabel}>Create Account</Text>
      <View style={styles.inputContainer}>
        <Text>Full Name</Text>
        <TextInput
          placeholder="Enter your full name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email Address</Text>
        <TextInput
          placeholder="Enter your Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Phone Number</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder="Verify your phone number"
            style={[styles.input, { width: "60%" }]}
            value={phone}
            onChangeText={setPhone}
          />
          <Pressable onPress={handleAddPhone} style={styles.phoneBtn}>
            {isPhoneVerified ? (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            ) : (
              <Text style={{ color: "white" }}>Add Phone</Text>
            )}
          </Pressable>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <View style={styles.inputIcon}>
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
          />
          <Ionicons name={"eye"} size={20} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Re-enter Password</Text>
        <View style={styles.inputIcon}>
          <TextInput
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Ionicons name={"eye"} size={20} />
        </View>
      </View>
      <View style={styles.checkBoxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
        />
        <Text style={styles.checkLabel}>
          I agree to the{" "}
          <Text style={styles.termsLabel}>Terms and Conditions</Text>
        </Text>
      </View>
      <Pressable onPress={handleSignIn} style={styles.createBtn}>
        <Text style={styles.createBtnLabel}>Create Account</Text>
      </Pressable>
      <Pressable onPress={handleSignUp} style={styles.loginType}>
        <Text style={styles.dontAc}>
          Already have an Account?
            <Text style={styles.withOtp}>Sign in</Text>
        </Text>
      </Pressable>
      <Modal
        visible={showAddPhoneModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              source={require("../../../assets/otpIcon.png")}
              style={{ height: "50%", width: "100%", resizeMode: "contain" }}
            />
            <Text style={styles.infoLabel}>Enter OTP Code</Text>
            <Text style={{ textAlign: "center", marginBottom: 10 }}>
              Enter the code sent to mail to reset your password.
            </Text>
            <View style={styles.otpContainer}>
              {otpDigits.map((digit, index) => (
                <View style={styles.box} key={index}>
                  <TextInput
                    ref={(el) => (otpRefs.current[index] = el)}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={(val) => handleOtpChange(val, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    value={digit}
                    autoFocus={index === 0}
                  />
                </View>
              ))}
            </View>
            <Text style={{ marginBottom: 10 }}>
              Didn’t receive the code?{" "}
              <Text style={styles.termsLabel}>Resend code</Text>
            </Text>
            <Pressable onPress={handleVerfityOtp} style={styles.modalButton}>
              <Text style={{ color: "white" }}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  createLabel: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    color: "#5D17EB",
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#5D17EB",
    backgroundColor: "#F6F6F6",
    marginTop: 4,
    borderRadius: 13,
  },
  phoneBtn: {
    padding: 15,
    backgroundColor: "#5D17EB",
    borderRadius: 13,
    marginLeft: 2,
  },
  inputIcon: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#5D17EB",
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    color: "blue",
  },
  termsLabel: {
    fontWeight: "600",
    fontSize: 15,
    color: "blue",
  },
  checkBoxContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkLabel: {
    marginLeft: 5,
    flexWrap: "wrap",
  },
  createBtn: {
    padding: 15,
    borderRadius: 13,
    backgroundColor: "#5D17EB",
    marginVertical: 10,
    alignItems: "center",
  },
  createBtnLabel: {
    fontWeight: "600",
    fontSize: 18,
    color: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    minWidth: "70%",
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 4,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: "#0516D3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  infoLabel: {
    marginVertical: 5,
    fontWeight: "500",
    fontSize: 15,
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  box: {
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    padding: 2,
    marginRight: 3,
    marginVertical: 10,
  },
  otpInput: {
    width: width * 0.1,
    height: width * 0.12,
    textAlign: "center",
    fontSize: 18,
  },
  loginType: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
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
  gradientBox: {
    borderRadius: 15,
    transform: [{ rotate: "39.61deg" }],
  },
  phoneBtn: {
    padding: 15,
    backgroundColor: "#5D17EB",
    borderRadius: 13,
    marginLeft: 2,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
    minHeight: 40,
  },
});
