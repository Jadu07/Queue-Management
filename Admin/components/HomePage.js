import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { user, logout } = useAuth()

  return (
    <View style={styles.container}>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5'}
})
