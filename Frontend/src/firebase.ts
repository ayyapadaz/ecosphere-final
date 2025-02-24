import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPydVVdnzBM_-FmUjUBssGRXWI_cF53ek",
  authDomain: "ecosphere-59cc0.firebaseapp.com",
  projectId: "ecosphere-59cc0",
  storageBucket: "ecosphere-59cc0.appspot.com",
  messagingSenderId: "104746909273",
  appId: "1:104746909273:web:df516e7f588250a5683b48",
  measurementId: "G-XTD087JHNF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Comment out the test user creation for now
/*
const createTestUser = async (email: string, password: string, role: string) => {
  try {
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    const { doc, setDoc } = await import('firebase/firestore');
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: role
    });
    
    console.log(`Test ${role} user created:`, user);
  } catch (error) {
    console.error(`Error creating ${role} user:`, error);
  }
};

createTestUser("buyer@test.com", "password123", "buyer");
createTestUser("creator@test.com", "password123", "creator");
createTestUser("plant@test.com", "password123", "plant");
*/ 