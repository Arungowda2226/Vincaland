import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import API from "../apidetails/Api";

const ReferForm = ({ closeModal, userDetails, route }) => {
  const {navigation} = route?.params || {};
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
 
  const handleSubmit = () => {
  if (!name.trim()) {
    Alert.alert("Validation Error", "Name is required.");
    return;
  } else if (name.trim().length < 3) {
    Alert.alert("Validation Error", "Name must be at least 3 characters.");
    return;
  }
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!number.trim()) {
    Alert.alert("Validation Error", "Mobile number is required.");
    return;
  } else if (!mobileRegex.test(number.trim())) {
    Alert.alert("Validation Error", "Enter a valid 10-digit mobile number.");
    return;
  }

  // Email validation (only if provided)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim() && !emailRegex.test(email.trim())) {
    Alert.alert("Validation Error", "Enter a valid email address.");
    return;
  }

  // Message validation
  if (!message.trim()) {
    Alert.alert("Validation Error", "Message is required.");
    return;
  } else if (message.trim().length < 10) {
    Alert.alert("Validation Error", "Message must be at least 10 characters.");
    return;
  }

  const bodyData = {
    name: name.trim(),
    mobileNumber: number.trim(),
    email: email.trim(),
    message: message.trim(),
    refByPhoneNumber: userDetails.phoneNumber,
  };

  fetch(`${API}/referral`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "thisIsReferResponse");
      if (data?.success) {
        Alert.alert("Success", "Referral submitted successfully!", [
          { text: "OK", onPress: () => closeModal(false) },
        ]);
      } else {
        Alert.alert(
          "Error",
          data?.message || "Something went wrong. Please try again."
        );
      }
    })
    .catch((err) => {
      console.log(err, "thisIsError");
      Alert.alert("Error", "Something went wrong. Please try again.");
    });
};

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Refer & Earn"} closeModal={closeModal} navigation={navigation}/>
      <View style={{ flex: 1, padding: 24 }}>
        <TextInput
          placeholder="Enter Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Enter Mobile Number"
          style={styles.input}
          keyboardType="phone-pad"
          value={number}
          onChangeText={setNumber}
        />
        <TextInput
          placeholder="Enter Email address (optional)"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Enter Message"
          style={[styles.input, styles.textArea]}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          value={message}
          onChangeText={setMessage}
        />

        <Pressable
          onPress={handleSubmit}
          style={{
            padding: 10,
            marginVertical: 10,
            backgroundColor: "#1315CD",
            borderRadius: 13,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 16, color: "white" }}>
            Submit
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReferForm;

const styles = StyleSheet.create({
  input: {
    width: "100%",                
    minHeight: 48,               
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,             
    borderRadius: 12,
    marginVertical: 8,
    borderColor: "#ccc",         
    fontSize: 16,
    color: "#000",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",     
  },
});

