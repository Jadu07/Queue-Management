import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { Button } from 'react-native-paper'

export default function Settings() {
  const { logout, user } = useAuth()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Button mode="contained" onPress={logout} style={styles.signout}>Sign Out</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 32,
  },
  signout: {
    width: 120,
  },
})
