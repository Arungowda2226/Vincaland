import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Header from "../header/Header";
import Svg, { Defs, LinearGradient, Stop, Ellipse } from "react-native-svg";
import { Dropdown } from "react-native-element-dropdown";
import CountryPicker from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";

const titleOptions = [
  { label: "Mr", value: "1" },
  { label: "Miss", value: "2" },
  { label: "Mrs", value: "3" },
];

const { height, width } = Dimensions.get("window");

const Investment = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState(null);
  const [countryCode, setCountryCode] = useState("IN");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [withFlag] = useState(true);
  const [withCallingCode] = useState(true);
  const [callingCode, setCallingCode] = useState("91");
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [currentPincode, setCurrentPincode] = useState("");
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [permanentAddress, setPermanentAddress] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");

  const handleSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setIsPickerVisible(false);
  };

  const handleNext = () => {

  }

  return (
    <View style={styles.wrapper}>
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            padding: 25,
            alignSelf: "center",
            left: 150,
          }}
        ></View>
      </View>
      <View style={styles.content}>
        <Header title="Apply for a Investment" navigation={navigation} />
        <ScrollView style={styles.mainContainer}>
          <View>
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
          </View>

          <View>
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
                  onClose={() => setIsPickerVisible(false)} // optional
                  containerButtonStyle={styles.countryPicker}
                />
                <Ionicons name="chevron-down" size={24} color="black" />
              </Pressable>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  height: 30,
                  marginLeft: 5,
                }}
              />

              <TextInput
                style={{ flex: 1 }}
                placeholder="Enter Mobile Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>
          <View>
            <Text style={styles.label}>E-mail Address</Text>
            <TextInput
              onChangeText={setEmail}
              value={email}
              style={[styles.inputContainer, { paddingVertical: 10 }]}
              placeholder="example@gmail.com"
            />
          </View>
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.label}>Date of Birth :</Text>
            <View style={styles.dateBirthContainer}>
              <TextInput
                value={dob}
                onChangeText={setDob}
                editable={false}
                placeholder="Select Date of Birth"
              />
              <Ionicons name={"calendar-outline"} size={24} />
            </View>
          </View>
          <Text style={styles.label}>Current Address</Text>
          <TextInput
            placeholder="Enter your address"
            multiline
            numberOfLines={10}
            style={[styles.input, { height: 70 }]}
            value={currentAddress}
            onChangeText={setCurrentAddress}
          />
          {/* State and Pincode */}
          <View style={styles.row}>
            <View
              style={{
                marginRight: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.label}>State:</Text>
              <TextInput
                placeholder="Karnataka"
                style={[styles.input, { marginLeft: 5, width: width * 0.25 }]}
                value={currentState}
                onChangeText={setCurrentState}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.label}>Pincode:</Text>
              <TextInput
                placeholder="628401"
                style={[styles.input, { marginLeft: 10, width: width * 0.2 }]}
                value={currentPincode}
                onChangeText={setCurrentPincode}
              />
            </View>
          </View>

          {/* Checkbox */}
          <View style={styles.checkboxRow}>
            <CheckBox
              textStyle={{ color: "black" }}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                marginLeft: -10,
              }}
              onPress={() => setIsSameAddress(!isSameAddress)}
              checked={isSameAddress}
              uncheckedColor="orange"
            />
            <Text style={styles.checkboxText}>
              Select this option if both your permanent and current addresses
              are the same.
            </Text>
          </View>

          {/* Permanent Address (Conditional) */}
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
                <View
                  style={{
                    flex: 1,
                    marginRight: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.label}>State</Text>
                  <TextInput
                    placeholder="Karnataka"
                    style={[
                      styles.input,
                      { marginLeft: 10, width: width * 0.25 },
                    ]}
                    value={permanentState}
                    onChangeText={setPermanentState}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.label}>Pincode</Text>
                  <TextInput
                    placeholder="628401"
                    style={[
                      styles.input,
                      { marginLeft: 10, width: width * 0.2 },
                    ]}
                    value={permanentPincode}
                    onChangeText={setPermanentPincode}
                  />
                </View>
              </View>
            </>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            <Text>Do you currently have any investments?</Text>
            <CheckBox
              title={"yes"}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              uncheckedColor="orange"
            />
            <CheckBox
              title={"NO"}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              uncheckedColor="orange"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Text>
              Would you be interested in participating in future investment
              opportunities with our company?
            </Text>
            <CheckBox
              title={"yes"}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              uncheckedColor="orange"
            />
            <CheckBox
              title={"NO"}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              uncheckedColor="orange"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            <Text>Are you interested in long-term investment options?</Text>
            <CheckBox
              title={"yes"}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              uncheckedColor="orange"
            />
            <CheckBox
              title={"NO"}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              uncheckedColor="orange"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            <Text>Do you invest regulary every month?</Text>
            <CheckBox
              title={"yes"}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              uncheckedColor="orange"
            />
            <CheckBox
              title={"NO"}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              uncheckedColor="orange"
            />
          </View>
          <View style={{ marginTop: "40%" }} />
        </ScrollView>
      </View>
      <Pressable onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.headerLabel}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default Investment;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  ellipseContainer: {
    position: "absolute",
    top: -332,
    left: -282,
    zIndex: -1,
  },
  ellipse: {
    transform: [{ rotate: "-14.55deg" }],
  },
  content: {
    flex: 1,
  },
  mainContainer: { padding: 24, paddingBottom: 300 },
  headerLabel: { 
    fontWeight: "500", 
    fontSize: 18, 
    color: "white"
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
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
  countryPicker: {
    marginRight: 5,
    paddingVertical: 5,
  },
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
  headerLabel: { 
    fontWeight: "500", 
    fontSize: 18 
  },
});
