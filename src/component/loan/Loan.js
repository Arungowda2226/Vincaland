import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import Header from "../../component/header/Header";
import { Ionicons } from "@expo/vector-icons";
import PersonalDetails from "./PersonalDetails";
// import EmploymentDetailsForm from './../employment/EmploymentDetailsForm';
// import IdentityProofForm from './../identity/IdentityProofForm';
import ContactInformationForm from "./ContactInformationForm";
import Svg, { Defs, LinearGradient, Stop, Ellipse } from "react-native-svg";
import LoanType from "./LoanType";
import SupportModal from "../supportmodal/SupportModal";

const Loan = ({ navigation }) => {
  const [sections, setSections] = useState({
    personal: { expanded: false, completed: false },
    contact: { expanded: false, completed: false },
    identity: { expanded: false, completed: false },
    employment: { expanded: false, completed: false },
    loanType: { expanded: false, completed: false },
  });

  const [personalData, setPersonalData] = useState({});
  const [contactData, setContactData] = useState({});
  const [identityData, setIdentityData] = useState({});
  const [employmentData, setEmploymentData] = useState({});
  const [loanType, setLoanType] = useState({});
  const [showModal, setShowModal] = useState(false);

  const toggleSection = (key) => {
    setSections((prev) => ({
      ...prev,
      [key]: { ...prev[key], expanded: !prev[key].expanded },
    }));
  };

  const markComplete = (key) => {
    setSections((prev) => ({
      ...prev,
      [key]: { ...prev[key], completed: true, expanded: false },
    }));
  };

  // const handleNext = () => {
  //   const formData = {
  //     personalData,
  //     contactData,
  //     identityData,
  //     employmentData,
  //     loanType,
  //   };
  //   console.log(formData, "formData");
  //   setShowModal(true);
  //   // navigation.navigate("KYC", { formData });
  // };

  const handleNext = async () => {
    const payload = {
      title: personalData.title,
      fullName: personalData.fullName,
      fathersName: personalData.fatherName,
      mothersName: personalData.motherName,
      maritalStatus: personalData.maritalStatus,
      gender: personalData.gender,
      spouseName: personalData.spouseName,
      dateofBirth: personalData.dateOfBirth,
      cibilScore: parseInt(personalData.cibil),

      currentAddress: {
        address: personalData.currentAddress,
        state: personalData.currentState,
        pincode: personalData.currentPincode,
      },
      currentAddressSameAsPermanent: personalData.isSameAddress || false,

      permanentAddress: {
        address: personalData.permanentAddress,
        state: personalData.permanentState,
        pincode: personalData.permanentPincode,
      },

      contactDetails: {
        phoneNumber: contactData.phoneNumber,
        email: contactData.email,
        alternatePhoneNumber: contactData.altNum,
      },

      loanType: loanType.selectedLoanType,
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await fetch(
        "http://192.168.0.146:3000/user_personal_details",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

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

  const renderSection = (label, key, FormComponent, data, setData) => (
    <>
      <Pressable onPress={() => toggleSection(key)} style={styles.card}>
        <Text style={{ fontWeight: "500", fontSize: 15 }}>{label}</Text>
        <Ionicons
          name={sections[key].completed ? "checkmark" : "chevron-down"}
          size={24}
          color={sections[key].completed ? "green" : "black"}
        />
      </Pressable>
      {sections[key].expanded && (
        <FormComponent
          showCheck={() => toggleSection(key)}
          markComplete={() => markComplete(key)}
          setFormData={setData}
        />
      )}
    </>
  );
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            padding: 25,
            alignSelf: "center",
            left: 150,
          }}
        >
          <Image
            source={require("../../../assets/loanApprove.png")}
            style={styles.image}
          />
        </View>
      </View>

      {/* Foreground content */}
      <View style={styles.content}>
        <Header title="Apply for a personal loan" navigation={navigation} />
        <ScrollView style={styles.mainContainer}>
          <Text style={styles.headerLabel}>Fill out the information</Text>
          {renderSection(
            "Personal Details",
            "personal",
            PersonalDetails,
            personalData,
            setPersonalData
          )}
          {renderSection(
            "Contact Information",
            "contact",
            ContactInformationForm,
            contactData,
            setContactData
          )}
          {renderSection(
            "Loan Type",
            "loanType",
            LoanType,
            loanType,
            setLoanType
          )}
          <View style={{ marginTop: "30%" }} />
        </ScrollView>
      </View>
      <Pressable onPress={handleNext} style={styles.nextButton}>
        <Text style={[styles.headerLabel, { color: "white" }]}>Submit</Text>
      </Pressable>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <SupportModal setShowModal={setShowModal} navigation={navigation}/>
      </Modal>
    </View>
  );
};

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
  mainContainer: { padding: 24, paddingBottom: 200 },
  headerLabel: { fontWeight: "500", fontSize: 18 },
  card: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    borderRadius: 8,
    elevation: 1,
  },
  image: {
    alignSelf: "center",
  },
  nextButton: {
    backgroundColor: "green",
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    minWidth: "70%",
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 4,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: "#00CB35",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  infoLabel: {
    marginVertical: 5,
    fontWeight: "500",
    fontSize: 15,
  },
});

export default Loan;
