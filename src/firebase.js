// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc
} from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC2a2-wrtk-eKvuMNIUtWMHMNNok0RrouE',
  authDomain: 'hepilo-replica.firebaseapp.com',
  projectId: 'hepilo-replica',
  storageBucket: 'hepilo-replica.appspot.com',
  messagingSenderId: '980267712856',
  appId: '1:980267712856:web:294599946427486420a52d'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
export const colRef = (col) => collection(firestore, col)
export const docRef = (col, id) => doc(firestore, col, id)

const provider = new GoogleAuthProvider()
export const auth = getAuth(app)

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider)

  return {
    credentials: GoogleAuthProvider.credentialFromResult(result),
    user: result.user
  }
}

export const fetchCol = async (col) => {
  return await getDocs(collection(firestore, col))
}

export const fetchDoc = async (col, id) => {
  return await getDoc(docRef(col, id))
}

export const createDoc = async (col, data) => {
  try {
    const doc = await addDoc(colRef(col), data)
    return doc
  } catch (error) {
    console.error(error)
  }
}

export const editDoc = async (col, id, data) => {
  try {
    return await setDoc(docRef(col, id), data)
  } catch (error) {
    console.error(error)
  }
}
export const delDoc = (col, id) => {
  deleteDoc(docRef(col, id))
}
export { firestore }
