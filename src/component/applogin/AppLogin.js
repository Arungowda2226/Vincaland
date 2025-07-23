import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";

const { width, height } = Dimensions.get("window");

const AppLogin = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
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
      <View>
        <Text style={styles.signInLabel}>Login</Text>
        <Text style={styles.infoLoginLabel}>
          Please fill in your details for Login
        </Text>
        <View style={[styles.container, { marginTop: 30 }]}>
          <Image
            source={require("../../../assets/email.png")}
            style={styles.lockIcon}
          />
          <TextInput
            placeholder="Enter your  email"
            onChangeText={setMail}
            value={mail}
          />
        </View>
        <View style={styles.container}>
          <Image
            source={require("../../../assets/lock.png")}
            style={styles.lockIcon}
          />
          <TextInput
            placeholder="Enter your  password"
            onChangeText={setPassword}
            value={password}
          />
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
          <Pressable>
            <Text style={styles.forgotPassLabel}>Forgot password?</Text>
          </Pressable>
        </View>
        <Pressable style={styles.loginBtn}>
            <Text style={styles.loginLabel}>Login</Text>
        </Pressable>
        <View style={styles.doHaveBox}>
            <Text>Don't have an account? 
                <Pressable>
                    <Text>Sign Up</Text>
                </Pressable>
            </Text>
        </View>
      </View>
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
    height: height * 0.1,
    width: width * 0.3,
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
    marginVertical: 5,
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
  loginBtn:{
    padding:15,
    alignItems:"center",
    backgroundColor:"#0516D3",
    marginVertical:10,
    marginTop:20,
    borderRadius:13
  },
  loginLabel:{
    fontWeight:"600",
    fontSize:17,
    color:"#FFFFFF"
  }
});
