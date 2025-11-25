import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Chip } from 'react-native-paper'

const HomeBusinessCardHeader = ({ user }) => {
  return (
    <View style={[styles.headerCard, { backgroundColor: '#6750a4' }]}>
      <View style={styles.headerContent}>
        <Text style={styles.businessTitle}>{user?.businessName || 'Business Dashboard'}</Text>
        <Chip style={styles.statusChip} textStyle={styles.chipText}>Active</Chip>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerCard: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  businessTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  statusChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
  },
  chipText: {
    color: 'white',
    fontSize: 12,
  },
})

export default HomeBusinessCardHeader