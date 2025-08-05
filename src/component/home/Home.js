import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux"; // ✅ Redux for auto update

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const { user } = useSelector((state) => state.user); // ✅ Get user from Redux

  const [notificationCount, setNotificationCount] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);

  const profileImage = user?.user?.profilePhoto; // ✅ Auto updates from Redux

  const onBoxLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setBoxHeight((prev) => (height > prev ? height : prev));
  };

  const receiveNotification = () => {
    setNotificationCount((prev) => prev + 1);
  };

  const handleProfile = () => {
    navigation.openDrawer();
  };

  const handleLogin = () => {
    navigation.navigate("Loan");
  };

  const handleDashBoard = () => {
    navigation.navigate("Login");
  };

  const handleInvestment = () => {
    navigation.navigate("Investment");
  };

  const handleCalculator = () => {
    navigation.navigate("Calculator");
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.iconImageBox}>
          <Image
            source={require("../../../assets/Vector.png")}
            style={styles.iconImage}
          />
          <Text style={styles.vincLabel}>VINCALAND</Text>
        </View>
        <Pressable style={styles.subScri}>
          <Text style={styles.subScriLabel}>Subscribe</Text>
        </Pressable>
        <TouchableOpacity
          onPress={receiveNotification}
          style={styles.iconContainer}
        >
          <Ionicons name="notifications-outline" size={30} color="#5D17EB" />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Pressable onPress={handleProfile}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../../../assets/profile.png")
            }
            style={styles.profileImage}
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "55%" }}>
            <Pressable onPress={handleLogin} style={styles.loanContainer}>
              <Image
                source={require("../../../assets/loan.png")}
                style={styles.loanImage}
              />
              <Text style={styles.loanLabel}>Loan</Text>
            </Pressable>
            <Pressable
              onPress={handleDashBoard}
              style={styles.dashBoardContainer}
            >
              <Image
                source={require("../../../assets/dashBoard.png")}
                style={styles.dashBoardImage}
              />
              <Text style={styles.dashBoardLabel}>Dashboard</Text>
            </Pressable>
          </View>
          <Pressable
            onPress={handleInvestment}
            style={styles.investmentContainer}
          >
            <Image
              source={require("../../../assets/investment.png")}
              style={styles.investmentImage}
            />
            <Text style={styles.investMentLabel}>Investment</Text>
          </Pressable>
        </View>

        <LinearGradient
          colors={["#DAFFE6", "#C2C4FF"]}
          style={styles.subScribcontainer}
        >
          <View style={styles.rowSpaceBetween}>
            <View style={styles.subscribeTextContainer}>
              <Text>Lat’s Start Now!</Text>
              <View style={styles.subscribeButton}>
                <Text style={styles.subscribeButtonText}>
                  Subscribe Now & Never Miss Out!
                </Text>
              </View>
              <Text style={styles.unlockText}>
                Unlock Premium Benefits Just for You!
              </Text>
              <View style={styles.subscribeRow}>
                <Text style={styles.subscribeNowText}>Subscribe Now </Text>
                <Ionicons name="arrow-forward" size={20} color={"#F62516"} />
              </View>
            </View>
            <Image
              source={require("../../../assets/subscribe.png")}
              style={styles.subscribeImage}
            />
          </View>
        </LinearGradient>

        <LinearGradient
          colors={["#86FFAC", "#E7F2FC"]}
          style={styles.inviteContainer}
        >
          <View style={styles.inviteTextContainer}>
            <Text style={styles.inviteTitle}>
              Invite Your Friends & Earn Rewards!
            </Text>
            <Text style={styles.inviteSubtitle}>
              A welcome bonus or special discount!
            </Text>
            <Text style={styles.inviteNowText}>Invite Now</Text>
          </View>
          <Image
            source={require("../../../assets/invite.png")}
            style={styles.inviteImage}
          />
        </LinearGradient>

        <View style={styles.rowContainer}>
          <Pressable
            onPress={handleCalculator}
            style={[styles.customerBox, { height: boxHeight || "auto" }]}
            onLayout={onBoxLayout}
          >
            <Image
              source={require("../../../assets/calculator.png")}
              style={styles.customerImage}
            />
            <Text style={styles.customerTitle}>Calculator</Text>
          </Pressable>

          <View
            style={[styles.customerBox, { height: boxHeight || "auto" }]}
            onLayout={onBoxLayout}
          >
            <Image
              source={require("../../../assets/customer.png")}
              style={styles.customerCareImage}
            />
            <View style={styles.customerTextContainer}>
              <Text style={styles.customerTitle}>24/7</Text>
              <Text style={styles.customerTitle}>Customer Service</Text>
            </View>
          </View>
        </View>

        <View style={styles.promoBanner}>
          <Image
            source={require("../../../assets/sales.png")}
            style={styles.salesIcon}
          />
          <Text style={styles.promoText}>
            Don’t Miss Out – Limited Time Only!
          </Text>
          <Image
            source={require("../../../assets/rightArrow.png")}
            style={styles.rightArrow}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
  },
  iconImage: {
    height: height * 0.03,
    width: width * 0.08,
    resizeMode: "stretch",
  },
  iconImageBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  vincLabel: {
    fontWeight: "bold",
    fontSize: 10,
  },
  subScri: {
    backgroundColor: "#FF7700",
    borderRadius: 13,
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  subScriLabel: {
    fontWeight: "500",
    fontSize: 11,
    color: "#FFFFFF",
  },
  iconContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  profileImage: {
    width: width * 0.1,
    height: height * 0.05,
    resizeMode: "stretch",
    borderRadius:20
  },
  scrollContainer: {
    paddingVertical: 10,
    padding: 24,
  },
  loanContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A50F6",
    borderRadius: 13,
    alignSelf: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
    width: "100%",
  },
  loanImage: {
    height: height * 0.07,
    width: width * 0.14,
    resizeMode: "stretch",
  },
  loanLabel: {
    fontWeight: "600",
    fontSize: 18,
    color: "#FFFFFF",
    marginLeft: 20,
  },
  dashBoardContainer: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 30,
    borderRadius: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: "100%",
  },
  dashBoardImage: {
    height: height * 0.05,
    width: width * 0.1,
    resizeMode: "stretch",
  },
  dashBoardLabel: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 20,
  },
  investmentImage: {
    height: height * 0.15,
    width: "100%",
    resizeMode: "stretch",
  },
  investmentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginLeft: 10,
    padding: 10,
    borderRadius: 13,
    // justifyContent:"space-between",
    alignItems: "center",
  },
  investMentLabel: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 10,
  },
  subScribcontainer: {
    // padding: 10,
    paddingHorizontal:10,
    paddingTop:10,
    marginVertical: 10,
    borderRadius: 13,
    marginTop: 20,
  },
  background: {
    height: 200,
    shadowColor: "red",
  },
  inviteContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 13,
    flexDirection: "row",
    paddingVertical: 20,
  },
  rowSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subscribeTextContainer: {
    width: "70%",
  },
  subscribeButton: {
    backgroundColor: "#2BB71E",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  subscribeButtonText: {
    fontWeight: "500",
    fontSize: 12,
    color: "#FFFFFF",
  },
  unlockText: {
    fontWeight: "500",
    fontSize: 10,
    color: "#073E02",
  },
  subscribeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  subscribeNowText: {
    color: "#F62516",
    fontWeight: "600",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  subscribeImage: {
    height: "100%",
    width: width * 0.25,
    resizeMode: "stretch",
  },
  inviteContainer: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inviteTextContainer: {
    width: "68%",
  },
  inviteTitle: {
    color: "#00550D",
    fontWeight: "600",
    fontSize: 14,
  },
  inviteSubtitle: {
    color: "#000000",
    fontWeight: "400",
    fontSize: 10,
  },
  inviteNowText: {
    color: "#0516D3",
    textDecorationLine: "underline",
    fontWeight: "600",
    fontSize: 15,
  },
  inviteImage: {
    width: 100,
    height: "100%",
    resizeMode: "stretch",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch", // Ensures children stretch to same height
    justifyContent: "space-between",
  },
  customerBox: {
    width: "45%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#0000001F",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
  },
  customerImage: {
    height: height * 0.08,
    width: width * 0.2,
    resizeMode: "stretch",
  },
  customerCareImage: {
    height: height * 0.06,
    width: width * 0.2,
    resizeMode: "stretch",
  },
  customerTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  customerTitle: {
    fontWeight: "500",
    fontSize: 10,
    textAlign: "center",
  },
  customerSubtitle: {
    fontWeight: "400",
    fontSize: 11,
  },
  cashbackText: {
    fontWeight: "600",
    fontSize: 16,
  },
  promoBanner: {
    backgroundColor: "#FDD323",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  salesIcon: {
    height: height * 0.03,
    width: width * 0.1,
    resizeMode: "stretch",
  },
  promoText: {
    fontWeight: "500",
    fontSize: 14,
  },
  rightArrow: {
    height: height * 0.02,
    width: width * 0.06,
    resizeMode: "stretch",
  },
  footerContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 13,
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderColor: "#00000040",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginBottom: 30,
  },
  footerContentContainer: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#E6E7FF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  footerLabel: {
    fontWeight: "800",
    fontSize: 15,
    marginLeft: 5,
  },
  footerIcon: {
    height: height * 0.03,
    width: width * 0.06,
    resizeMode: "stretch",
  },
});
