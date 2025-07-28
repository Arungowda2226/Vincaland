import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const Header = ({ title, navigation, userIcon }) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        { justifyContent: userIcon ? "space-between" : "" },
      ]}
    >
      <Ionicons name="chevron-back-outline" size={30} onPress={handleBack} />
      {title ? (
        <Text style={styles.headerTitle}>{title}</Text>
      ) : (
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} />
          <Text style={styles.locationLabel}>Bengaluru</Text>
        </View>
      )}
      {userIcon ? (
        <Image
          source={require("../../../assets/profile.png")}
          style={{
            alignSelf: "flex-end",
            height: height * 0.06,
            width: width * 0.06,
            resizeMode: "stretch",
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ffff",
  },
  locationContainer: {
    padding: 10,
    backgroundColor: "#cccc",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 13,
    marginLeft: 20,
  },
  locationLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: 18,
    marginLeft: 15,
  },
});

export default Header;
