import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import * as ImagePicker from "expo-image-picker";
import LoanApi from "../apidetails/LoanApi";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // Redux user

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNum, setMobileNum] = useState("");

  useEffect(() => {
    if (user?.user) {
      setName(user.user.fullName);
      setMobileNum(user.user.phone);
      setEmail(user.user.email);
      setImage(user.user.profilePhoto);
    }
  }, [user]);

  // Pick image from gallery
  const handlePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Handle profile update
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("fullName", name);
      formData.append("phone", mobileNum);
      formData.append("email", email);

      // ✅ Only attach image if it's a new local file
      if (image && image.startsWith("file://")) {
        formData.append("profilePhoto", {
          uri: image,
          name: "profile.jpg",
          type: "image/jpeg",
        });
      }

      const response = await fetch(`${LoanApi}/auth/users/${user?.user?.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      console.log("Update Response:", data);

      if (response.ok) {
        alert("Profile updated successfully!");

        // ✅ Update Redux store so Drawer & Home auto-refresh
        dispatch(updateUser(data.user));

        navigation.goBack();
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Something went wrong while updating the profile.");
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={"Edit Profile"} />
      <ScrollView style={styles.main}>
        <Pressable onPress={handlePick}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Image
              source={require("../../../assets/profile.png")}
              style={styles.profileImage}
            />
          )}
        </Pressable>
        <View style={styles.boxContainer}>
          <Text>Name</Text>
          <TextInput onChangeText={setName} value={name} style={styles.input} />
        </View>
        <View style={styles.boxContainer}>
          <Text>Mobile Number</Text>
          <TextInput
            onChangeText={setMobileNum}
            value={mobileNum}
            style={styles.input}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.boxContainer}>
          <Text>Email</Text>
          <TextInput
            onChangeText={setEmail}
            value={email}
            style={styles.input}
            keyboardType="email-address"
          />
        </View>
      </ScrollView>
      <Pressable onPress={handleUpdate} style={styles.updateBtn}>
        <Text style={styles.updateLabel}>Update</Text>
      </Pressable>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  main: { padding: 24 },
  boxContainer: { marginVertical: 10 },
  input: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    borderColor: "gray",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginBottom: 10,
    alignSelf: "center",
    resizeMode: "cover",
  },
  updateBtn: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 13,
    alignItems: "center",
    marginBottom: 50,
    backgroundColor: "#0259D6",
    marginHorizontal: 10,
  },
  updateLabel: {
    fontWeight: "500",
    fontSize: 18,
    color: "white",
  },
});
