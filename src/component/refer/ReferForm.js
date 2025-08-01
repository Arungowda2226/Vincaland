import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Header from "../header/Header";

const ReferForm = ({ closeModal }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header title={"Refer & Earn"} closeModal={closeModal} />
      <View style={{ flex: 1, padding: 24 }}>
        <TextInput placeholder="Enter Name" style={styles.input} />
        <TextInput
          placeholder="Enter Mobile Number"
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Enter Email address"
          style={styles.input}
          keyboardType="email-address"
        />

        {/* ✅ Multi-line message input like description */}
        <TextInput
          placeholder="Enter Message"
          style={[styles.input, styles.textArea]}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top" // Ensures text starts from top
        />
        <Pressable style={{padding:10, marginVertical:10, backgroundColor:"#1315CD", borderRadius:13, alignItems:"center"}}>
        <Text style={{fontWeight:"600", fontSize:16, color:"white"}}>Submit</Text>
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
