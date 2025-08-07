import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../header/Header'

const PaymentHistory = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <Header title={"Payment History"} navigation={navigation}/>
    </View>
  )
}

export default PaymentHistory

const styles = StyleSheet.create({})