import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, ScrollView, StatusBar } from 'react-native'
import { useAuth } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import HomeBusinessCardHeader from '../components/home_BusinessCardHeader'
import HomeStatisticsCards from '../components/home_StatisticsCards'
import HomeQuickActionsCard from '../components/home_QuickActionsCard'

export default function HomePage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      const response = await axios.get('http://localhost:4000/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(response.data.data)
    }
    setLoading(false) 
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6750a4" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6750a4" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HomeBusinessCardHeader user={user} />
        <HomeStatisticsCards stats={stats} />
        <HomeQuickActionsCard />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 60,
  },
})