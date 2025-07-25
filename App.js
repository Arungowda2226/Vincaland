// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/component/login/LoginScreen";
import DashBoard from "./src/component/dashboard/DashBoard";
import Login from "./src/component/login/Login";
import AppLogin from "./src/component/applogin/AppLogin";
import AppSignUp from "./src/component/appsingup/AppSignUp";
import Home from "./src/component/home/Home";
import Loan from "./src/component/loan/Loan";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="appLogin" screenOptions={{headerShown: false}} >
        <Stack.Screen name="appLogin" component={AppLogin}/>
        <Stack.Screen name="AppSignUp" component={AppSignUp}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DashBoard" component={DashBoard} />
        <Stack.Screen name="Loan" component={Loan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
