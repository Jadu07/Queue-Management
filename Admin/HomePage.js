import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAuth } from './context/AuthContext';

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.welcome}>
        Welcome!
      </Text>
      <Text variant="bodyLarge" style={styles.email}>
        {user?.email}
      </Text>
      {user?.businessName && (
        <Text variant="titleMedium" style={styles.business}>
          {user.businessName}
        </Text>
      )}
      <Button 
        mode="outlined" 
        onPress={logout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  welcome: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  email: {
    marginBottom: 8,
    opacity: 0.7,
  },
  business: {
    marginBottom: 32,
    color: '#6200ee',
  },
  logoutButton: {
    marginTop: 16,
  },
});
