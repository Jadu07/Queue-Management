import React from 'react'
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

const HomeCurrentServingCard = ({ currentServing, onSkip, onComplete, onStart, loading }) => {
    if (loading) {
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Current Serving</Text>
                <View style={[styles.card, styles.loadingCard]}>
                    <ActivityIndicator size="large" color="#6750a4" />
                </View>
            </View>
        )
    }

    if (!currentServing) {
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Current Serving</Text>
                <View style={styles.card}>
                    <View style={styles.emptyContent}>
                        <MaterialIcons name="storefront" size={32} color="#ccc" style={{ marginBottom: 8 }} />
                        <Text style={styles.emptyTitle}>Ready to serve?</Text>

                        <TouchableOpacity style={styles.startButton} onPress={onStart}>
                            <Text style={styles.startButtonText}>Start Serving</Text>
                            <MaterialIcons name="arrow-forward" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Serving</Text>
            <View style={styles.card}>
                <View style={styles.contentRow}>
                    {/* Token Number */}
                    <View style={styles.tokenContainer}>
                        <Text style={styles.tokenLabel}>Token</Text>
                        <Text style={styles.tokenNumber}>{currentServing.daily_token_number}</Text>
                    </View>

                    {/* Details */}
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}>
                            <MaterialIcons name="person" size={16} color="#6750a4" />
                            <Text style={styles.detailText}>{currentServing.name}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <MaterialIcons name="phone" size={16} color="#6750a4" />
                            <Text style={styles.detailText}>{currentServing.phone}</Text>
                        </View>
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.actionsRow}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.skipButton]}
                        onPress={() => onSkip(currentServing.id)}
                    >
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.completeButton]}
                        onPress={() => onComplete(currentServing.id)}
                    >
                        <Text style={styles.completeText}>Complete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        padding: 16,
    },
    loadingCard: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 150, // Ensure consistent height during loading
    },
    // Empty State
    emptyContent: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    emptyTitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
        fontWeight: '500',
    },
    startButton: {
        backgroundColor: '#6750a4',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 8,
    },
    startButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    // Serving State
    contentRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    tokenContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 16,
        borderRightWidth: 1,
        borderRightColor: '#eee',
        minWidth: 60,
    },
    tokenLabel: {
        fontSize: 10,
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    tokenNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6750a4',
    },
    detailsContainer: {
        flex: 1,
        paddingLeft: 16,
        justifyContent: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    detailText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
        fontWeight: '500',
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
        paddingTop: 12,
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 6,
    },
    skipButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    completeButton: {
        backgroundColor: '#6750a4',
    },
    skipText: {
        color: '#666',
        fontWeight: '600',
        fontSize: 13,
    },
    completeText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 13,
    },
})

export default HomeCurrentServingCard
