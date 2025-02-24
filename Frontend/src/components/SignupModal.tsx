import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn } from 'lucide-react';

type SignupModalProps = {
  onClose: () => void;
  onSwitchToLogin: () => void;
  selectedRole: 'buyer' | 'creator' | 'plant';
};

export function SignupModal({ onClose, onSwitchToLogin, selectedRole }: SignupModalProps) {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      await signUp(email, password, selectedRole);
      handleSuccessfulSignup();
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle(selectedRole);
      handleSuccessfulSignup();
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessfulSignup = () => {
    switch (selectedRole) {
      case 'buyer':
        navigate('/marketplace');
        break;
      case 'creator':
        navigate('/creators');
        break;
      case 'plant':
        navigate('/plants');
        break;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <LogIn className="h-5 w-5" />
              Sign up with Google
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <div className="text-center text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-green-600 hover:underline"
              >
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 