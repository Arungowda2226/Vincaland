import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEye, setShowEye] = useState(false);

  const navigation = useNavigation();

  const handleEyeHide = () => {
    setShowEye(!showEye);
  };

  const handleSignIn = () => {
    navigation.navigate("DashBoard");
  };

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
        <View
          style={[
            styles.inputIcon,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <TextInput
            placeholder="Enter Your Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!showEye}
          />
          <Ionicons
            onPress={handleEyeHide}
            name={!showEye ? "eye" : "eye-off"}
            size={20}
          />
        </View>
      </View>
      <Pressable onPress={handleSignIn} style={styles.signInBtn}>
        <Text style={styles.btnTxt}>Login</Text>
      </Pressable>
      <View style={styles.loginType}>
        <Pressable style={styles.typeBtn}>
          <Text style={styles.dontAc}>
            Don't have an account? <Text style={styles.withOtp}>Sign Up</Text>
          </Text>
        </Pressable>
        <Pressable style={styles.typeBtn}>
          <Text style={styles.withOtp}>Login with OTP</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 10,
  },
  label: {
    fontWeight: "800",
    fontSize: 18,
    color: "blue",
    textAlign: "center",
    marginBottom: 15,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#5D17EB",
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
    paddingVertical: 10,
  },
  inputIcon: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#5D17EB",
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
  },
  signInBtn: {
    padding: 10,
    borderRadius: 13,
    marginVertical: 10,
    backgroundColor: "#5D17EB",
    alignItems: "center",
    justifyContent: "center",
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
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
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
});
