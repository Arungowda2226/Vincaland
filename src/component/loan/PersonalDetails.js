import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  CheckBox,
  Icon as IconElement,
  Button as RegButton,
} from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';


const titleOptions = [
  { label: "Mr", value: "1" },
  { label: "Miss", value: "2" },
  { label: "Mrs", value: "3" },
];

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const maritalStatusOptions = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
];

const { height, width } = Dimensions.get("window");

const PersonalDetails = ({
  showCheck,
  markComplete,
  formData,
  setFormData,
}) => {
  const [title, setTitle] = useState("Mr");
  const [gender, setGender] = useState("Male");
  const [maritalStatus, setMaritalStatus] = useState("Single");
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [currentPincode, setCurrentPincode] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");
  const [cibil, setCibil] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleNext = () => {
    const formData = {
      title,
      fullName,
      fatherName,
      motherName,
      spouseName,
      gender,
      maritalStatus,
      currentAddress,
      currentState,
      currentPincode,
      isSameAddress,
      cibil,
      dateOfBirth:date,
      permanentAddress: isSameAddress ? currentAddress : permanentAddress,
      permanentState: isSameAddress ? currentState : permanentState,
      permanentPincode: isSameAddress ? currentPincode : permanentPincode,
    };
    setFormData(formData);
    showCheck(false);
    markComplete(true);
  };

   const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios'); // Hide picker on iOS after selection
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name (as per PAN)</Text>
      <View style={styles.row}>
        <Dropdown
          style={styles.dropdownShort}
          data={titleOptions}
          labelField="label"
          valueField="value"
          placeholder="Mr"
          value={title}
          onChange={(item) => setTitle(item.label)}
        />
        <TextInput
          placeholder="Michel Joseph"
          style={[styles.input, { flex: 1 }]}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={styles.label}>Father's Name</Text>
          <TextInput
            placeholder="Edwards"
            style={styles.input}
            value={fatherName}
            onChangeText={setFatherName}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Mother's Name</Text>
          <TextInput
            placeholder="Nancy Edwards"
            style={styles.input}
            value={motherName}
            onChangeText={setMotherName}
          />
        </View>
      </View>

      {/* Marital and Gender */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 1, marginRight: 10, marginVertical: 10 }}>
          <Text style={{ fontWeight: "600", fontSize: 11 }}>
            Marital Status:
          </Text>
          <Dropdown
            style={[styles.dropdown, { width: 100 }]}
            data={maritalStatusOptions}
            labelField="label"
            valueField="value"
            placeholder="Single"
            value={maritalStatus}
            onChange={(item) => setMaritalStatus(item.value)}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={{ fontWeight: "600", fontSize: 11 }}>Gender:</Text>
          <Dropdown
            style={[styles.dropdown, { width: 80 }]}
            data={genderOptions}
            labelField="label"
            valueField="value"
            placeholder="Male"
            value={gender}
            onChange={(item) => setGender(item.value)}
          />
        </View>
      </View>

      {/* Spouse Name */}
      <View
        style={{
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.label}>Spouse Name :</Text>
        <TextInput
          placeholder="Enter Spouse name"
          style={[styles.input, { marginLeft: 10, flex: 1 }]}
          value={spouseName}
          onChangeText={setSpouseName}
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
          <TextInput value={date < new Date() ? date.toLocaleDateString() :""} placeholder="Select Date of Birth" editable={false}/>
          <Ionicons onPress={showDatePicker} name={"calendar-outline"} size={24} />
        </View>

        {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date" // Can be 'date', 'time', or 'datetime'
          display={Platform.OS === 'ios' ? 'spinner' : 'default'} // 'spinner' for iOS, 'default' for Android
          onChange={onChange}
        />
      )}

      </View>


      <View
        style={{
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 12 }}>
          Enter your latest CIBIL score to proceed :
        </Text>
        <TextInput
          style={[styles.input, { marginLeft: 10, flex: 1 }]}
          value={cibil}
          onChangeText={setCibil}
        />
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
          Select this option if both your permanent and current addresses are
          the same.
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
                style={[styles.input, { marginLeft: 10, width: width * 0.25 }]}
                value={permanentState}
                onChangeText={setPermanentState}
              />
            </View>
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Text style={styles.label}>Pincode</Text>
              <TextInput
                placeholder="628401"
                style={[styles.input, { marginLeft: 10, width: width * 0.2 }]}
                value={permanentPincode}
                onChangeText={setPermanentPincode}
              />
            </View>
          </View>
        </>
      )}

      <Pressable onPress={handleNext} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderColor: "#FFD4C3",
    borderWidth: 1,
    borderRadius: 13,
  },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  row: { flexDirection: "row", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  dateBirthContainer:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    flex:1
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    marginTop: 5,
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkboxText: {
    flex: 1,
    fontSize: 12,
    color: "#444",
  },
  submitButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },

  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
});

export default PersonalDetails;
