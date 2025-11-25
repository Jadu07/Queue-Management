import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

const HomeStatisticsCards = ({ stats }) => {
  if (!stats) return null;

  return (
    <View style={styles.statsSection}>
      <Text style={styles.sectionTitle}>Today's Statistics</Text>
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: '#ff980010' }]}>
          <View style={styles.statContent}>
            <View style={[styles.statIcon, { backgroundColor: '#ff9800' }]}>
              <MaterialIcons name="schedule" size={20} color="white" />
            </View>
            <Text style={[styles.statNumber, { color: '#ff9800' }]}>{stats.waiting}</Text>
            <Text style={styles.statLabel}>Waiting</Text>
          </View>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#2196f310' }]}>
          <View style={styles.statContent}>
            <View style={[styles.statIcon, { backgroundColor: '#2196f3' }]}>
              <MaterialIcons name="person" size={20} color="white" />
            </View>
            <Text style={[styles.statNumber, { color: '#2196f3' }]}>{stats.serving}</Text>
            <Text style={styles.statLabel}>Serving</Text>
          </View>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#4caf5010' }]}>
          <View style={styles.statContent}>
            <View style={[styles.statIcon, { backgroundColor: '#4caf50' }]}>
              <MaterialIcons name="check-circle" size={20} color="white" />
            </View>
            <Text style={[styles.statNumber, { color: '#4caf50' }]}>{stats.completedToday}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  statsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statContent: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});

export default HomeStatisticsCards