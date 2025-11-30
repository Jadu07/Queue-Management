import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Text, IconButton, ActivityIndicator } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import { useAuth } from '../context/AuthContext'

const HomeWaitingList = ({ refreshTrigger }) => {
    const { backend_link } = useAuth()
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    const [prioritizingId, setPrioritizingId] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            if (!token) return setLoading(false)
            axios.get(`${backend_link}/admin/waiting`, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => setList(res.data.data))
                .catch(() => { })
                .finally(() => setLoading(false))
        })
    }, [refreshTrigger])

    const prioritize = async (id) => {
        setPrioritizingId(id)
        const token = await AsyncStorage.getItem('token')
        await axios.post(`${backend_link}/admin/prioritize/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
        const res = await axios.get(`${backend_link}/admin/waiting`, { headers: { Authorization: `Bearer ${token}` } })
        setList(res.data.data)
        setPrioritizingId(null)
    }

    if (loading && !list.length) return <View style={styles.section}><Text style={styles.title}>Waiting List</Text><View style={styles.emptyBox}><ActivityIndicator animating={true} color="#6750a4" /></View></View>

    return (
        <View style={styles.section}>
            <Text style={styles.title}>Waiting List</Text>
            {!list.length ? (
                <View style={styles.emptyBox}><Text style={styles.empty}>No one is waiting</Text></View>
            ) : (
                <View style={styles.list}>
                    <FlatList data={list} keyExtractor={i => i.id.toString()} scrollEnabled={false} renderItem={({ item, index }) => (
                        <View style={styles.row}>
                            <View style={styles.badge}><Text style={styles.badgeTxt}>{item.daily_token_number}</Text></View>
                            <View style={styles.info}><Text style={styles.name}>{item.name}</Text><Text style={styles.phone}>{item.phone}</Text></View>
                            {index > 0 && (
                                <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    {prioritizingId === item.id ? (
                                        <ActivityIndicator animating={true} color="#6750a4" size={24} />
                                    ) : (
                                        <IconButton icon="arrow-up-bold-circle" iconColor="#6750a4" size={24} onPress={() => prioritize(item.id)} />
                                    )}
                                </View>
                            )}
                        </View>
                    )} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    section: { marginBottom: 24 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
    list: { backgroundColor: 'white', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#f0f0f0' },
    row: { flexDirection: 'row', alignItems: 'center', padding: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5', backgroundColor: 'white' },
    badge: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f3e5f5', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    badgeTxt: { fontSize: 16, fontWeight: 'bold', color: '#6750a4' },
    info: { flex: 1, justifyContent: 'center' },
    name: { fontSize: 16, fontWeight: '600', color: '#1c1b1f', marginBottom: 2 },
    phone: { fontSize: 13, color: '#666' },
    emptyBox: { padding: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 16, borderWidth: 1, borderColor: '#f0f0f0' },
    empty: { color: '#888', fontSize: 14 },
})

export default HomeWaitingList
