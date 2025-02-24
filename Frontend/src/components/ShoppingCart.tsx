import { useState } from 'react';
import { X, ShoppingCart as CartIcon, Minus, Plus, Trash2 } from 'lucide-react';
import { useShopping } from '../contexts/ShoppingContext';
import { useNavigate } from 'react-router-dom';

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart, 
    cartTotal,
    cartItemsCount
  } = useShopping();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Cart Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
      >
        <CartIcon className="h-6 w-6" />
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemsCount}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <CartIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex border-b pb-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0"></div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                        <p className="text-gray-500 text-sm">{item.creator}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-bold text-xl">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
                {cart.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="w-full py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 