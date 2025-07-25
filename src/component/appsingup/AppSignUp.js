import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";

const { width, height } = Dimensions.get("window");

const AppSignUp = ({navigation}) => {
  const [isChecked, setChecked] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const iconSource = showPass
    ? require('../../../assets/hideEye.png')
    : require('../../../assets/eye.png');

const iconConfirm = showConfirmPass
    ? require('../../../assets/hideEye.png')
    : require('../../../assets/eye.png');

  const handleShowPass = () => {
    setShowPass(!showPass);
  }

  const handleShowConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass)
  }

  const handleSignUp = () => {
    navigation.navigate("appLogin")
  }

  return (
    <View style={styles.main}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/Vector.png")}
          style={styles.iconImage}
        />
        <Text style={styles.topLabel}>Create an acount</Text>
        <Text style={styles.profileLabel}>Set Up Your Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{marginTop:20, paddingBottom:200}}>
        <Text style={styles.signInLabel}>Sign in</Text>
        <Text style={styles.infoLoginLabel}>
          Please fill in your details for sign in
        </Text>
        <View style={[styles.container, { marginTop: 10 }]}>
          <Image
            source={require("../../../assets/user.png")}
            style={styles.lockIcon}
          />
          <TextInput
            placeholder="Enter full name"
            onChangeText={setFullName}
            value={fullName}
            style={{flex:1 }}
          />
        </View>
        <View style={styles.container}>
          <Image
            source={require("../../../assets/email.png")}
            style={styles.lockIcon}
          />
          <TextInput
            placeholder="Enter your email"
            onChangeText={setEmail}
            value={email}
            style={{flex:1 }}
          />
        </View>
        <View style={styles.container}>
          <Image
            source={require("../../../assets/phone.png")}
            style={styles.lockIcon}
          />
          <TextInput
            placeholder="Phone number"
            onChangeText={setPhone}
            value={phone}
            style={{flex:1 }}
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
              secureTextEntry={showPass? false: true}
              style={{width:"75%"}}
            />
          </View>
          <Pressable onPress={handleShowPass}>
            <Image source={iconSource} style={styles.lockIcon} />          
          </Pressable>
        </View>
        <View style={[styles.container, { justifyContent: "space-between" }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../assets/lock.png")}
              style={styles.lockIcon}
            />
            <TextInput
              placeholder="Re-Enter your  password"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry={showConfirmPass? false: true}
              style={{width:"75%"}}
            />
          </View>
          <Pressable onPress={handleShowConfirmPass}>
            <Image source={iconConfirm} style={styles.lockIcon} />          
          </Pressable>
        </View>
        <View style={styles.mainBox}>
          <View style={styles.checkBox}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#4630EB" : undefined}
            />
            <Text style={styles.paragraph}>I Agree to <Text style={{color:"#4630EB"}}>Terms</Text> and <Text style={{color:"#4630EB"}}>Conditions</Text></Text>
          </View>
        </View>
        <Pressable style={styles.loginBtn}>
          <Text style={styles.loginLabel}>Create account</Text>
        </Pressable>
        <View style={styles.doHaveBox}>
          <Text style={styles.singUpLabel}>Already have an account?</Text>
          <Pressable onPress={handleSignUp}>
            <Text style={[styles.singUpLabel, { color: "#4630EB", marginLeft:10 }]}>Sign in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppSignUp

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
    marginTop:7
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
    borderRadius: 13
  },
  loginLabel: {
    fontWeight: "600",
    fontSize: 17,
    color: "#FFFFFF"
  },
  doHaveBox: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 10
  },
  singUpLabel: {
    fontWeight: "500",
    fontSize: 14,
  }
});