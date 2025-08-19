import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { Ionicons } from "@expo/vector-icons";
import API from "../apidetails/Api";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";

const PaymentHistory = ({ navigation }) => {

  const [dashBoardDetails, setDashBoardDetails] = useState({});
  const [payments, setPayments] = useState([]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      getPaymentDetails();
      getDashBoardDetails();
    }
  }, [user]);

  const getPaymentDetails = () => {
    console.log(user, "thisIsUsers");
    fetch(`${API}/payments/getByEmail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPayments(data?.paymentInfos);
      });
  };

  const getDashBoardDetails = () => {
    fetch(`${API}/investors/findByEmail`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDashBoardDetails(data);
      })
      .catch((err) => {});
  };

  const calculateNextDueDate = (lastPaymentDate = null) => {
    const base = lastPaymentDate ? new Date(lastPaymentDate) : new Date();
    base.setMonth(base.getMonth() + 1);
    base.setDate(5);
    return base;
  };

  const nextDueDate = calculateNextDueDate(
    dashBoardDetails.lastPaymentDoneOn
      ? new Date(dashBoardDetails.lastPaymentDoneOn)
      : null
  );


  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return "th";

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  function getDisplayDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });

    const suffix = getOrdinalSuffix(day);

    return `${day}${suffix} ${month}`;
  }

  const paymentList = ({item, index}) => {
    if(item?.isVerified) {
    return(
      <View style={styles.historyItem}>
              <View style={styles.iconContainer}>
                <Image source={require("../../../assets/shear.png")} />
              </View>
              <View>
                <Text style={styles.itemTitle}>Payment Paid successfully.</Text>
                <Text style={styles.itemDate}>
                  {getDisplayDate(new Date(item.paymentDate))}
                </Text>
              </View>
              <View style={styles.itemRight}>
                <Text style={styles.itemAmount}>₹{item.paymentAmount}</Text>
                <Ionicons
                  name="chevron-forward-outline"
                  style={styles.itemArrow}
                />
              </View>
            </View>
    )
  } else {
    return null
  }
  }

  return (
    <View style={styles.container}>
      <Header title={"Payment History"} navigation={navigation} />
      <View style={styles.content}>
        {/* Subscription Card */}
        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionLabel}>
            <Text style={styles.subscriptionLabelText}>
              Pay Subscription Installment
            </Text>
          </View>
          <Text style={styles.priceText}>
            <Text style={styles.highlightedPrice}>₹1200</Text>/month
          </Text>
          <Text style={styles.dueDate}>
            Your next subscription installment is due{" "}
            {getDisplayDate(nextDueDate)}
          </Text>
          {/* <View style={styles.payNowBtn}>
            <Text style={styles.payNowText}>Pay now</Text>
          </View> */}
        </View>

        {/* History Header */}
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Referral History</Text>
          {/* <Ionicons name="search-outline" size={24} /> */}
        </View>
        <View style={styles.historyDivider} />

        {/* History List */}
        <View style={styles.scrollContainer}>
          <FlatList
            data={payments}
            renderItem={paymentList}
            keyExtractor={(item,index)=> index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 24 },
  subscriptionCard: {
    padding: 10,
    backgroundColor: "#1E32FB",
    borderRadius: 15,
    elevation: 6,
    shadowColor: "#00000040",
    shadowOpacity: 0.2,
    shadowRadius: 13,
  },
  subscriptionLabel: {
    padding: 6,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    alignSelf: "flex-start",
    marginVertical: 5,
  },
  subscriptionLabelText: { fontSize: 12, fontWeight: "600" },
  priceText: { fontWeight: "500", fontSize: 12, color: "#FFFFFF" },
  highlightedPrice: { fontWeight: "700", fontSize: 20 },
  dueDate: {
    fontWeight: "500",
    fontSize: 12,
    color: "#AFB6FE",
    marginVertical: 10,
  },
  payNowBtn: {
    backgroundColor: "#3EDF03",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 13,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  payNowText: { fontWeight: "600", color: "#FFFFFF", fontSize: 12 },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  historyTitle: { fontWeight: "600", fontSize: 16 },
  historyDivider: {
    borderWidth: 1,
    borderColor: "#DADADA",
    marginBottom:10,
  },
  scrollContainer: { paddingVertical: 10, flex:1 },
  historyItem: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: "#E5FBDD",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  itemTitle: { fontWeight: "600", fontSize: 13, color: "#000000" },
  itemDate: { fontWeight: "400", fontSize: 13, color: "#626262" },
  itemRight: { justifyContent: "space-between" },
  itemAmount: { fontWeight: "600", fontSize: 16, color: "#000000" },
  itemArrow: { marginTop: 10, alignSelf: "flex-end", color: "#575656" },
});
