import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

async function createTestUser() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, "test@example.com", "password123");
    const user = userCredential.user;
    
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: "creator"
    });
    
    console.log("Test user created successfully");
  } catch (error) {
    console.error("Error creating test user:", error);
  }
}

createTestUser(); 