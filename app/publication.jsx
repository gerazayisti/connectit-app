import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';

const data = [
    {
        id: '1',
        name: 'Elizabeth',
        time: '52 minutes ago',
        image: 'https://randomuser.me/api/portraits/women/16.jpg',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.',
        likes: 85,
        comments: 12,
        shares: 36,
    },
    {
        id: '2',
        name: 'Tom',
        time: '1 h ago',
        image: 'https://randomuser.me/api/portraits/men/54.jpg',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.',
        likes: 42,
        comments: 6,
        shares: 14,
    },
];

const TimelineItem = ({ item, navigateToProfile }) => (
    <View style={styles.postContainer}>
        <View style={styles.header}>
            <Pressable onPress={navigateToProfile}>
                <Image source={{ uri: item.image }} style={styles.profileImage} />
            </Pressable>
            <View style={styles.headerText}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Following</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.postText}>{item.text}</Text>
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.postImage} />
        </View>
        <View style={styles.interactionRow}>
            <View style={styles.interaction}>
                <Ionicons name="heart-outline" size={24} color="black" />
                <Text style={styles.interactionText}>{item.likes}</Text>
            </View>
            <View style={styles.interaction}>
                <Ionicons name="chatbubble-outline" size={24} color="black" />
                <Text style={styles.interactionText}>{item.comments}</Text>
            </View>
            <View style={styles.interaction}>
                <Ionicons name="share-outline" size={24} color="black" />
                <Text style={styles.interactionText}>{item.shares}</Text>
            </View>
        </View>
    </View>
);

export default function App() {
    const router = useRouter();

    const navigateToProfile = () => {
        router.push('profile');
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <TimelineItem item={item} navigateToProfile={navigateToProfile} />}
                keyExtractor={(item) => item.id}
            />
            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    postContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    headerText: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    time: {
        color: '#888',
    },
    followButton: {
        backgroundColor: '#00f',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    followButtonText: {
        color: '#fff',
    },
    postText: {
        marginBottom: 10,
    },
    imageContainer: {
        marginBottom: 10,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    interactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    interaction: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    interactionText: {
        marginLeft: 5,
    },
});
