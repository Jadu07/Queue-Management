import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Surface, useTheme, ActivityIndicator, Chip } from 'react-native-paper';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function History() {
    const { user, backend_link } = useAuth();
    const theme = useTheme();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchHistory = async () => {
        try {
            const res = await axios.get(`${backend_link}/admin/history`, {
                headers: { Authorization: `Bearer ${user.token}` } // Assuming token is handled by axios interceptor or passed here if needed. 
                // Wait, AuthContext usually handles token storage but here we might need to pass it if not globally set.
                // Let's check AuthContext again. It stores token in AsyncStorage. 
                // For now, let's assume we need to pass it if not set in defaults.
                // Actually, looking at AuthContext, it doesn't seem to set global axios headers.
                // So I'll need to get the token. But useAuth exposes 'user' which has some details.
                // Let's check if 'user' object has token. In AuthContext login, it sets user state.
                // Wait, AuthContext.js: setUser(u) where u = { email, businessName, businessId }. Token is in AsyncStorage 'token'.
                // I should probably get token from AsyncStorage or update AuthContext to expose it.
                // For simplicity, I'll import AsyncStorage here to get the token.
            });
            // Actually, let's check how other components fetch data.
            // They probably use the token from AsyncStorage.
            // I'll add AsyncStorage import.
            setHistory(res.data.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Re-implementing fetch with token retrieval
    const fetchHistoryWithToken = async () => {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        const token = await AsyncStorage.getItem('token');
        try {
            const res = await axios.get(`${backend_link}/admin/history`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHistory(res.data.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchHistoryWithToken();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchHistoryWithToken();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'COMPLETED': return theme.colors.primary; // Purple
            case 'SKIPPED': return theme.colors.error; // Red
            case 'SERVING': return '#FFA500'; // Orange
            case 'WAITING': return '#2196F3'; // Blue
            default: return '#757575'; // Grey
        }
    };

    const renderItem = ({ item }) => (
        <Surface style={styles.card} elevation={1}>
            <View style={styles.cardHeader}>
                <Text variant="titleMedium" style={styles.token}>#{item.daily_token_number}</Text>
                <Chip
                    style={{ backgroundColor: getStatusColor(item.status) }}
                    textStyle={{ color: 'white', fontSize: 12 }}
                >
                    {item.status}
                </Chip>
            </View>
            <Text variant="bodyLarge" style={styles.name}>{item.name}</Text>
            <Text variant="bodyMedium" style={styles.time}>
                {new Date(item.createdAt).toLocaleString()}
            </Text>
        </Surface>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.header}>Customer History</Text>
            <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={<Text style={styles.emptyText}>No history available.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 20,
        paddingTop: 0,
    },
    card: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    token: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    name: {
        fontSize: 16,
        marginBottom: 4,
    },
    time: {
        color: '#666',
        fontSize: 12,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#666',
    }
});
