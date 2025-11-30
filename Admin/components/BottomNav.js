import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

export default function BottomNav({ current, setCurrent }) {
  return (
    <View style={styles.nav}>

      <TouchableOpacity style={styles.item} onPress={() => setCurrent('home')}>
        <MaterialIcons name="home" size={24} color={current === 'home' ? '#222' : '#aaa'} />
        <Text style={[styles.label, current === 'home' && styles.active]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => setCurrent('qr')}>
        <Ionicons name="qr-code-outline" size={24} color={current === 'qr' ? '#222' : '#aaa'} />
        <Text style={[styles.label, current === 'qr' && styles.active]}>QR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => setCurrent('history')}>
        <MaterialIcons name="history" size={24} color={current === 'history' ? '#222' : '#aaa'} />
        <Text style={[styles.label, current === 'history' && styles.active]}>History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => setCurrent('settings')}>
        <Ionicons name="settings-outline" size={24} color={current === 'settings' ? '#222' : '#aaa'} />
        <Text style={[styles.label, current === 'settings' && styles.active]}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 56,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  item: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
  active: {
    color: '#222',
    fontWeight: 'bold',
  },
})
