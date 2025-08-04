import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const SupportModal = ({navigation, setShowModal}) => {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Image source={require("../../../assets/congrat.png")} />
        <Text style={styles.infoLabel}>
          Your application has been successfully submitted. Our team will
          contact you within 2 hours.
        </Text>
        <Pressable
          onPress={() => {
            setShowModal(false), navigation.navigate("Home");
          }}
          style={styles.modalButton}
        >
          <Text style={{ color: "white" }}>DONE</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SupportModal;

const styles = StyleSheet.create({
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
