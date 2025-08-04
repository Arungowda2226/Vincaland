import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
  Modal,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import Svg, { Defs, LinearGradient, Stop, Ellipse } from "react-native-svg";
import { Dropdown } from "react-native-element-dropdown";
import CountryPicker from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

import Header from "../header/Header";
import SupportModal from "../supportmodal/SupportModal";
import LoanApi from "../apidetails/LoanApi";

const { width } = Dimensions.get("window");

const titleOptions = [
  { label: "Mr", value: "1" },
  { label: "Miss", value: "2" },
  { label: "Mrs", value: "3" },
];

// ✅ Reusable Yes/No checkbox row
const YesNoCheckBox = ({ label, value, onChange }) => (
  <View style={styles.checkboxRow}>
    <Text style={styles.checkBoxLabel}>{label}</Text>
    <CheckBox
      title="Yes"
      checked={value === true}
      onPress={() => onChange(true)}
      checkedColor="green"
      containerStyle={styles.cbContainer}
    />
    <CheckBox
      title="No"
      checked={value === false}
      onPress={() => onChange(false)}
      checkedColor="green"
      containerStyle={styles.cbContainer}
    />
  </View>
);

const Investment = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("1");
  const [countryCode, setCountryCode] = useState("IN");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callingCode, setCallingCode] = useState("91");
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Address states
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [currentPincode, setCurrentPincode] = useState("");
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [permanentAddress, setPermanentAddress] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");

  // Yes/No Checkbox states
  const [hasInvestment, setHasInvestment] = useState(null);
  const [interestedInFuture, setInterestedInFuture] = useState(null);
  const [longTermInvestment, setLongTermInvestment] = useState(null);
  const [investRegularly, setInvestRegularly] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setIsPickerVisible(false);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) setDate(selectedDate);
    if (Platform.OS !== "ios") setShowPicker(false);
  };

  const handleNext = async () => {
    const payload = {
      title: titleOptions.find((t) => t.value === title)?.label || "",
      fullName,
      dateOfBirth: date,
      contactDetails: {
        phoneNumber,
        email,
      },

      currentAddress: {
        address: currentAddress,
        state: currentState,
        pincode: currentPincode,
      },
      currentAddressSameAsPermanent: isSameAddress,
      permanentAddress: isSameAddress
        ? {
            address: currentAddress,
            state: currentState,
            pincode: currentPincode,
          }
        : {
            address: permanentAddress,
            state: permanentState,
            pincode: permanentPincode,
          },

      hasExistingInvestment: hasInvestment,
      interestedInFuture,
      interestedInLongTerm: longTermInvestment,
      investRegularly,
    };

    console.log("Submitting payload:", payload);
    console.log(`${LoanApi}/investment`, "thisIsAPI");

    try {
      const response = await fetch(`${LoanApi}/investment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (data.status) {
        setShowModal(true);
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Network Error", "Failed to submit data to the server");
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Background Ellipse */}
      <View style={styles.ellipseContainer}>
        <Svg width={638.9} height={649.1} style={styles.ellipse}>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#FFFBEF" />
              <Stop offset="100%" stopColor="#FFD4C3" />
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
        <Header title="Apply for an Investment" navigation={navigation} />
        <ScrollView style={styles.mainContainer}>
          {/* Full Name */}
          <Text style={styles.label}>Full Name (as per PAN)</Text>
          <View style={styles.row}>
            <Dropdown
              style={styles.dropdownShort}
              data={titleOptions}
              labelField="label"
              valueField="value"
              placeholder="Mr"
              value={title}
              onChange={(item) => setTitle(item.value)}
            />
            <TextInput
              placeholder="Michel Joseph"
              style={[styles.input, { flex: 1 }]}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Mobile Number */}
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputContainer}>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => setIsPickerVisible(true)}
            >
              <CountryPicker
                countryCode={countryCode}
                withFlag
                withCallingCode
                withFilter
                withAlphaFilter
                withCallingCodeButton
                onSelect={handleSelect}
                visible={isPickerVisible}
                onClose={() => setIsPickerVisible(false)}
                containerButtonStyle={styles.countryPicker}
              />
              <Ionicons name="chevron-down" size={24} color="black" />
            </Pressable>
            <View style={styles.verticalDivider} />
            <TextInput
              style={{ flex: 1 }}
              placeholder="Enter Mobile Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          {/* Email */}
          <Text style={styles.label}>E-mail Address</Text>
          <TextInput
            onChangeText={setEmail}
            value={email}
            style={[styles.inputContainer, { paddingVertical: 10 }]}
            placeholder="example@gmail.com"
          />

          {/* DOB */}
          <View style={styles.dobContainer}>
            <Text style={styles.label}>Date of Birth :</Text>
            <View style={styles.dateBirthContainer}>
              <TextInput
                value={date.toLocaleDateString()}
                editable={false}
                placeholder="Select Date of Birth"
              />
              <Ionicons
                onPress={() => setShowPicker(true)}
                name={"calendar-outline"}
                size={24}
              />
            </View>
            {showPicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Current Address */}
          <Text style={styles.label}>Current Address</Text>
          <TextInput
            placeholder="Enter your address"
            multiline
            numberOfLines={10}
            style={[styles.input, { height: 70 }]}
            value={currentAddress}
            onChangeText={setCurrentAddress}
          />
          <View style={styles.row}>
            <View style={styles.subContainer}>
              <Text style={styles.label}>State:</Text>
              <TextInput
                placeholder="Karnataka"
                style={[styles.input, { marginLeft: 5, width: width * 0.25 }]}
                value={currentState}
                onChangeText={setCurrentState}
              />
            </View>
            <View style={styles.subContainer}>
              <Text style={[styles.label, { marginLeft: 15 }]}>Pincode:</Text>
              <TextInput
                placeholder="628401"
                style={[styles.input, { marginLeft: 5, width: width * 0.2 }]}
                value={currentPincode}
                onChangeText={setCurrentPincode}
              />
            </View>
          </View>

          {/* Same Address */}
          <View style={styles.addressCheckboxRow}>
            <CheckBox
              textStyle={{ color: "black" }}
              containerStyle={styles.transparentCb}
              onPress={() => setIsSameAddress(!isSameAddress)}
              checked={isSameAddress}
              uncheckedColor="orange"
            />
            <Text style={styles.checkboxText}>
              Select this option if both your permanent and current addresses
              are the same.
            </Text>
          </View>

          {/* Permanent Address */}
          {!isSameAddress && (
            <>
              <Text style={styles.label}>Permanent Address</Text>
              <TextInput
                placeholder="Enter permanent address"
                multiline
                numberOfLines={10}
                style={[styles.input, { height: 70 }]}
                value={permanentAddress}
                onChangeText={setPermanentAddress}
              />
              <View style={styles.row}>
                <View style={styles.subContainer}>
                  <Text style={styles.label}>State:</Text>
                  <TextInput
                    placeholder="Karnataka"
                    style={[
                      styles.input,
                      { marginLeft: 5, width: width * 0.25 },
                    ]}
                    value={permanentState}
                    onChangeText={setPermanentState}
                  />
                </View>
                <View style={styles.subContainer}>
                  <Text style={[styles.label, { marginLeft: 15 }]}>
                    Pincode:
                  </Text>
                  <TextInput
                    placeholder="628401"
                    style={[
                      styles.input,
                      { marginLeft: 5, width: width * 0.2 },
                    ]}
                    value={permanentPincode}
                    onChangeText={setPermanentPincode}
                  />
                </View>
              </View>
            </>
          )}

          {/* Yes/No Checkboxes */}
          <YesNoCheckBox
            label="Do you currently have any investments?"
            value={hasInvestment}
            onChange={setHasInvestment}
          />
          <YesNoCheckBox
            label="Interested in future opportunities?"
            value={interestedInFuture}
            onChange={setInterestedInFuture}
          />
          <YesNoCheckBox
            label="Interested in long-term options?"
            value={longTermInvestment}
            onChange={setLongTermInvestment}
          />
          <YesNoCheckBox
            label="Do you invest regularly every month?"
            value={investRegularly}
            onChange={setInvestRegularly}
          />

          <View style={{ marginBottom: 80 }} />
        </ScrollView>
      </View>

      {/* Success Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <SupportModal setShowModal={setShowModal} navigation={navigation} />
      </Modal>

      {/* Submit Button */}
      <Pressable onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.headerLabel}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default Investment;

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  ellipseContainer: { position: "absolute", top: -332, left: -282, zIndex: -1 },
  ellipse: { transform: [{ rotate: "-14.55deg" }] },
  content: { flex: 1 },
  mainContainer: { padding: 24, paddingBottom: 300 },
  headerLabel: { fontWeight: "500", fontSize: 18, color: "white" },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 4, color: "#333" },
  row: { flexDirection: "row", marginBottom: 10 },
  dropdownShort: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 12,
    backgroundColor: "#fff",
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  countryPicker: { marginRight: 5, paddingVertical: 5 },
  dateBirthContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 5,
  },
  nextButton: {
    backgroundColor: "green",
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  addressCheckboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxText: { marginLeft: -10, fontWeight: "600", fontSize: 14 },
  checkBoxLabel: { fontWeight: "600", fontSize: 16 },
  cbContainer: { backgroundColor: "transparent", borderColor: "transparent" },
  transparentCb: { marginLeft: -10 },
  subContainer: { flexDirection: "row", alignItems: "center" },
});
