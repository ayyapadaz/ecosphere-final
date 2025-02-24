import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

async function createTestUsers() {
  const users = [
    { email: 'buyer@test.com', password: 'password123', role: 'buyer' },
    { email: 'creator@test.com', password: 'password123', role: 'creator' },
    { email: 'plant@test.com', password: 'password123', role: 'plant' }
  ];

  for (const user of users) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: user.email,
        role: user.role
      });
      console.log(`Created ${user.role} user:`, user.email);
    } catch (error) {
      console.error(`Error creating ${user.role} user:`, error);
    }
  }
}

createTestUsers(); 