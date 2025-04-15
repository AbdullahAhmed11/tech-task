import React from 'react'
import { BrowserRouter as Router,} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CartSummary from './components/cart/CartSummary';
import AppRoutes from './routes/AppRoutes';
function App() {

  return (
    <Router>
    <CartProvider>
      <AppRoutes />
      <CartSummary />
    </CartProvider>
  </Router>
  )
}

export default App
