import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import API from "../apidetails/Api";

const ReferForm = ({ closeModal, userDetails }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
 
  const handleSubmit = () => {
    const bodyData = {
      name: name,
      mobileNumber: number,
      email: email,
      message: message,
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
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Refer & Earn"} closeModal={closeModal} />
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
          placeholder="Enter Email address"
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
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#00000078",
  },
  textArea: {
    height: 120,
  },
});
