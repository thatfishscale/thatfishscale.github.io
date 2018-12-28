import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

let config = {
  apiKey: "AIzaSyAhNsJSMss4f1Hfn2Oi1YV-EB2rLOQuA24",
  authDomain: "tbaahp-91cb5.firebaseapp.com",
  databaseURL: "https://tbaahp-91cb5.firebaseio.com",
  projectId: "tbaahp-91cb5",
  storageBucket: "tbaahp-91cb5.appspot.com",
  messagingSenderId: "286210254393"
}

!Firebase.apps.length ? Firebase.initializeApp(config) : ''

export const auth = Firebase.auth()
export const db = Firebase.database()

export default Firebase
