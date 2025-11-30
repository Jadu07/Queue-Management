import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { TextInput, Button, Text, HelperText } from 'react-native-paper'
import { useAuth } from '../context/AuthContext'
import { SvgXml } from 'react-native-svg'

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
        <SvgXml xml={logoXml} width={300} height={52} />
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

const logoXml = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="300.000000pt" height="52.000000pt" viewBox="0 0 300.000000 52.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.10, written by Peter Selinger 2001-2011
</metadata>
<g transform="translate(0.000000,52.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M1150 260 l0 -250 55 0 55 0 0 150 c0 83 3 150 8 150 4 0 58 -68 121
-150 l114 -150 49 0 48 0 0 250 0 250 -55 0 -55 0 0 -150 c0 -82 -3 -150 -7
-150 -5 1 -59 68 -121 150 l-113 150 -50 0 -49 0 0 -250z"/>
<path d="M1700 260 l0 -250 175 0 175 0 0 55 0 55 -115 0 -115 0 0 50 0 50
100 0 100 0 0 45 0 45 -100 0 -100 0 0 50 0 50 115 0 115 0 0 50 0 50 -175 0
-175 0 0 -250z"/>
<path d="M2106 498 c4 -7 40 -61 80 -119 l73 -105 -80 -115 c-115 -163 -111
-149 -34 -149 l66 0 57 90 c31 49 59 89 62 90 3 0 31 -41 62 -90 l57 -90 66 0
c78 0 81 -14 -33 149 l-80 115 65 95 c37 53 72 103 80 112 22 26 16 29 -52 29
l-64 0 -48 -75 c-27 -41 -50 -75 -53 -75 -3 0 -26 34 -52 75 l-47 75 -66 0
c-50 0 -64 -3 -59 -12z"/>
<path d="M2600 460 l0 -50 70 0 70 0 0 -200 0 -200 55 0 55 0 2 198 3 197 68
3 67 3 0 49 0 50 -195 0 -195 0 0 -50z"/>
<path d="M160 484 c-96 -42 -153 -127 -153 -229 0 -185 189 -301 354 -218 180
92 180 344 0 436 -63 31 -144 36 -201 11z"/>
<path d="M633 382 c64 -64 117 -122 117 -127 0 -5 -53 -63 -117 -127 l-118
-118 155 0 155 0 123 123 122 122 -123 123 -122 122 -155 0 -155 0 118 -118z"/>
</g>
</svg>`
