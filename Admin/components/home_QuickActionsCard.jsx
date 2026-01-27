import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const HomeQuickActionsCard = () => {
  const [nextEntry, setNextEntry] = useState(null)
  const { backend_link } = useAuth()

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        const response = await axios.get(`${backend_link}/admin/next-entry`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setNextEntry(response.data.data)
      }
    })()
  }, [])

  return (
    <View style={styles.actionsSection}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <View style={styles.actionCard}>
          <MaterialIcons name="person" size={32} color="#6750a4" style={{ marginBottom: 8 }} />
          <Text style={styles.actionText}>Call Next</Text>
        </View>
        <View style={[styles.actionCard, styles.scanQRCard]}>
          <Text style={styles.heading}>Next Entry</Text>
          <View style={styles.entryRow}>
            <MaterialIcons name="person" size={16} color="#6750a4" />
            <Text style={styles.nameText}>{nextEntry ? nextEntry.name : 'No one waiting'}</Text>
          </View>
          {nextEntry && (
            <View style={styles.entryRow}>
              <MaterialIcons name="phone" size={16} color="#6750a4" />
              <Text style={styles.phoneText}>{nextEntry.phone}</Text>
            </View>
          )}
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  actionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  scanQRCard: {
    flex: 2,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginTop: 8,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  nameText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    marginLeft: 6,
  },
  phoneText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
});

export default HomeQuickActionsCard