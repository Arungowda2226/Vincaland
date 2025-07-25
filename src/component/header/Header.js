import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



const Header = ({ title, navigation }) => {

    const handleBack = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Ionicons name="chevron-back-outline" size={30} onPress={handleBack}/>
            {
                title ?
                    <Text style={styles.headerTitle}>{title}</Text>
                    :
                    <View style={styles.locationContainer}>
                        <Ionicons name="location-outline" size={20} />
                        <Text style={styles.locationLabel}>Bengaluru</Text>
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor:"#ffff"
    },
    locationContainer: {
        padding: 10,
        backgroundColor: "#cccc",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 13,
        marginLeft: 20
    },
    locationLabel: {
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 8
    },
    headerTitle:{
        fontWeight:"600",
        fontSize:18,
        marginLeft:15
    }
})

export default Header;