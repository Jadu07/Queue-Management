import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { TextInput, Button, Text, HelperText } from 'react-native-paper'
import { useAuth } from '../context/AuthContext'

export default function Login({ onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    setError('')
    const result = await login(email, password)
    setLoading(false)
    if (!result.success) {
      setError(result.message)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/onext.png')}
          style={{ width: 300, height: 52, resizeMode: 'contain' }}
        />
      </View>
      <View style={[styles.content, { marginTop: -20 }]}>

        <Text variant="displaySmall" style={styles.title}>Welcome Back</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>Sign in to your account</Text>

        <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" style={styles.input} keyboardType="email-address" autoCapitalize="none" disabled={loading} left={<TextInput.Icon icon="email" />} />

        <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry={true} mode="outlined" style={styles.input} disabled={loading} left={<TextInput.Icon icon="lock" />} />

        {error ? <HelperText type="error" visible={true}>{error}</HelperText> : null}
        <Button mode="contained" onPress={handleLogin} style={styles.button} loading={loading} disabled={loading}> Login </Button>

        <View style={styles.footer}>
          <Text variant="bodyMedium">Don't have an account? </Text>
          <Button onPress={onSwitch} disabled={loading}>Sign Up</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%'
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    marginBottom: 32,
    textAlign: 'center',
    opacity: 0.7
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white'
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
    paddingVertical: 6
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
  }
})


