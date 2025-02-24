import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  creator: string;
  category: string;
  rating: number;
  materials: string[];
  sustainabilityScore: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface ShoppingContextType {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
  isInCart: (productId: string) => boolean;
  isFavorite: (productId: string) => boolean;
  cartTotal: number;
  cartItemsCount: number;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export function ShoppingProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Load cart and favorites from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('ecosphere-cart');
    const savedFavorites = localStorage.getItem('ecosphere-favorites');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  // Update localStorage when cart or favorites change
  useEffect(() => {
    localStorage.setItem('ecosphere-cart', JSON.stringify(cart));
    
    // Calculate cart total and count
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartItemsCount(count);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ecosphere-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(item => item.id === product.id);
      
      if (isAlreadyFavorite) {
        return prevFavorites.filter(item => item.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const isInCart = (productId: string) => {
    return cart.some(item => item.id === productId);
  };

  const isFavorite = (productId: string) => {
    return favorites.some(item => item.id === productId);
  };

  return (
    <ShoppingContext.Provider 
      value={{ 
        cart, 
        favorites, 
        addToCart, 
        removeFromCart, 
        updateCartItemQuantity, 
        clearCart, 
        toggleFavorite, 
        isInCart, 
        isFavorite,
        cartTotal,
        cartItemsCount
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShopping() {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
} 