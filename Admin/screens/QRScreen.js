import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { Button } from 'react-native-paper'
import { useAuth } from '../context/AuthContext'
import QRCode from 'react-native-qrcode-svg'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'

export default function QRScreen() {
  const { user } = useAuth()
  const url = `https://queue-management-ten.vercel.app/${user.businessId}`

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="margin: 0; padding: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; text-align: center;">
        <h1 style="font-size: 40px; margin-bottom: 40px;">${user.businessName || 'Join Queue'}</h1>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(url)}" width="500" height="500" />
        <p style="font-size: 24px; margin-top: 40px; margin-bottom: 20px;">Scan to join the queue</p>
        <p style="font-size: 18px; color: #666;">Or click the link below:</p>
        <a href="${url}" style="font-size: 20px; color: #007bff; text-decoration: none; margin-top: 10px;">${url}</a>
      </body>
    </html>
  `

  const handlePrint = async () => {
    await Print.printAsync({ html: htmlContent })
  }

  const handleShare = async () => {
    const { uri } = await Print.printToFileAsync({ html: htmlContent })
    await Sharing.shareAsync(uri)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>JOINING CODE</Text>
      <Text style={styles.subtitle}>Scan this QR code to join the queue</Text>
      <QRCode value={url} size={300} />

      <Text style={styles.url}>{url}</Text>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleShare} style={styles.button} icon="share-variant">
          Share
        </Button>
        <Button mode="contained" onPress={handlePrint} style={styles.button} icon="printer">
          Print
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 15,
  },
  button: {
    minWidth: 120,
  },
  url: {
    fontSize: 14,
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center',
  },
})
