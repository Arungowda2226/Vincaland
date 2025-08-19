import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import Header from "../header/Header";
import Svg, { Defs, LinearGradient, Stop, Ellipse } from "react-native-svg";
import { Dropdown } from "react-native-element-dropdown";
import Slider from "@react-native-community/slider";

const calculatorTypeData = [
  { id: 1, type: "EMI calculator" },
  { id: 2, type: "inflation calculator" },
];

const Calculator = ({ navigation }) => {
  const [presentValue, setPresentValue] = useState(100000);
  const [inflationRate, setInflationRate] = useState(6);
  const [inflationYears, setInflationYears] = useState(10);
  const [futureValue, setFutureValue] = useState(null);

  const [calculatorType, setCalculatorType] = useState("");
  const [loanAmount, setLoanAmount] = useState(550000);
  const [interestRate, setInterestRate] = useState(8);
  const [loanPeriod, setLoanPeriod] = useState(5);
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanPeriod * 12;

    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setEmi(Math.ceil(emiValue).toFixed(2));
  };

  // ✅ Calculate Future Value on button click
  const calculateFutureValue = () => {
    const futureVal =
      presentValue * Math.pow(1 + inflationRate / 100, inflationYears);
    setFutureValue(Math.ceil(futureVal));
  };

  return (
    <View style={styles.main}>
      <View style={styles.ellipseContainer}>
        <Svg width={638.9} height={649.1} style={styles.ellipse}>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#FEF7D6" />
              <Stop offset="100%" stopColor="#FFF2C7" />
            </LinearGradient>
          </Defs>
          <Ellipse
            cx="319.45"
            cy="324.55"
            rx="319.45"
            ry="324.55"
            fill="url(#grad)"
          />
        </Svg>
      </View>
      <View style={styles.content}>
        <Header title={"Calculator"} navigation={navigation} />
        <Dropdown
          style={styles.dropdownShort}
          data={calculatorTypeData}
          labelField="type"
          valueField="type"
          placeholder="Select Calculator"
          value={calculatorType}
          onChange={(item) => {
            setCalculatorType(item.type);
            setEmi(null);
            setFutureValue(null);
          }}
        />

        {calculatorType === "EMI calculator" && (
          <View style={styles.box}>
            {/* Loan Amount */}
            <View style={styles.row}>
              <Text>Loan Amount</Text>
              <Text>₹{loanAmount.toLocaleString()}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={50000}
              maximumValue={2000000}
              step={10000}
              value={loanAmount}
              onValueChange={setLoanAmount}
              minimumTrackTintColor="#F62888"
              maximumTrackTintColor="#1BD0C7"
              thumbTintColor="#FFADD3"
            />

            {/* Interest Rate */}
            <View style={styles.row}>
              <Text>Interest Rate %</Text>
              <Text>{interestRate}%</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={20}
              step={0.1}
              value={interestRate}
              onValueChange={(val) => setInterestRate(Number(val.toFixed(1)))}
              minimumTrackTintColor="#F62888"
              maximumTrackTintColor="#1BD0C7"
              thumbTintColor="#FFADD3"
            />

            {/* Loan Period */}
            <View style={styles.row}>
              <Text>Loan Period</Text>
              <Text>{loanPeriod} years</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={30}
              step={1}
              value={loanPeriod}
              onValueChange={setLoanPeriod}
              minimumTrackTintColor="#F62888"
              maximumTrackTintColor="#1BD0C7"
              thumbTintColor="#FFADD3"
            />

            {/* Calculate Button */}
            <Pressable style={styles.calculateBtn} onPress={calculateEMI}>
              <Text style={styles.calculateText}>Calculate EMI</Text>
            </Pressable>

            {/* Show EMI only after calculation */}
            {/* {emi && (
              <View style={styles.resultBox}>
                <Text style={styles.resultLabel}>Estimated EMI</Text>
                <Text style={styles.resultValue}>₹{emi}</Text>
              </View>
            )} */}
          </View>
        )}

        {calculatorType === "inflation calculator" && (
          <View style={styles.box}>
            {/* Present Value */}
            <View style={styles.row}>
              <Text>Value of current expenses (₹)</Text>
              <Text>₹{presentValue.toLocaleString()}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1000}
              maximumValue={1000000}
              step={100}
              value={presentValue}
              onValueChange={setPresentValue}
              minimumTrackTintColor="#F62888"
              maximumTrackTintColor="#1BD0C7"
              thumbTintColor="#FFADD3"
            />

            {/* Inflation Rate */}
            <View style={styles.row}>
              <Text>Annual Inflation Rate (p.a)%</Text>
              <Text>{inflationRate}%</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={15}
              step={0.1}
              value={inflationRate}
              onValueChange={(val) => setInflationRate(Number(val.toFixed(1)))}
              minimumTrackTintColor="#F62888"
              maximumTrackTintColor="#1BD0C7"
              thumbTintColor="#FFADD3"
            />

            {/* Years */}
            <View style={styles.row}>
              <Text>Time Period (in Years)</Text>
              <Text>{inflationYears} years</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={30}
              step={1}
              value={inflationYears}
              onValueChange={setInflationYears}
              minimumTrackTintColor="#F62888"
              maximumTrackTintColor="#1BD0C7"
              thumbTintColor="#FFADD3"
            />

            {/* Calculate Button */}
            <Pressable
              style={styles.calculateBtn}
              onPress={calculateFutureValue}
            >
              <Text style={styles.calculateText}>Calculate Future Value</Text>
            </Pressable>

            {/* Show result only after calculation */}
            {/* {futureValue && (
              <View style={styles.resultBox}>
                <Text style={styles.resultLabel}>Future Cost:</Text>
                <Text style={styles.resultValue}>₹{futureValue}</Text>
              </View>
            )} */}
          </View>
        )}
        {(emi || futureValue) && (
          <View style={styles.footerBox}>
            {calculatorType === "EMI calculator" && emi && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <View style={styles.detailsBox}>
                    <Text style={styles.amountContent}>Monthly EMI</Text>
                    <Text style={styles.amountLabel}>₹{emi}</Text>
                  </View>
                  <View style={styles.detailsBox}>
                    <Text style={styles.amountContent}>Principal Amount</Text>
                    <Text style={styles.amountLabel}>₹{loanAmount.toLocaleString()}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.detailsBox}>
                    <Text style={styles.amountContent}>Total Interest</Text>
                    <Text style={styles.amountLabel}>
                      ₹{(emi * loanPeriod * 12 - loanAmount).toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.detailsBox}>
                    <Text style={styles.amountContent}>Total Amount</Text>
                    <Text style={styles.amountLabel}>₹{(emi * loanPeriod * 12).toLocaleString()}</Text>
                  </View>
                </View>
              </>
            )}

            {calculatorType === "inflation calculator" && futureValue && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <View style={styles.detailsBox}>
                    <Text style={styles.amountContent}>Future Value</Text>
                    <Text style={styles.amountLabel}>₹{futureValue.toLocaleString()}</Text>
                  </View>
                  <View style={styles.detailsBox}>
                    <Text style={styles.amountContent}>Current Value</Text>
                    <Text style={styles.amountLabel}>₹{presentValue.toLocaleString()}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.detailsBox}>
                    <Text style={styles.amountContent}>Annual Rate</Text>
                    <Text style={styles.amountLabel}>{inflationRate}%</Text>
                  </View>
                  <View style={styles.detailsBox}>
                    <Text style={styles.amountContent}>Time Period</Text>
                    <Text style={styles.amountLabel}>{inflationYears} years</Text>
                  </View>
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  main: { flex: 1 },
  ellipseContainer: {
    position: "absolute",
    top: -332,
    left: -282,
    zIndex: -1,
  },
  ellipse: { transform: [{ rotate: "-14.55deg" }] },
  content: { flex: 1 },
  dropdownShort: {
    borderRadius: 8,
    paddingHorizontal: 10,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#F9F9F9",
    shadowColor: "#00000040",
    shadowOpacity: 0.25,
    shadowRadius: 5.3,
    elevation: 5,
  },
  box: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 5.3,
    elevation: 5,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingBottom: 60,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  slider: { width: "100%", height: 40 },
  calculateBtn: {
    backgroundColor: "#0654BB",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  calculateText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  resultBox: {
    marginTop: 20,
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  resultLabel: { fontSize: 16, color: "#888" },
  resultValue: { fontSize: 24, fontWeight: "bold", color: "#333" },
  detailsBox: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#00000040",
    borderRadius: 13,
    width: "45%",
  },
  footerBox: {
    top:-50,
    marginHorizontal:24
  },
  amountLabel:{
    fontWeight:"600",
    fontSize:20
  },
  amountContent:{
    fontWeight:"600",
    fontSize:12,
    color:"#0654BB"
  }
});
