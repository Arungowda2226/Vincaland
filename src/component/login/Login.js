import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import LoginScreen from "./LoginScreen";
import Register from "./Register";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Login({navigation}) {
  const [showLogin, setShowLogin] = useState(true);
  const [showReg, setShowReg] = useState(false);

  const handleLogin = () => {
    setShowReg(false);
    setShowLogin(true);
  };

  const handleSignUp = () => {
    setShowLogin(false);
    setShowReg(true);
  };

  const handleBack = () => {
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1, marginTop:10 }}>
      <View style={{ flex: 1, padding: 24, paddingBottom: 100 }}>
        <Image
          source={require("../../../assets/Vector.png")}
          style={{
            alignSelf: "center",
            width: 80,
            height: 60,
            resizeMode: "stretch",
            marginTop:40
          }}
        />
        <Text style={styles.welLabel}>
          {showLogin ? "Hi, Welcome back!" : "Join us today"}
        </Text>
        <Text style={styles.subLabel}> {showLogin ? "Let's get Started":""}</Text>
        <View style={styles.container}>
          <View style={styles.buttons}>
            <Pressable
              onPress={handleLogin}
              style={[
                styles.loginBtn,
                { backgroundColor: showLogin ? "#2415C7" : "#F6F6F6" },
              ]}
            >
              <Text
                style={[styles.label, { color: !showLogin ? "#2415C7" : "#F6F6F6" }]}
              >
                Login
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSignUp}
              style={[
                styles.loginBtn,
                { backgroundColor: showReg ? "#2415C7" : "#F6F6F6" },
              ]}
            >
              <Text
                style={[styles.label, { color: !showReg ? "#2415C7" : "#F6F6F6" }]}
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
          {showLogin && <LoginScreen onSwitchToSignin={handleSignUp} />}
          {showReg && <Register onSwitchToLogin={handleLogin} navigation={navigation}/>}
        </View>
      </View>
      <LinearGradient
        colors={["#0012DD", "#0514BC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBox}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainLabel: {
    fontWeight: "800",
    fontSize: 18,
    color: "#2415C7",
    textAlign: "center",
    marginVertical: 10,
  },
  welLabel: {
    fontWeight: "900",
    fontSize: 20,
    // color: "#2415C7",
    textAlign: "center",
    marginTop: 10,
  },
  subLabel:{
    fontWeight:"600",
    fontSize: 16,
    textAlign: "center",
    marginBottom:15
  },
  container: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.14,
    shadowRadius: 4.2,
    elevation: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F6F6F6",
    borderRadius: 13,
    padding: 10,
  },
  loginBtn: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 13,
    marginHorizontal: 5,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
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
  gradientBox: {
    borderRadius: 15,
    transform: [{ rotate: "39.61deg" }],
  },
});
