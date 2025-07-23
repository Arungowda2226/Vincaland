import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "../header/Header";
import { Ionicons } from "@expo/vector-icons";
import themeColor from "../colorpicker/ThemeColor";
import { BarChart } from "react-native-gifted-charts";
// import { Table, Row, Rows } from "react-native-table-component";

const { width, height } = Dimensions.get("window");

const DashBoard = () => {
  const tableHead = ["Head", "Head2", "Head3", "Head4"];
  const tableData = [
    ["1", "2", "3", "4"],
    ["a", "b", "c", "d"],
    ["1", "2", "3", "456\n789"],
    ["a", "b", "c", "d"],
  ];

  const [isTable, setIsTable] = useState(true);
  const [isChart, setIsChart] = useState(false);

  const data = [
    {
      label: "July 2025",
      stacks: [
        { value: 1200, color: "#6A0DAD", label: "invested" }, // Purple
      ],
    },
    {
      label: "July 2025",
      stacks: [
        { value: 1200, color: "#6A0DAD", label: "invested" }, // Purple
        { value: 3000, color: "#00C853", label: "returns" }, // Green
      ],
    },
  ];

  const handleTable = () => {
    setIsChart(false);
    setIsTable(true);
  };

  const handleChart = () => {
    setIsTable(false);
    setIsChart(true);
  };

  return (
    <View style={styles.main}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Premium Member's DashBoard</Text>
          <Ionicons name="person-circle" size={30} color="#5D17EB" />
        </View>
        <View style={styles.firstContainer}>
          <View>
            <Text style={styles.withdrawBtnLabel}>Expected Funds</Text>
            <Text style={styles.withdrawBtnLabel}>₹0</Text>
            <Text style={styles.withdrawBtnLabel}>
              Ready to withdraw anytime
            </Text>
          </View>
          <Pressable style={styles.withdrawBtn}>
            <Text style={styles.withdrawBtnLabel}>₹ withdraw</Text>
          </Pressable>
        </View>
        <View style={styles.secMainContainer}>
          <View style={styles.secContainer}>
            <View style={styles.firstBox}>
              <Text style={styles.label}>Months Enrolled</Text>
              <Ionicons name="calendar-outline" size={20} color="#000" />
            </View>
            <View style={styles.firstSubBox}>
              <Text style={styles.numLabel}>1</Text>
              <Text style={styles.infoLabel}>Active since june 2025</Text>
            </View>
          </View>
          <View style={styles.secSubContainer}>
            <View style={styles.firstBox}>
              <Text style={styles.secSublabel}>Months Enrolled</Text>
              <Ionicons name="wallet-outline" size={20} color="white" />
            </View>
            <View style={styles.firstSubBox}>
              <Text style={styles.secNumLabel}>₹0</Text>
              <Text style={styles.secInfoLabel}>₹2200 per month (average)</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 13,
            backgroundColor: "white",
            borderColor: "#dbe3e7ff",
          }}
        >
          <View style={styles.overViewContainer}>
            <View style={{ width: width * 0.4 }}>
              <Text>Subscription Overview</Text>
              <Text>Your Money growth and returns over time</Text>
            </View>
            <Pressable style={styles.nanReturnBtn}>
              <Text style={styles.nanReturnLabel}>+NaN% Returns</Text>
            </Pressable>
          </View>
          <View style={styles.viewContainer}>
            <Pressable
              onPress={handleTable}
              style={[
                styles.box,
                { backgroundColor: isTable ? "white" : null },
              ]}
            >
              <Text style={styles.viewTypeLabel}>Table View</Text>
            </Pressable>
            <Pressable
              onPress={handleChart}
              style={[
                styles.box,
                { backgroundColor: isChart ? "white" : null },
              ]}
            >
              <Text style={styles.viewTypeLabel}>Chart View</Text>
            </Pressable>
          </View>
          {isTable ? (
            <View>
              <View style={styles.tableViewBox}>
                <Text style={[styles.tableLabel, { width: width * 0.1 }]}>
                  MONTH
                </Text>
                <Text style={[styles.tableLabel, { width: width * 0.2 }]}>
                  SUBSCRIPTION
                </Text>
                <Text style={[styles.tableLabel, { width: width * 0.2 }]}>
                  PREMIUM SERVICES PROVIDED
                </Text>
                <Text style={[styles.tableLabel, { width: width * 0.2 }]}>
                  EXPECTED REFUND
                </Text>
              </View>
              <View style={styles.dataListContainer}>
                <Text style={[styles.tableLabel, { width: width * 0.1 }]}>
                  July 2025
                </Text>
                <Text style={[styles.tableLabel, { width: width * 0.2 }]}>
                  ₹1200
                </Text>
                <Text style={[styles.tableLabel, { width: width * 0.2 }]}>
                  ₹2000
                </Text>
                <Text style={[styles.tableLabel, { width: width * 0.2 }]}>
                  ₹3000
                </Text>
              </View>
            </View>
          ) : (
            <View style={{ padding: 2, flex: 1 }}>
              <BarChart
                barWidth={45}
                barBorderRadius={8}
                noOfSections={6}
                maxValue={6000}
                spacing={40}
                yAxisThickness={0}
                stackData={data}
                yAxisLabelTexts={[
                  "₹0k",
                  "₹1k",
                  "₹2k",
                  "₹3k",
                  "₹4k",
                  "₹5k",
                  "₹6k",
                ]}
                showValuesAsTopLabel={true}
                isAnimated
                showLegend={true}
              />
              <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", marginVertical:10}}>
              <View style={{flexDirection:"row", alignItems:"center"}}>
                <View style={{height:20, width:20, borderRadius:5,backgroundColor:"#6A0DAD",marginLeft:3}}/>
                <Text>Invested</Text>
              </View>
              <View style={{flexDirection:"row", alignItems:"center", marginLeft:10}}>
                <View style={{height:20, width:20, borderRadius:5,backgroundColor:"green",marginLeft:3}}/>
                <Text>Returns</Text>
              </View>
              </View>
            </View>
          )}
          <View
                style={{
                  marginVertical: 10,
                  borderWidth: 1,
                  borderColor: themeColor.BORDER_CLR,
                }}
              />
              <View style={styles.extraDetails}>
                <View style={styles.subExtraDetails}>
                  <Text style={styles.tableLabel}>Montly Membership Fee</Text>
                  <Text style={styles.tableLabel}>₹1200</Text>
                </View>
                <View style={styles.subExtraDetails}>
                  <Text style={styles.tableLabel}>Current Monthly Refunds</Text>
                  <Text style={styles.tableLabel}>₹3000</Text>
                </View>
                <View style={styles.subExtraDetails}>
                  <Text style={styles.tableLabel}>Net Value</Text>
                  <Text style={styles.tableLabel}>₹4800</Text>
                </View>
              </View>
        </View>

        <View
          style={{
            paddingLeft: 10,
            backgroundColor: themeColor.BLUE_CLR,
            borderRadius: 13,
            marginVertical: 10,
          }}
        >
          <View
            style={{
              padding: 10,
              backgroundColor: themeColor.LIGHT_BLUE_CLR,
              borderRadius: 13,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color={themeColor.BLUE_CLR}
                style={{
                  padding: 10,
                  backgroundColor: themeColor.BORDER_CLR,
                  borderRadius: 13,
                }}
              />
              <View style={{ width: width * 0.4 }}>
                <Text>Next Payment Due</Text>
                <Text>Your upcoming Subscription Payment</Text>
              </View>
              <Pressable
                style={{
                  padding: 10,
                  backgroundColor: "green",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 13,
                }}
              >
                <Ionicons name="wallet-outline" size={20} color="white" />
                <Text style={{ marginLeft: 3, color: "white" }}>Pay now</Text>
              </Pressable>
            </View>
            <View
              style={{
                marginVertical: 10,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View>
                <Text>Due Date</Text>
                <Text>5th Augest</Text>
              </View>
              <View>
                <Text>Amount Due</Text>
                <Text>1200</Text>
              </View>
              <View>
                <Text>Expected Return</Text>
                <Text>3000</Text>
              </View>
            </View>
            <View
              style={{
                padding: 10,
                borderWidth: 1,
                backgroundColor: "white",
                marginVertical: 10,
                borderColor: themeColor.BORDER_CLR,
                borderRadius: 13,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: width * 0.5 }}>
                <Text>Auto-debit scheduled</Text>
                <Text>
                  Payment will be automatically processed on the due date
                </Text>
              </View>
              <Pressable
                style={{
                  padding: 10,
                  backgroundColor: "#DCEDC8",
                  borderRadius: 13,
                }}
              >
                <Text>Active</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 200,
    // alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#5D17EB",
  },
  firstContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 13,
    backgroundColor: "#5D17EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  withdrawBtn: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 13,
  },
  withdrawBtnLabel: {
    fontWeight: "600",
    fontSize: 15,
    color: "white",
  },
  secContainer: {
    paddingHorizontal: 15,
    borderRadius: 13,
    backgroundColor: "#E0F2FE",
    paddingVertical: 20,
    width: width * 0.42,
  },
  secSubContainer: {
    paddingHorizontal: 15,
    borderRadius: 13,
    backgroundColor: "#5D17EB",
    paddingVertical: 20,
    width: width * 0.42,
  },
  firstBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  firstSubBox: {
    marginTop: 20,
  },
  secMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontWeight: "600",
    fontSize: 13,
  },
  numLabel: {
    fontWeight: "800",
    fontSize: 18,
  },
  infoLabel: {
    fontSize: 12,
    marginTop: 5,
  },
  secInfoLabel: {
    fontSize: 10,
    marginTop: 5,
    color: "white",
  },
  secNumLabel: {
    fontWeight: "800",
    fontSize: 18,
    color: "white",
  },
  secSublabel: {
    fontWeight: "600",
    fontSize: 13,
    color: "white",
  },
  overViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nanReturnBtn: {
    borderWidth: 1.5,
    borderColor: "#dbe3e7ff",
    backgroundColor: "#E0F2FE",
    padding: 10,
    borderRadius: 13,
  },
  nanReturnLabel: {
    fontWeight: "600",
    fontSize: 16,
    color: "#5D17EB",
  },
  viewContainer: {
    padding: 3,
    backgroundColor: themeColor.BORDER_CLR,
    borderRadius: 13,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  box: {
    flex: 1,
    padding: 10,
    borderRadius: 13,
    alignItems: "center",
  },
  viewTypeLabel: {
    fontWeight: "700",
    fontSize: 16,
  },
  tableViewBox: {
    padding: 10,
    backgroundColor: themeColor.BORDER_CLR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  tableLabel: {
    fontWeight: "600",
    fontSize: 10,
    flexWrap: "wrap",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  dataListContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  extraDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subExtraDetails: {
    width: width * 0.25,
  },
});
