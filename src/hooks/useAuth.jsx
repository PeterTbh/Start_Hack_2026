import { useState, useEffect, createContext, useContext } from 'react'
import { onAuthChange, getUserData } from '../firebase/auth'
import { checkDailyStreak } from '../firebase/firestore'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [streakData, setStreakData] = useState(null)

  useEffect(() => {
    // Safety net: if Firebase never calls back (network blocked etc), stop loading after 8 s
    const timeoutId = setTimeout(() => setLoading(false), 8000)

    const unsub = onAuthChange(async (firebaseUser) => {
      clearTimeout(timeoutId)
      setUser(firebaseUser)
      try {
        if (firebaseUser) {
          const data = await getUserData(firebaseUser.uid)
          setUserData(data)
          try {
            const streak = await checkDailyStreak(firebaseUser.uid)
            if (!streak.alreadyClaimed) setStreakData(streak)
          } catch (e) {
            console.error('Streak check failed:', e)
          }
        } else {
          setUserData(null)
          setStreakData(null)
        }
      } catch (err) {
        console.error('Auth data load error:', err)
        setUserData(null)
      } finally {
        setLoading(false)
      }
    })
    return () => { unsub(); clearTimeout(timeoutId) }
  }, [])

  const refreshUserData = async () => {
    if (user) {
      const data = await getUserData(user.uid)
      setUserData(data)
    }
  }

  return (
    <AuthContext.Provider value={{ user, userData, loading, refreshUserData, streakData, clearStreakData: () => setStreakData(null) }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
