import React, { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';

const ContactInformationForm = ({ showCheck, markComplete, setFormData }) => {
  const [callingCode, setCallingCode] = useState('91'); // India's code
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('IN');
  const [withCallingCode] = useState(true);
  const [email, setEmail] = useState("");
  const [altNum, setAltNum] = useState("");
  const [withFlag] = useState(true);
  const pickerRef = useRef();

  const handleSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const handleNext = () => {
    const fullPhone = `+${callingCode}${phoneNumber}`;
    console.log("Phone Number Submitted:", fullPhone);
    const formData = {
      phoneNumber,
      email,
      altNum,
    }
    setFormData(formData);
    showCheck(false);
    markComplete(true);
  };

  return (
    <View style={styles.container}>
      <Text>Mobile Number</Text>
      <View style={[styles.inputContainer,{flexDirection:"row", alignItems:"center"}]}>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <CountryPicker
            {...{
              countryCode,
              withFlag,
              withCallingCode,
              withFilter: true,
              withAlphaFilter: true,
              onSelect: handleSelect,
            }}
            containerButtonStyle={styles.countryPicker}
          />
          <Ionicons name="chevron-down" size={24} color="black" />
        </View>
        <View style={{ borderWidth: 1, borderColor:"black", height: 30,marginLeft:5}}/>
        <TextInput 
          style={{ flex:1 }} 
          placeholder='Enter Mobile Number'
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <View>
        <Text>E-mail Address</Text>
        <TextInput onChangeText={(email)=> setEmail(email)}  value={email} style={[styles.inputContainer,{paddingVertical:10}]} placeholder='example@gmail.com'/>
      </View>
      <View>
        <Text>Alternate Mobile Number</Text>
        <TextInput onChangeText={(altNum) => setAltNum(altNum)} value={altNum} style={[styles.inputContainer, { paddingVertical: 10 }]} placeholder='+91 01234567890' />
      </View>
      <Pressable style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

export default ContactInformationForm

const styles = StyleSheet.create({
   container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderColor: "orange",
    borderWidth: 1,
    borderRadius: 13
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical:3,
    marginBottom: 12,
    backgroundColor: '#fff',
    marginTop:3
  },
  label: { marginBottom: 5, fontWeight: '600' },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  countryPicker: {
    marginRight: 5,
    paddingVertical: 5,
  },
  callingCode: {
    fontSize: 16,
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 13,
    alignSelf:"center",
    paddingHorizontal:100
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
})