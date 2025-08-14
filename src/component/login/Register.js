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
import API from "../apidetails/Api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const { width } = Dimensions.get("window");

const Register = ({ onSwitchToLogin, navigation }) => {
    const dispatch = useDispatch();
  
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
  const [showTerms, setShowTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const otpRefs = useRef([]);

  useEffect(() => {
    console.log(otpDigits, "checkOTP");
  }, [otpDigits]);

  const handleAddPhone = () => {
    const trimmedPhone = phone.trim();

    // ✅ Validate phone number length
    if (trimmedPhone.length !== 10 || !/^\d+$/.test(trimmedPhone)) {
      return Alert.alert(
        "Invalid Phone",
        "Please enter a valid 10-digit number"
      );
    }

    setShowAddPhoneModal(true);

    console.log(`${API}/otp/sendOtp`, "Sending OTP...");

    fetch(`${API}/otp/sendOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber: trimmedPhone }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("OTP Response:", data);
        if (data.error) {
          Alert.alert("Error", data.message || "Failed to send OTP");
        } else {
          Alert.alert("Success", "OTP sent successfully!");
        }
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        Alert.alert("Network Error", "Could not send OTP. Please try again.");
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
  console.log(`${API}/investors/register`, "thisIsError");

  const showAlert = (title, message) => Alert.alert(title, message);

  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim();
  const trimmedPhone = phone?.trim();
  const trimmedPassword = password?.trim();
  const trimmedConfirmPassword = confirmPassword?.trim();

  // ✅ Validations
  if (
    !trimmedName ||
    !trimmedEmail ||
    !trimmedPhone ||
    !trimmedPassword ||
    !trimmedConfirmPassword
  ) {
    return showAlert("Missing Fields", "Please fill in all fields");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return showAlert("Invalid Email", "Please enter a valid email address");
  }

  if (!/^\d{10}$/.test(trimmedPhone)) {
    return showAlert("Invalid Phone", "Please enter a valid 10-digit number");
  }

  if (trimmedPassword !== trimmedConfirmPassword) {
    return showAlert("Password Mismatch", "Passwords do not match");
  }

  if (trimmedPassword.length < 6) {
    return showAlert(
      "Weak Password",
      "Password must be at least 6 characters"
    );
  }

  if (!isPhoneVerified) {
    return showAlert(
      "Phone Not Verified",
      "Please verify your phone number before creating an account."
    );
  }

  if (!isChecked) {
    return showAlert(
      "Terms & Conditions Required",
      "Please read and accept the Terms & Conditions before proceeding."
    );
  }

  const bodyData = {
    name: trimmedName,
    emailId: trimmedEmail,
    password: trimmedPassword,
    phoneNumber: trimmedPhone,
  };

  fetch(`${API}/investors/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("User registered response:", data);

      if (data.error) {
        // ✅ Handle server-side error (duplicate email, etc.)
        return showAlert("Error", data.error || "Registration failed");
      }

      // ✅ Success case
      showAlert("Success", "Account created successfully");
      dispatch(setUser(data.investor));
      navigation.navigate("Main", {
        screen: "Home",
        params: { userDetails: data.investor },
      });
    })
    .catch((err) => {
      console.log("Fetch error:", err);
      showAlert("Error", "Something went wrong. Please try again later.");
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
  };

  const handleShowTermsCondition = () => {
    setShowTerms(true);
  };

  const handleCloseTermsModal = () => {
    setShowTerms(false);
  };

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
            placeholder="Verify phone number"
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
            secureTextEntry={!showPassword}
            style={{ flex: 1 }}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Re-enter Password</Text>
        <View style={styles.inputIcon}>
          <TextInput
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            style={{ flex: 1 }}
          />
          <Pressable
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.checkBoxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
        />
        <Pressable onPress={handleShowTermsCondition}>
          <Text style={styles.checkLabel}>
            I agree to the{" "}
            <Text style={styles.termsLabel}>Terms & Conditions</Text>
          </Text>
        </Pressable>
      </View>
      <Pressable onPress={handleSignIn} style={styles.createBtn}>
        <Text style={styles.createBtnLabel}>Create Account</Text>
      </Pressable>
      <Pressable onPress={handleSignUp} style={styles.loginType}>
        <Text style={styles.dontAc}>
          Already have an Account?
          <Text style={styles.withOtp}> Sign in</Text>
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
              Enter the code sent to your phone to verify your phone number.
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

      <Modal visible={showTerms} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalTermsContent}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontWeight: "500", fontSize: 14, color: "#000000" }}
              >
                Terms and Conditions
              </Text>
              <Ionicons
                name="close-outline"
                onPress={handleCloseTermsModal}
                size={24}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#C7C7C7",
                marginVertical: 10,
              }}
            />
            <Text
              style={{
                fontWeight: "400",
                fontSize: 12,
                color: "#000000",
                marginBottom: 5,
              }}
            >
              Vincaland Premium Membership – Terms and Conditions
            </Text>
            <Text style={styles.label}>
              1. Membership Duration & Cancellation
            </Text>
            <Text style={styles.subLabel}>
              The premium membership is valid for 36 months (3
              years).Cancellation and service access requests will be accepted
              only upon completion of the full 3-year term, i.e., in the 36th
              month of the subscription.
            </Text>
            <Text style={styles.label}>2. Payment Schedule</Text>
            <Text style={styles.subLabel}>
              Monthly subscription payments must be made between the 1st and 5th
              of each month.
            </Text>
            <Text style={styles.label}>3. Missed Payments</Text>
            <Text style={styles.subLabel}>
              If you miss a monthly subscription payment, your membership will
              be suspended.  The membership may be reinstated by paying all
              pending dues in full.
            </Text>
            <Text style={styles.label}>4. Consistent Non-Payment</Text>
            <Text style={styles.subLabel}>
              If subscription payments are missed for 3 consecutive months, the
              membership will be terminated permanently. In such cases, prior
              payments will not be eligible for refunds.
            </Text>
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
    color: "#2415C7",
    marginTop: 10,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    padding: 10,
    backgroundColor: "#F6F6F6",
    marginTop: 4,
    borderRadius: 13,
  },
  inputIcon: {
    marginVertical: 10,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    color: "#2415C7",
  },
  termsLabel: {
    fontWeight: "600",
    fontSize: 15,
    color: "#2415C7",
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
    backgroundColor: "#2415C7",
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
  modalTermsContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    // minWidth: "70%",
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 4,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: "#2415C7",
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
    color: "#2415C7",
    marginRight: 10,
  },
  dontAc: {
    fontWeight: "600",
    fontSize: 14,
  },
  typeBtn: {
    marginVertical: 10,
  },
  gradientBox: {
    borderRadius: 15,
    transform: [{ rotate: "39.61deg" }],
  },
  phoneBtn: {
    padding: 10,
    backgroundColor: "#2415C7",
    borderRadius: 13,
    marginLeft: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontWeight: "500",
    fontSize: 12,
    color: "#000000",
  },
  subLabel: {
    fontWeight: "500",
    fontSize: 12,
    color: "#000000",
    marginVertical: 10,
  },
});
