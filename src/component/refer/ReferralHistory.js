import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../header/Header'

const ReferralHistory = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <Header title={"Referral History"} navigation={navigation}/>
    </View>
  )
}

export default ReferralHistory

const styles = StyleSheet.create({})