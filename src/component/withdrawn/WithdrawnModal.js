import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../header/Header";

const WithdrawnModal = ({ closeModal }) => {
  return (
    <View style={styles.container}>
      <Header title="Withdrawn" closeModal={closeModal} />
      <View style={styles.content}>
        <Text style={styles.heading}>Withdraw Funds</Text>

        <Text style={styles.subText}>
          Amount available for withdrawal:{" "}
          <Text style={styles.amount}>₹48,600</Text>
        </Text>

        <Text style={styles.subText}>
          Estimated processing time: 2-3 Business Days
        </Text>

        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            Withdrawals can only be done after 36 months of first deposit
          </Text>
        </View>

        <TouchableOpacity style={[styles.button, styles.disabledButton]} disabled>
          <Text style={styles.buttonText}>Confirm Withdrawal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WithdrawnModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  heading: {
    fontWeight: "700",
    fontSize: 18,
  },
  subText: {
    fontWeight: "500",
    fontSize: 15,
    marginVertical: 10,
  },
  amount: {
    fontWeight: "700",
    fontSize: 18,
    color: "green",
  },
  warningBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: "red",
    marginVertical: 10,
    borderRadius: 13,
    backgroundColor: "#fbceceff",
  },
  warningText: {
    color: "red",
    fontWeight: "700",
    fontSize: 16,
  },
  button: {
    padding: 10,
    marginVertical: 40,
    borderRadius: 13,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#d1cecedc",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
