import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAF7S52MyzAI1v6XMz0dl0XL14HIgz5v44",
  authDomain: "andriy-city.firebaseapp.com",
  projectId: "andriy-city",
  storageBucket: "andriy-city.firebasestorage.app",
  messagingSenderId: "781458552071",
  appId: "1:781458552071:web:89782549dab8d2105981a2"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
