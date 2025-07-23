import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';

const Register = () => {
    const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.main}>
      <Text style={styles.createLabel}>Create Account</Text>
      <View style={styles.inputContainer}>
        <Text>Full Name</Text>
        <TextInput placeholder="Enter your full name" style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email Address</Text>
        <TextInput placeholder="Enter your Email" style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Phone Number</Text>
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
          <TextInput placeholder="Verify your phone number" style={styles.input}/>
          <Pressable style={styles.phoneBtn}>
            <Text>Add Phone</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <View style={styles.inputIcon}>
            <TextInput placeholder="Enter your password"  />
            <Ionicons name={"eye"} size={20} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>Re-enter Password</Text>
        <View style={styles.inputIcon}>
            <TextInput placeholder="Re-enter your password"  />
            <Ionicons name={"eye"} size={20} />
        </View>
      </View>
      <View style={styles.checkBoxContainer}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text style={styles.checkLabel}>I agree to the <Text style={styles.termsLabel}>Terms and Conditions</Text></Text>
      </View>
     <Pressable style={styles.createBtn}>
        <Text style={styles.createBtnLabel}>Create Account</Text>
     </Pressable>
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
  phoneBtn:{
    padding:15,
    backgroundColor: "#5D17EB",
    borderRadius:13,
    marginLeft:2
  },
  inputIcon: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#5D17EB",
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
  },
  checkbox:{
    color:"blue"
  },
  termsLabel:{
    fontWeight:"600",
    fontSize:15,
    color:"blue"
  },
  checkBoxContainer:{
    marginVertical:10,
    flexDirection:"row",
    alignItems:"center"
  },
  checkLabel:{
    marginLeft:5,
    flexWrap:"wrap"
  },
  createBtn:{
    padding:15,
    borderRadius:13,
    backgroundColor:"#5D17EB",
    marginVertical:10,
    alignItems:"center"
  },
  createBtnLabel:{
    fontWeight:"600",
    fontSize:18,
    color:"white"
  }
});
