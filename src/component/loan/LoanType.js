import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";

const loanTypeList = [
  { id: 1, type: "Personal Loan" },
  { id: 2, type: "Home Loan" },
  { id: 3, type: "Home Construction Loan" },
  { id: 4, type: "Property Loan" },
  { id: 5, type: "Business Loan" },
  { id: 6, type: "BT-Balance Transfer Loan" },
];

const LoanType = ({ showCheck, markComplete, setFormData }) => {
  const [selectedLoanId, setSelectedLoanId] = useState(null);

  const handleNext = () => {
    const selected = loanTypeList.find((item) => item.id === selectedLoanId);

    if (!selected) {
      alert("Please select a loan type.");
      return;
    }

    const formData = {
      selectedLoanType: selected.type,
    };

    setFormData(formData);
    showCheck(false);
    markComplete(true);
  };

  return (
    <View style={styles.main}>
      {loanTypeList.map((item) => (
        <View style={styles.container} key={item.id}>
          <Checkbox
            value={selectedLoanId === item.id}
            onValueChange={() => setSelectedLoanId(item.id)}
            color={selectedLoanId === item.id ? "#4630EB" : "#D4D4D4"}
          />
          <Text style={styles.label}>{item.type}</Text>
        </View>
      ))}

      <Pressable style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default LoanType;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FFD4C3",
    padding: 10,
    borderRadius: 10,
  },
  container: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 13,
    alignSelf: "center",
    paddingHorizontal: 100,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
