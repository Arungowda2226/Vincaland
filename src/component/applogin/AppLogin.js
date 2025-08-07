import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import LoanApi from "../apidetails/LoanApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const { width, height } = Dimensions.get("window");

const AppLogin = ({ navigation }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isShowForgotPass, setIsShowForgotPass] = useState(false);
  const [isShowOtp, setIsShowOtp] = useState(false);
  const [isShowNewPasswordModal, setIsShowNewPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();

  const iconSource = showPass
    ? require("../../../assets/hideEye.png")
    : require("../../../assets/eye.png");

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleLogin = () => {
    console.log("clicking");
    
    if (mail?.trim() && password?.trim()) {
      const url = `${LoanApi}/auth/login`;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mail,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "thisIsData");
          if (data?.message === "User not found" || data?.error) {
            Alert.alert("Login Failed", data?.message || "Invalid credentials");
            return; // prevent navigating
          }
          dispatch(setUser(data));
          navigation.replace("Main");
          // navigation.navigate('Main', { loginUser: data });
          // navigation.navigate('Main', { screen: 'Home', params: { loginUser: data } });
          // navigation.navigate("Home",{loginUser: data});
        })
        .catch((err) => {
          console.log(err, "thisIsError");
        });
    } else {
      Alert.alert(
        "Missing Information",
        "Please enter both email and password."
      );
    }
  };

  const handleSignUp = () => {
    navigation.navigate("AppSignUp");
  };

  const handleForgotPass = () => {
    setIsShowForgotPass(true);
  };

  const handleSubmitPhone = () => {
    // setIsShowForgotPass(false);
    // setIsShowOtp(true);
    console.log("clicked");

    if (!phoneNumber) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    fetch(`${LoanApi}/auth/sendOtp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "thisIsData");
        if (data.message === "OTP Sent") {
          setIsShowForgotPass(false);
          setIsShowOtp(true);
        } else {
          Alert.alert("Error", data.message || "Failed to send OTP");
        }
      })
      .catch((err) => {
        console.log("Network error:", err);
        Alert.alert("Error", "Network error");
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

  // const handleSubmitOtp = () => {
  //   setIsShowOtp(false);
  //   setIsShowNewPasswordModal(true);
  // };

  const handleSubmitOtp = () => {
    const otp = otpDigits.join("");
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP");
      return;
    }

    fetch(`${LoanApi}/auth/verifyOtp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber, otp }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "OTP verified successfully") {
          setIsShowOtp(false);
          setIsShowNewPasswordModal(true);
        } else {
          Alert.alert("Error", data.message || "Invalid OTP");
        }
      })
      .catch(() => Alert.alert("Error", "Network error"));
  };

  const handleResetPassword = () => {
    if (!newPassword || newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    fetch(`${LoanApi}/auth/resetPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber, newPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Password reset successful") {
          setIsShowNewPasswordModal(false);
          Alert.alert("Success", "Password reset successfully!");
          setPassword(""); // optional
        } else {
          Alert.alert("Error", data.message || "Failed to reset password");
        }
      })
      .catch(() => Alert.alert("Error", "Network error"));
  };

  return (
    <View style={styles.main}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/Vector.png")}
          style={styles.iconImage}
        />
        <Text style={styles.topLabel}>Hi, Welcome back!</Text>
        <Text style={styles.profileLabel}>Let's get started.</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.signInLabel}>Login</Text>
        <Text style={styles.infoLoginLabel}>
          Please fill in your details for Login
        </Text>
        <View style={[styles.container, { marginTop: 10 }]}>
          <Image
            source={require("../../../assets/email.png")}
            style={styles.lockIcon}
          />
          <TextInput
            placeholder="Enter your  email"
            onChangeText={setMail}
            value={mail}
            style={{ flex: 1 }}
          />
        </View>
        <View style={[styles.container, { justifyContent: "space-between" }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../assets/lock.png")}
              style={styles.lockIcon}
            />
            <TextInput
              placeholder="Enter your  password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={showPass ? false : true}
              style={{ width: "75%" }}
            />
          </View>
          <Pressable onPress={handleShowPass}>
            <Image source={iconSource} style={styles.lockIcon} />
          </Pressable>
        </View>
        <View style={styles.mainBox}>
          <View style={styles.checkBox}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#4630EB" : undefined}
            />
            <Text style={styles.paragraph}>Remember me</Text>
          </View>
          <Pressable onPress={handleForgotPass}>
            <Text style={styles.forgotPassLabel}>Forgot password?</Text>
          </Pressable>
        </View>
        <Pressable onPress={handleLogin} style={styles.loginBtn}>
          <Text style={styles.loginLabel}>Login</Text>
        </Pressable>
        <View style={styles.doHaveBox}>
          <Text style={styles.singUpLabel}>Don't have an account?</Text>
          <Pressable onPress={handleSignUp}>
            <Text
              style={[styles.singUpLabel, { color: "#4630EB", marginLeft: 10 }]}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
      <Modal
        visible={isShowForgotPass}
        transparent
        animationType="slide" // This makes it slide from bottom
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsShowForgotPass(false)}
        >
          <Pressable style={styles.bottomModal} onPress={() => {}}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.modalTitle}>Reset Password</Text>
              <Ionicons
                onPress={() => setIsShowForgotPass(false)}
                name="close-circle-outline"
                size={30}
              />
            </View>

            <Text style={styles.modalText}>
              Enter your email to reset your password
            </Text>
            <View style={styles.modalInput}>
              <Image source={require("../../../assets/user.png")} />
              <TextInput
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                style={{ flex: 1 }}
              />
            </View>

            <Pressable onPress={handleSubmitPhone} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
      <Modal
        visible={isShowOtp}
        transparent
        animationType="slide" // This makes it slide from bottom
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsShowOtp(false)}
        >
          <Pressable style={styles.bottomModal} onPress={() => {}}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.modalTitle}>Reset Password</Text>
              <Ionicons
                onPress={() => setIsShowOtp(false)}
                name="close-circle-outline"
                size={30}
              />
            </View>

            <Text style={styles.modalText}>Enter OTP Code</Text>
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

            <Pressable onPress={handleSubmitOtp} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Submit</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
      <Modal visible={isShowNewPasswordModal} transparent animationType="slide">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsShowNewPasswordModal(false)}
        >
          <Pressable style={styles.bottomModal} onPress={() => {}}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.modalTitle}>Create New Password</Text>
              <Ionicons
                onPress={() => setIsShowNewPasswordModal(false)}
                name="close-circle-outline"
                size={30}
              />
            </View>

            <Text style={styles.modalText}>Enter your new password</Text>

            <View style={styles.modalInput}>
              <Ionicons name="lock-closed-outline" size={20} color="#555" />
              <TextInput
                placeholder="New Password"
                secureTextEntry
                style={{ flex: 1, marginLeft: 10 }}
                onChangeText={setNewPassword}
                value={newPassword}
              />
            </View>

            <View style={styles.modalInput}>
              <Ionicons name="lock-closed-outline" size={20} color="#555" />
              <TextInput
                placeholder="Re-enter Password"
                secureTextEntry
                style={{ flex: 1, marginLeft: 10 }}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
            </View>

            <Pressable
              onPress={() => {
                // Add validation and API call logic here
                if (newPassword && newPassword === confirmPassword) {
                  setIsShowNewPasswordModal(false);
                  handleResetPassword();
                  alert("Password successfully reset!");
                  // Optionally navigate to login or home
                } else {
                  alert("Passwords do not match");
                }
              }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Submit</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default AppLogin;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 24,
  },
  iconImage: {
    marginTop: 50,
    height: height * 0.08,
    width: width * 0.2,
    resizeMode: "stretch",
  },
  topLabel: {
    fontWeight: "500",
    fontSize: 25,
    color: "#000000",
    marginVertical: 5,
  },
  profileLabel: {
    fontWeight: "500",
    fontSize: 16,
  },
  signInLabel: {
    fontWeight: "400",
    fontSize: 35,
    marginVertical: 10,
  },
  infoLoginLabel: {
    fontWeight: "600",
    fontSize: 13,
    color: "#0516D3",
    marginTop: 7,
  },
  container: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  lockIcon: {
    height: height * 0.035,
    width: width * 0.1,
    resizeMode: "stretch",
  },
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  paragraph: {
    fontWeight: "400",
    fontSize: 13,
    marginLeft: 5,
  },
  forgotPassLabel: {
    fontWeight: "500",
    fontSize: 13,
    color: "#0516D3",
  },
  loginBtn: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#0516D3",
    marginVertical: 10,
    marginTop: 20,
    borderRadius: 13,
  },
  loginLabel: {
    fontWeight: "600",
    fontSize: 17,
    color: "#FFFFFF",
  },
  doHaveBox: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  singUpLabel: {
    fontWeight: "500",
    fontSize: 14,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
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
});
