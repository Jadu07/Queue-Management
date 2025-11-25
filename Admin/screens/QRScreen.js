import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useAuth } from '../context/AuthContext'
import QRCode from 'react-native-qrcode-svg'

export default function QRScreen() {
  const { user } = useAuth()
  const url = `https://queue-management-ten.vercel.app/${user.businessId}`

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JOINING CODE</Text>
      <Text style={styles.subtitle}>Scan this QR code to join the queue</Text>
      <QRCode value={url} size={300} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  url: {
    fontSize: 14,
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center',
  },
})
