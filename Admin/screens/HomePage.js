import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, ScrollView, StatusBar } from 'react-native'
import { useAuth } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import HomeBusinessCardHeader from '../components/home_BusinessCardHeader'
import HomeStatisticsCards from '../components/home_StatisticsCards'
import HomeQuickActionsCard from '../components/home_QuickActionsCard'
import HomeCurrentServingCard from '../components/home_CurrentServingCard'

export default function HomePage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

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

  const handleAction = async (action, id) => {
    if (actionLoading) return
    setActionLoading(true)

    try {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        const headers = { Authorization: `Bearer ${token}` }
        await axios.post(`http://localhost:4000/admin/${action}/${id}`, {}, { headers })

        try {
          await axios.post('http://localhost:4000/admin/next', {}, { headers })
        } catch (error) {
          if (error.response?.status === 404) {
            alert("No customers waiting")
          }
        }
        await fetchStats()
      }
    } catch (error) {
      console.error(error)
    }
    setActionLoading(false)
  }

  const handleStartServing = async () => {
    if (actionLoading) return
    setActionLoading(true)

    try {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        await axios.post('http://localhost:4000/admin/next', {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        await fetchStats()
      }
    } catch (error) {
      if (error.response?.status === 404) {
        alert("No customers waiting")
      }
    }
    setActionLoading(false)
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

        <HomeCurrentServingCard
          currentServing={stats?.currentServing}
          onSkip={(id) => handleAction('skip', id)}
          onComplete={(id) => handleAction('complete', id)}
          onStart={handleStartServing}
          loading={actionLoading}
        />

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