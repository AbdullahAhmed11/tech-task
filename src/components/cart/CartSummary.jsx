import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart } from "react-icons/fa";

const CartSummary = () => {
  const { count, total } = useCart();
  const [isVisible, setIsVisible] = useState(true); 

  const toggleCartVisibility = () => {
    setIsVisible(prevState => !prevState); 
  }
  return (
    <div>
    {/* Show Cart Button */}
    {!isVisible && (
      <button 
        onClick={toggleCartVisibility} 
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-colors"
      >
        <FaShoppingCart />
      </button>
    )}

    {/* Cart Summary Card */}
    {isVisible && (
      <div className="fixed bottom-6 right-6 bg-white border border-gray-200 shadow-xl rounded-2xl p-5 w-full max-w-xs sm:max-w-md transition-all duration-300 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <FaShoppingCart className="text-green-600" />
          <h2 className="text-lg font-semibold text-gray-800">Cart Summary</h2>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Items in cart</span>
          <span className="font-semibold text-gray-800">{count}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-6">
          <span>Total</span>
          <span className="font-semibold text-gray-800">${total.toFixed(2)}</span>
        </div>

        <Link
          to="/cart"
          className="w-full p-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium text-center py-2 rounded-md transition-colors"
        >
          View Cart
        </Link>

        {/* Hide Cart Button */}
        <button
          onClick={toggleCartVisibility}
          className="w-full p-2 mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium text-center py-2 rounded-md transition-colors"
        >
          Hide Cart
        </button>
      </div>
    )}
  </div>
  );
};

export default React.memo(CartSummary)
