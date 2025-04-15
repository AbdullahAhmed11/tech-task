import React from 'react';
import { Button } from '@mui/material';
import { useCart } from '../../context/CartContext';
const ProductCard = React.memo(({ product, isInCart }) => {
  const { addToCart } = useCart();

  return (
    <div className="rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden bg-white">
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={product.images[0] || '/placeholder-product.jpg'}
          alt={product.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-3">{product.description}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>

          <Button
            onClick={() => addToCart(product)}
            disabled={isInCart}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: isInCart ? '#E5E7EB' : '#2563EB',
              color: isInCart ? '#6B7280' : '#FFFFFF',
              '&:hover': {
                backgroundColor: isInCart ? '#E5E7EB' : '#1D4ED8',
              },
              borderRadius: '0.5rem',
              textTransform: 'none',
            }}
          >
            {isInCart ? 'Added' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
