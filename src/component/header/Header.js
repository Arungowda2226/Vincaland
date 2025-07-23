import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const Header = () => {
  return (
    <View style={styles.main}>
        <Ionicons name='chevron-back-outline' size={30}/>
        <Text style={styles.headerLabel}>Header</Text>
        <View style={{width:"10%"}}/>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    main:{
        marginVertical:10,
        padding:20,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        // backgroundColor:"pink"
    },
    headerLabel:{
      fontWeight:"600",
      fontSize: 18
    }
})