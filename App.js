import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

import AppLogin from "./src/component/applogin/AppLogin";
import AppSignUp from "./src/component/appsingup/AppSignUp";
import Home from "./src/component/home/Home";
import Login from "./src/component/login/Login";
import DashBoard from "./src/component/dashboard/DashBoard";
import Loan from "./src/component/loan/Loan";
import Investment from "./src/component/investment/Investment";
import Calculator from "./src/component/calculator/Calculator";
import CustomDrawer from "./src/component/drawer/CustomDrawer";
import EditProfile from "./src/component/profile/EditProfile";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Loan" component={Loan} />
      <Drawer.Screen name="Investment" component={Investment} />
      <Drawer.Screen name="Calculator" component={Calculator} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="appLogin" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="appLogin" component={AppLogin} />
          <Stack.Screen name="AppSignUp" component={AppSignUp} />
          <Stack.Screen name="Main" component={MyDrawer} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="DashBoard" component={DashBoard} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
