import { Recycle, LogOut, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart } from './ShoppingCart';
import { useShopping } from '../contexts/ShoppingContext';

type NavbarProps = {
  onLoginClick: () => void;
};

export function Navbar({ onLoginClick }: NavbarProps) {
  const { user, signOut } = useAuth();
  const { favorites } = useShopping();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <Recycle className="h-8 w-8" />
        <span className="text-xl font-bold">Ecosphere</span>
      </Link>
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/marketplace" className="hover:text-green-200">
          Marketplace
        </Link>
        {user ? (
          <>
            <span className="text-green-200">
              {user.email}
            </span>
            <button 
              onClick={handleSignOut}
              className="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </>
        ) : (
          <button 
            onClick={onLoginClick}
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50"
          >
            Login
          </button>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/favorites" className="relative p-2 text-white hover:text-green-200 transition-colors">
          <Heart className="h-6 w-6" />
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-green-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </Link>
        <ShoppingCart />
      </div>
    </nav>
  );
}