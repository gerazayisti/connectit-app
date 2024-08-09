import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const BottomNav = () => {
    const router = useRouter();

    return (
        <View style={styles.navContainer}>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('home')}>
                <Ionicons name="home" size={24} color="white" />
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('profile')}>
                <Ionicons name="person" size={24} color="white" />
                <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('messages')}>
                <Ionicons name="mail" size={24} color="white" />
                <Text style={styles.navText}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('settings')}>
                <Ionicons name="settings" size={24} color="white" />
                <Text style={styles.navText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        paddingVertical: 10,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        color: 'white',
        fontSize: 12,
    },
});

export default BottomNav;
