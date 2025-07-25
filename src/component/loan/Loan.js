import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, ScrollView } from 'react-native';
import Header from '../../component/header/Header';
import { Ionicons } from '@expo/vector-icons';
import PersonalDetails from './PersonalDetails';
// import EmploymentDetailsForm from './../employment/EmploymentDetailsForm';
// import IdentityProofForm from './../identity/IdentityProofForm';
import ContactInformationForm from './ContactInformationForm';

const Loan = ({ navigation }) => {
    const [sections, setSections] = useState({
        personal: { expanded: false, completed: false },
        contact: { expanded: false, completed: false },
        identity: { expanded: false, completed: false },
        employment: { expanded: false, completed: false },
    });

    const [personalData, setPersonalData] = useState({});
    const [contactData, setContactData] = useState({});
    const [identityData, setIdentityData] = useState({});
    const [employmentData, setEmploymentData] = useState({});

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

    const handleNext = () => {
        const formData = {
            personalData,
            contactData,
            identityData,
            employmentData,
        };
        navigation.navigate("KYC", { formData });
      };

    const renderSection = (label, key, FormComponent, data, setData) => (
        <>
            <Pressable onPress={() => toggleSection(key)} style={styles.card}>
                <Text style={{fontWeight:"600", fontSize:15}}>{label}</Text>
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
        <View style={styles.container}>
            <Header title="Apply for a personal loan" navigation={navigation}/>
            <ScrollView style={styles.mainContainer}>
                <Text style={styles.headerLabel}>Fill out the information</Text>

                {renderSection("Personal Details", "personal", PersonalDetails, personalData, setPersonalData)}
                {renderSection("Contact Information", "contact", ContactInformationForm, contactData, setContactData)}
                {/* {renderSection("Identity Proof", "identity", IdentityProofForm, identityData, setIdentityData)}
                {renderSection("Employment Details", "employment", EmploymentDetailsForm, employmentData, setEmploymentData)} */}
                <Image
                    source={require('../../../assets/loanApprove.png')}
                    style={styles.image}
                />
            </ScrollView>

            <Pressable onPress={handleNext} style={styles.nextButton}>
                <Text style={[styles.headerLabel, { color: "white" }]}>Next</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    mainContainer: { padding: 24, paddingBottom: 200 },
    headerLabel: { fontWeight: "900", fontSize: 18 },
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
        width: "70%",
        height: "30%",
        resizeMode: "stretch",
        alignSelf: "center",
        marginTop: 50,
    },
    nextButton: {
        backgroundColor: "green",
        paddingVertical: 20,
        alignItems: "center",
    },
});

export default Loan;