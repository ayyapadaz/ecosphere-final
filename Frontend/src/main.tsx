import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Create test users
async function setupTestUsers() {
  const users = [
    { email: 'creator@test.com', password: 'password123', role: 'creator' },
    { email: 'buyer@test.com', password: 'password123', role: 'buyer' },
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
    } catch (error: any) {
      // Skip if user already exists
      if (error.code !== 'auth/email-already-in-use') {
        console.error(`Error creating ${user.role} user:`, error);
      }
    }
  }
}

// Run setup once
setupTestUsers();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);