import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthScreen from './screens/AuthScreen';
import HomePage from './screens/HomePage';
import BottomNav from './components/BottomNav';
import QRScreen from './screens/QRScreen';
import Settings from './screens/Settings';
import History from './screens/History';

function AppContent() {
  const { user, loading } = useAuth();

  const [tab, setTab] = useState('home');

  useEffect(() => {
    if (user) setTab('home');
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <AuthScreen />
        <StatusBar style="auto" />
      </View>
    );
  }

  let Screen = null;
  if (tab === 'home') Screen = <HomePage />;
  else if (tab === 'qr') Screen = <QRScreen />;
  else if (tab === 'history') Screen = <History />;
  else if (tab === 'settings') Screen = <Settings />;
  return (

    <View style={styles.container}>
      <View style={{ flex: 1 }}>{Screen}</View>
      <BottomNav current={tab} setCurrent={setTab} />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});
