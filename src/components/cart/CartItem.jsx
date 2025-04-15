import React from 'react';



const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    onQuantityChange(newQuantity);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 border-b py-4">
      <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
        <img
          src={item.image || '/placeholder-product.jpg'}
          alt={item.title}
          className="object-cover rounded-md"
          sizes="(max-width: 640px) 100vw, 150px"
        />
      </div>

      <div className="flex-grow">
        <h3 className="font-medium text-lg">{item.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
        <p className="text-gray-500 text-sm mt-1">Category: {item.category}</p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
          <span className="text-gray-500">x</span>
          <select
            value={item.quantity}
            onChange={handleQuantityChange}
            className="border rounded p-1 w-16 text-center"
            aria-label="Quantity"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onRemove}
          className="text-red-600 hover:text-red-800 text-sm mt-2"
          aria-label="Remove item"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default React.memo(CartItem);