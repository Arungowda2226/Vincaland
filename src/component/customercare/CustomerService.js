import React from "react";
import { StyleSheet, Text, View, Pressable, Linking } from "react-native";
import Header from "../header/Header";

const CustomerService = ({ navigation }) => {
  const email = "info@vincaland.com";
  const email1= "help@vincaland.com";

  return (
    <View style={styles.container}>
      <Header title="Customer Service" navigation={navigation} />
      
      <View style={styles.content}>
        <Text style={styles.heading}>We’re Here to Help!</Text>
        <Text style={styles.description}>
          Our customer support team is available 24/7 to assist you with any 
          questions or issues you may have. 
        </Text>

        <Text style={styles.label}>Email Us At:</Text>
        <Pressable onPress={() => Linking.openURL(`mailto:${email}`)}>
          <Text style={styles.email}>{email}</Text>
        </Pressable>
         <Pressable onPress={() => Linking.openURL(`mailto:${email1}`)}>
          <Text style={styles.email}>{email1}</Text>
        </Pressable>

        <Text style={styles.note}>
          Tap the email to open your default mail app.
        </Text>
      </View>
    </View>
  );
};

export default CustomerService;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, color: "#444", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  email: { fontSize: 18, color: "#0654BB", marginVertical: 8 },
  note: { fontSize: 14, color: "#888", marginTop: 10 },
});
