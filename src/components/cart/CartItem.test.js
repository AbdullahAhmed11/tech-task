import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './CartItem';

const mockItem = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  image: 'test-image.jpg',
  category: 'Test Category',
  quantity: 2
};

describe('CartItem Component', () => {
  test('renders product information correctly', () => {
    render(
      <CartItem 
        item={mockItem} 
        onRemove={jest.fn()} 
        onQuantityChange={jest.fn()} 
      />
    );

    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockItem.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(mockItem.category)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockItem.quantity.toString())).toBeInTheDocument();
  });

  test('calls onRemove when remove button is clicked', () => {
    const mockOnRemove = jest.fn();
    render(
      <CartItem 
        item={mockItem} 
        onRemove={mockOnRemove} 
        onQuantityChange={jest.fn()} 
      />
    );

    fireEvent.click(screen.getByText('Remove'));
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  test('calls onQuantityChange when quantity is updated', () => {
    const mockOnQuantityChange = jest.fn();
    render(
      <CartItem 
        item={mockItem} 
        onRemove={jest.fn()} 
        onQuantityChange={mockOnQuantityChange} 
      />
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '3' } });
    expect(mockOnQuantityChange).toHaveBeenCalledWith(3);
  });
});