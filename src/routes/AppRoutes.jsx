import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductListingPage from '../pages/ProductListingPage';
import CartPage from '../pages/CartPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductListingPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default AppRoutes;
