import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { CreatorsDashboard } from './pages/CreatorsDashboard';
import { PlantsDashboard } from './pages/PlantsDashboard';
import { LoginModal } from './components/LoginModal';
import { SignupModal } from './components/SignupModal';
import { RoleSelectionModal } from './components/RoleSelectionModal';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ChatProvider } from './contexts/ChatContext';
import { ChatButton } from './components/ChatButton';
import { ShoppingProvider } from './contexts/ShoppingContext';
import { Checkout } from './pages/Checkout';

type UserRole = 'buyer' | 'creator' | 'plant';

function App() {
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');

  const handleLoginClick = () => {
    setShowRoleSelection(true);
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowRoleSelection(false);
    setShowLogin(true);
  };

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <ChatProvider>
      <AuthProvider>
        <ShoppingProvider>
          <div className="min-h-screen bg-white">
            {showRoleSelection && (
              <RoleSelectionModal
                onClose={() => setShowRoleSelection(false)}
                onRoleSelect={handleRoleSelect}
              />
            )}
            {showLogin && (
              <LoginModal 
                onClose={() => setShowLogin(false)} 
                onSwitchToSignup={handleSwitchToSignup}
                selectedRole={selectedRole}
              />
            )}
            {showSignup && (
              <SignupModal 
                onClose={() => setShowSignup(false)}
                onSwitchToLogin={handleSwitchToLogin}
                selectedRole={selectedRole}
              />
            )}
            
            <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <Navbar onLoginClick={handleLoginClick} />
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </header>

            <main>
              <Routes>
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route 
                  path="/creators" 
                  element={
                    <ProtectedRoute requiredRole="creator">
                      <CreatorsDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/plants" 
                  element={
                    <ProtectedRoute requiredRole="plant">
                      <PlantsDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>

            <ChatButton />

            <footer className="bg-gray-900 text-white py-12">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">About Ecosphere</h4>
                    <p className="text-gray-400">Connecting waste treatment facilities with innovative creators and eco-conscious buyers.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="#" className="hover:text-white">About Us</a></li>
                      <li><a href="#" className="hover:text-white">How It Works</a></li>
                      <li><a href="#" className="hover:text-white">Marketplace</a></li>
                      <li><a href="#" className="hover:text-white">Partners</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Resources</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li><a href="#" className="hover:text-white">Blog</a></li>
                      <li><a href="#" className="hover:text-white">FAQ</a></li>
                      <li><a href="#" className="hover:text-white">Contact</a></li>
                      <li><a href="#" className="hover:text-white">Support</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                    <p className="text-gray-400 mb-4">Stay updated with our latest materials and opportunities.</p>
                    <div className="flex">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none"
                      />
                      <button className="bg-green-600 px-4 py-2 rounded-r hover:bg-green-700">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ShoppingProvider>
      </AuthProvider>
    </ChatProvider>
  );
}

export default App;