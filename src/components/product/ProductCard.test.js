import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { useCart } from '../../context/CartContext';

jest.mock('../../context/CartContext');

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  images: ['test-image.jpg'],
  category: { name: 'Test Category' }
};

describe('ProductCard Component', () => {
  beforeEach(() => {
    useCart.mockReturnValue({
      isItemInCart: jest.fn().mockReturnValue(false),
      addToCart: jest.fn()
    });
  });

  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} isInCart={false} />);
    
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  test('calls addToCart when button is clicked', () => {
    const mockAddToCart = jest.fn();
    useCart.mockReturnValue({
      isItemInCart: jest.fn().mockReturnValue(false),
      addToCart: mockAddToCart
    });

    // render(<ProductCard product={mockProduct} isInCart={false} />);
    test('renders product information correctly', () => {
        render(React.createElement(ProductCard, { product: mockProduct, isInCart: false }));
      });
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('shows "Added" when product is in cart', () => {
    render(<ProductCard product={mockProduct} isInCart={true} />);
    expect(screen.getByText('Added')).toBeInTheDocument();
  });
});