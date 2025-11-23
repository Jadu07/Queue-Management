import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Image } from 'react-native'
import { TextInput, Button, Text, HelperText } from 'react-native-paper'
import { useAuth } from '../context/AuthContext'

export default function Signup({ onSwitch }) {
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { signup } = useAuth()


  const handleSignup = async () => {
    if (!businessName || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }


    setLoading(true)
    setError('')
    const result = await signup(email, password, businessName)
    setLoading(false)

    if (!result.success) {
      setError(result.message)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <View style={styles.logoUnderline} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.content, { marginTop: -50 }]}> 
          <Text variant="displaySmall" style={styles.title}>Create Account</Text>
          <Text variant="bodyLarge" style={styles.subtitle}>Start managing your queue</Text>
          <TextInput label="Business Name" value={businessName} onChangeText={setBusinessName} mode="outlined" style={styles.input} disabled={loading} left={<TextInput.Icon icon="store" />} />
          <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" style={styles.input} keyboardType="email-address" autoCapitalize="none" disabled={loading} left={<TextInput.Icon icon="email" />} />
          <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} mode="outlined" style={styles.input} disabled={loading} left={<TextInput.Icon icon="lock" />} right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />} />

          {error ? <HelperText type="error" visible={true}>{error}</HelperText> : null}
          <Button mode="contained" onPress={handleSignup} style={styles.button} loading={loading} disabled={loading}>Sign Up</Button>
          <View style={styles.footer}>
            <Text variant="bodyMedium">Already have an account? </Text>
            <Button onPress={onSwitch} disabled={loading}>Login</Button>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  content: { 
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
  logo: {
    width: 340,
    height: 220,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 0,
  },
  logoUnderline: {
    width: 200,
    height: 4,
    backgroundColor: '#222',
    alignSelf: 'center',
    borderRadius: 2,
    marginBottom: 10,
  }
})
