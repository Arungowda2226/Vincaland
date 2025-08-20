import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/userSlice";
import { CommonActions } from "@react-navigation/native";

export default function CustomDrawer(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user, "thisIsUsers");
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());

    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  const handleEditProfile = () => {
    props.navigation.navigate("EditProfile");
  };

  const profile = user?.user?.profilePhoto;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <View style={styles.header}>
          <Image
            source={
              profile
                ? { uri: profile }
                : require("../../../assets/dummyprofile.png")
            }
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user?.name || "Guest User"}</Text>
          <Text style={styles.userEmail}>
            {user?.emailId || "guest@example.com"}
          </Text>
          <TouchableOpacity style={styles.editIcon} onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={22} color="#5D17EB" />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }} />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#fff"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    position: "relative",
    marginTop: 30,
  },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  userName: { fontSize: 18, fontWeight: "bold" },
  userEmail: { fontSize: 14, color: "gray" },
  editIcon: { position: "absolute", top: 20, right: 20 },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginBottom: 30,
  },
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
});
