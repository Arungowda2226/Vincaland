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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 24, paddingBottom: 100 }}>
        <View style={{ flexDirection: "row", alignItems: "center",justifyContent:"space-between", marginVertical:10}}>
          <Pressable onPress={handleBack} style={{flexDirection:"row", alignItems:"center", padding:10, backgroundColor:"#5D17EB", borderRadius:13}}>
            <Ionicons name="chevron-back-outline" size={30} color={"#FFFFFF"}/>
            <Text style={{marginLeft:5, color:"#FFFFFF", fontWeight:"600", fontSize:16}}>BACK</Text>
          </Pressable>
          <Image
            source={require("../../../assets/Vector.png")}
            style={{
              width: width * 0.12,
              height: height * 0.06,
              resizeMode: "stretch",
            }}
          />
          <View style={{width:"25%"}}/>
        </View>
        <Image
          source={require("../../../assets/Arrow.png")}
          style={{
            alignSelf: "center",
            width: width * 0.15,
            height: height * 0.05,
            resizeMode: "stretch",
          }}
        />
        <Text style={styles.mainLabel}>Premium Members Dashboard</Text>
        <Text style={styles.welLabel}>
          {showLogin ? "Welcome back" : "Join us today"}
        </Text>
        <View style={styles.container}>
          <View style={styles.buttons}>
            <Pressable
              onPress={handleLogin}
              style={[
                styles.loginBtn,
                { backgroundColor: showLogin ? "#5D17EB" : "#F6F6F6" },
              ]}
            >
              <Text
                style={[styles.label, { color: !showLogin ? "blue" : "white" }]}
              >
                Login
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSignUp}
              style={[
                styles.loginBtn,
                { backgroundColor: showReg ? "#5D17EB" : "#F6F6F6" },
              ]}
            >
              <Text
                style={[styles.label, { color: !showReg ? "blue" : "white" }]}
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
          {showLogin && <LoginScreen onSwitchToSignin={handleSignUp} />}
          {showReg && <Register onSwitchToLogin={handleLogin} />}
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
    color: "#5D17EB",
    textAlign: "center",
    marginVertical: 10,
  },
  welLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: "#5D17EB",
    textAlign: "center",
    marginBottom: 20,
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
    // marginBottom: 20,
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
