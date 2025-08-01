import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  Modal,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Header from "../header/Header";
import { Ionicons } from "@expo/vector-icons";
import themeColor from "../colorpicker/ThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import API from "../apidetails/Api";
import { BarChart } from "react-native-gifted-charts";
import PaymentModal from "../paymentModal/PaymentModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReferForm from "../refer/ReferForm";
import WithdrawnModal from "../withdrawn/WithdrawnModal";

const { width, height } = Dimensions.get("window");

const DashBoard = ({ navigation, route }) => {
  const { userDetails } = route?.params;
  const [isTable, setIsTable] = useState(true);
  const [isChart, setIsChart] = useState(false);
  const [dashBoardDetails, setDashBoardDetails] = useState({});
  const [paymentInfos, setPaymentInfos] = useState([]);
  const [showQrCode, setShowQrCode] = useState(false);
  const [showReferForm, setShowReferForm] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const nextDueAmount = 1200;
  const MONTHLY_RETURN = 3000;
  const currentInvested = dashBoardDetails.investedAmount;
  const currentReturns = dashBoardDetails.returnsAmount;
  const chartData = generateChartData(paymentInfos);

  const [selectedBar, setSelectedBar] = useState(null);
  const tooltipPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    console.log(userDetails, "thisIsUserDetails");
    if (userDetails) {
      AsyncStorage.setItem("token", userDetails.token);
      getDashBoardDetails();
      paymentDetails();
    }
  }, [userDetails]);

  const stackedData = chartData.map((item) => {
    const stacks = [];
    if (item.invested)
      stacks.push({
        value: item.invested,
        color: "#6A0DAD",
        label: "Invested",
      });
    if (item.returns)
      stacks.push({ value: item.returns, color: "#00C853", label: "Returns" });
    return { label: item.month, stacks };
  });

  // Dynamic scaling
  const maxStackValue = Math.max(
    ...stackedData.map((d) => d.stacks.reduce((sum, s) => sum + s.value, 0))
  );
  const maxValue = Math.ceil(maxStackValue / 1000) * 1000;
  const noOfSections = 6;
  const step = maxValue / noOfSections;
  const yAxisLabelTexts = Array.from(
    { length: noOfSections + 1 },
    (_, i) => `₹${((i * step) / 1000).toFixed(0)}k`
  );

  const barWidth = 45;
  const spacing = 40;

  const handleBarPress = (item, index) => {
    setSelectedBar({ ...item, index });

    // Calculate tooltip X position based on index
    const barX = index * (barWidth + spacing) + barWidth / 2;

    // Animate tooltip to bar position
    Animated.spring(tooltipPosition, {
      toValue: { x: barX, y: 20 }, // Y fixed above chart
      useNativeDriver: false,
    }).start();
  };

  const handleTable = () => {
    setIsChart(false);
    setIsTable(true);
  };

  const handleChart = () => {
    setIsTable(false);
    setIsChart(true);
  };

  const getDashBoardDetails = () => {
    fetch(`${API}/investors/findByEmail`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "thisIsInvestorDashBoardData");
        setDashBoardDetails(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const paymentDetails = () => {
    const paymentApi = `${API}/payments/getByEmail`;
    fetch(paymentApi, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPaymentInfos(data.paymentInfos);
        console.log(data.paymentInfos, "thisIsInvestorDashBoardPaymentData");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
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

  function getDisplayDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });

    const suffix = getOrdinalSuffix(day);

    return `${day}${suffix} ${month}`;
  }

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

  function generateChartData(paymentInfos) {
    return paymentInfos.map((paymentData, index) => {
      const date = paymentData.paymentDate
        ? new Date(paymentData.paymentDate)
        : new Date();

      return {
        month: getMonthFromDate(date),
        invested: paymentData.paymentAmount ?? 2200,
        returns: calculateReturns(paymentInfos.slice(0, index)),
        colorInvested: "#5D17EB",
        colorReturns: "#03AC13",
      };
    });
  }

  function getMonthFromDate(date) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }

  function calculateReturns(paymentInfos) {
    return paymentInfos.reduce(accumulator, 0);
  }

  function accumulator(totalReturnsSoFar, currentPayment) {
    const invested = currentPayment.paymentAmount ?? 2200;
    return totalReturnsSoFar + invested * 3;
  }

  const generateQrCode = () => {
    setShowQrCode(true);
  };

  const handleShowReferForm = () => {
    setShowReferForm(true);
  }

  const handleWithdraw = () => {
    setShowWithdrawModal(true);
  }

  return (
    <View style={styles.main}>
      <Header
        title={"Premium Member Dashboard"}
        navigation={navigation}
        userIcon={true}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={["#0516D3", "#D21084"]}
          start={{ x: 0, y: 0 }} // Left
          end={{ x: 1, y: 0 }}
          style={styles.firstContainer}
        >
          <View>
            <Text style={styles.withdrawBtnLabel}>Expected Funds</Text>
            <Text style={styles.withdrawBtnLabel}>
              ₹
              {dashBoardDetails.investedAmount + dashBoardDetails.returnsAmount}
            </Text>
            <Text style={styles.withdrawBtnLabel}>
              Ready to withdraw anytime
            </Text>
          </View>
          <Pressable onPress={handleWithdraw} style={styles.withdrawBtn}>
            <Ionicons name="wallet-outline" size={20} color={"white"} />
            <Text style={styles.withdrawBtnLabel}>withdraw</Text>
          </Pressable>
        </LinearGradient>
        <View style={styles.secMainContainer}>
          <View style={styles.secContainer}>
            <View style={styles.firstBox}>
              <Text style={styles.label}>Months Enrolled</Text>
              <Ionicons name="calendar-outline" size={20} color="#000" />
            </View>
            <View style={styles.firstSubBox}>
              <Text style={styles.numLabel}>1</Text>
              <Text style={styles.infoLabel}>
                Active since {formatDate(dashBoardDetails.joinedOn)}
              </Text>
            </View>
          </View>
          <View style={styles.secSubContainer}>
            <View style={styles.firstBox}>
              <Text style={styles.secSublabel}>Total Paid</Text>
              <Ionicons name="wallet-outline" size={20} color="white" />
            </View>
            <View style={styles.firstSubBox}>
              <Text style={styles.secNumLabel}>
                ₹{dashBoardDetails.investedAmount}
              </Text>
              <Text style={styles.secInfoLabel}>₹2200 per month (average)</Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={handleShowReferForm}
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor:"#f0dd9fff",
            borderRadius:13,
            marginVertical:10
          }}
        >
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Ionicons name="chatbubble-ellipses-outline" size={30} />
            <Text style={{marginLeft:10, fontWeight:"600", fontSize:14}}>Message & Refer</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={30} />
        </Pressable>
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
              <Image source={require("../../../assets/Arrow.png")} />
              <Text style={styles.nanReturnLabel}>
                {" "}
                + {((currentReturns / currentInvested) * 100).toFixed(0)}%
                Returns
              </Text>
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
              {chartData.map((item, indx) => (
                <View style={styles.dataListContainer} key={indx}>
                  <Text style={[styles.tableLabel, { width: width * 0.17 }]}>
                    {/* July 2025 */}
                    {item.month}
                  </Text>
                  <Text style={[styles.tableLabel, { width: width * 0.2 }]}>
                    {/* ₹1200 */}
                    {item.invested}
                  </Text>
                  <Text style={[styles.tableLabel, { width: width * 0.2 }]}>
                    ₹2000
                  </Text>
                  <Text
                    style={[
                      styles.tableLabel,
                      { width: width * 0.2, color: "green" },
                    ]}
                  >
                    ₹3000
                    {/* {item.returns} */}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ paddingBottom: 20 }}>
                <BarChart
                  stackData={stackedData}
                  barWidth={barWidth}
                  barBorderRadius={8}
                  noOfSections={noOfSections}
                  maxValue={maxValue}
                  spacing={spacing}
                  yAxisThickness={0}
                  yAxisLabelTexts={yAxisLabelTexts}
                  showValuesAsTopLabel={false}
                  showYAxisIndices={false}
                  hideRules
                  isAnimated
                  showLegend={true}
                  onPress={handleBarPress} // ✅ Only item & index
                />

                {selectedBar && (
                  <Animated.View
                    style={[
                      styles.tooltip,
                      {
                        transform: [
                          { translateX: tooltipPosition.x },
                          { translateY: tooltipPosition.y },
                        ],
                      },
                    ]}
                  >
                    <Text style={styles.tooltipTitle}>{selectedBar.label}</Text>
                    {selectedBar.stacks.map((s, i) => (
                      <Text key={i} style={{ color: s.color }}>
                        {s.label}: ₹{s.value}
                      </Text>
                    ))}
                  </Animated.View>
                )}
              </View>
            </ScrollView>
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
              <Text style={[styles.tableLabel, { color: "green" }]}>₹3000</Text>
            </View>
            <View style={styles.subExtraDetails}>
              <Text style={styles.tableLabel}>Net Value</Text>
              <Text style={styles.tableLabel}>
                ₹
                {dashBoardDetails.investedAmount +
                  dashBoardDetails.returnsAmount}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            padding: 10,
            backgroundColor: "#FFFFFF",
            borderRadius: 13,
            marginVertical: 10,
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
              <Text style={styles.subLabel}>Next Payment Due</Text>
              <Text style={styles.nextPayLabel}>
                Your upcoming Subscription Payment
              </Text>
            </View>
            <Pressable onPress={generateQrCode} style={styles.payNowBtn}>
              <Ionicons name="wallet-outline" size={20} color="white" />
              <Text style={{ marginLeft: 3, color: "white" }}>Pay now</Text>
            </Pressable>
          </View>
          <View style={styles.paymentContainer}>
            <View>
              <Text style={styles.nextPayLabel}>Due Date</Text>
              <Text style={styles.subLabel}>{getDisplayDate(nextDueDate)}</Text>
            </View>
            <View>
              <Text style={styles.nextPayLabel}>Amount Due</Text>
              <Text style={styles.subLabel}>
                ₹{nextDueAmount.toLocaleString("en-IN")}
              </Text>
            </View>
            <View>
              <Text style={styles.nextPayLabel}>Expected Return</Text>
              <Text style={styles.subLabel}>
                {" "}
                ₹{MONTHLY_RETURN.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
          <View style={styles.paymentSubContainer}>
            <View style={{ width: width * 0.5 }}>
              <Text>Auto-debit scheduled</Text>
              <Text>
                Payment will be automatically processed on the due date
              </Text>
            </View>
            <Pressable style={styles.activeBtn}>
              <Text>Active</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Modal visible={showQrCode}>
        <PaymentModal closeModal={setShowQrCode} />
      </Modal>
      <Modal visible={showReferForm} animationType="slide">
        <ReferForm closeModal={setShowReferForm} />
      </Modal>
      <Modal visible={showWithdrawModal} animationType="slide">
        <WithdrawnModal closeModal={setShowWithdrawModal} />
      </Modal>
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
    backgroundColor: "#3DC426",
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  withdrawBtnLabel: {
    fontWeight: "600",
    fontSize: 15,
    color: "white",
    marginLeft: 5,
  },
  secContainer: {
    paddingHorizontal: 15,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    width: width * 0.42,
  },
  secSubContainer: {
    paddingHorizontal: 15,
    borderRadius: 13,
    backgroundColor: "#3DC426",
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
    flexDirection: "row",
    alignItems: "center",
  },
  nanReturnLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: "#5D17EB",
  },
  viewContainer: {
    padding: 3,
    backgroundColor: "#E7E7E7",
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
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
  },
  text: {
    margin: 6,
  },
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
  subLabel: {
    fontWeight: "700",
    fontSize: 14,
  },
  nextPayLabel: {
    fontWeight: "400",
    fontSize: 12,
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "flex-start",
  },
  tooltipTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  payNowBtn: {
    padding: 10,
    backgroundColor: "#3DC426",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 13,
  },
  paymentContainer: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  paymentSubContainer: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#dbe3e7ff",
    marginVertical: 10,
    borderColor: themeColor.BORDER_CLR,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activeBtn: {
    padding: 10,
    backgroundColor: "#B5FFA8",
    borderRadius: 13,
  },
});
