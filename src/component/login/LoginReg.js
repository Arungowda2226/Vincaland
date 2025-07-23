import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './Login'

const LoginReg = () => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  )
}

export default LoginReg

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
})