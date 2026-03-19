import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './config'

export async function registerUser(email, password, username) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(cred.user, { displayName: username })
  await setDoc(doc(db, 'users', cred.user.uid), {
    username,
    email,
    cash: 10000,          // liquid CHF wallet
    portfolio: {},        // { [instrumentId]: { shares, districtId } }
    currentYear: 2007,    // game year
    unlockedAreas: [],
    completedQuizzes: [],
    totalScore: 0,
    xp: 0,
    streak: 0,
    createdAt: new Date().toISOString(),
  })
  return cred.user
}

export async function loginUser(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export function logoutUser() {
  return signOut(auth)
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback)
}

export async function getUserData(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}
