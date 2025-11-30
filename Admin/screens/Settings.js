import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.mainCard} elevation={2}>
          <Surface style={[styles.profileCard, { backgroundColor: theme.colors.primary }]} elevation={0}>
            <Text variant="headlineMedium" style={styles.businessName}>
              {user?.businessName || 'Business Name'}
            </Text>
            <Text variant="bodyLarge" style={styles.email}>
              {user?.email || 'admin@example.com'}
            </Text>
          </Surface>

          <Button
            mode="contained"
            onPress={logout}
            buttonColor={theme.colors.error}
            icon="logout"
            contentStyle={{ paddingVertical: 8 }}
            style={styles.logoutButton}
          >
            Logout
          </Button>
        </Surface>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mainCard: {
    width: '100%',
    maxWidth: 350,
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profileCard: {
    width: '100%',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  businessName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: 'white',
  },
  email: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  logoutButton: {
    width: '100%',
    borderRadius: 12,
  }
});
