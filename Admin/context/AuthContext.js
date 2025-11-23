
import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider(props) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        AsyncStorage.getItem('user').then(u => {
          if (u) setUser(JSON.parse(u))
        })
      }
      setLoading(false)
    })
  }, [])

  function login(email, password) {
    return axios.post('http://localhost:4000/admin/login', { email, password })
      .then(res => {
        let token = res.data.data.token
        AsyncStorage.setItem('token', token)
        let u = { email }
        AsyncStorage.setItem('user', JSON.stringify(u))
        setUser(u)
        return { success: true }
      })
      .catch(e => {
        return { success: false, message: (e.response && e.response.data && e.response.data.message) || 'Login failed' }
      })
  }

  function signup(email, password, businessName) {
    return axios.post('http://localhost:4000/admin/register', { email, password, businessName })
      .then(res => {
        let token = res.data.data.token
        let admin = res.data.data.admin
        let business = res.data.data.business
        AsyncStorage.setItem('token', token)
        let u = { email: admin.email, businessName: business.name, businessId: business.id }
        AsyncStorage.setItem('user', JSON.stringify(u))
        setUser(u)
        return { success: true }
      })
      .catch(e => {
        return { success: false, message: (e.response && e.response.data && e.response.data.message) || 'Signup failed' }
      })
  }

  function logout() {
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('user')
    setUser(null)
  }
  
  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {props.children}
    </AuthContext.Provider>
  )
}
export function useAuth() {
  return useContext(AuthContext)
}
