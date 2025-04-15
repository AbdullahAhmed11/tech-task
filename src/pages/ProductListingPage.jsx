import React, { useEffect, useState, useCallback } from 'react';
import ProductCard from '../components/product/ProductCard';
import Pagination from '../components/common/Pagination';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorMessage from '../components/common/ErrorMessage';
import { useCart } from "../context/CartContext";
import { useDebounce } from '../hooks/useDebounce';
import { ProductService } from '../api/products';

const ProductListingPage = () => {
  const [state, setState] = useState({
    products: [],
    categories: [],
    loading: true,
    error: null,
    searchTerm: '',
    selectedCategory: '',
    pagination: {
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 12,
    }
  });

  const { isItemInCart } = useCart();
  const debouncedSearchTerm = useDebounce(state.searchTerm, 500);

  const { products, categories, loading, error, pagination } = state;
  const hasFilters = state.searchTerm || state.selectedCategory;

  // Fetch categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await ProductService.fetchCategories();
        setState(prev => ({ ...prev, categories: data }));
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };

    loadCategories();
  }, []);

  // Fetch products when dependencies change
  const fetchProducts = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const offset = (state.pagination.currentPage - 1) * state.pagination.itemsPerPage;
      const data = await ProductService.fetchProducts({
        offset,
        limit: state.pagination.itemsPerPage,
        searchTerm: debouncedSearchTerm,
        categoryId: state.selectedCategory
      });

      setState(prev => ({
        ...prev,
        products: data,
        pagination: {
          ...prev.pagination,
          totalPages: data.length < prev.pagination.itemsPerPage 
            ? prev.pagination.currentPage 
            : prev.pagination.currentPage + 1,
        },
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'An unknown error occurred'
      }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [
    state.pagination.currentPage, 
    state.pagination.itemsPerPage,
    debouncedSearchTerm,
    state.selectedCategory
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Event handlers
  const handlePageChange = (page) => {
    setState(prev => ({
      ...prev,
      pagination: { ...prev.pagination, currentPage: page }
    }));
  };

  const handleSearchChange = (e) => {
    setState(prev => ({
      ...prev,
      searchTerm: e.target.value,
      pagination: { ...prev.pagination, currentPage: 1 }
    }));
  };

  const handleCategoryChange = (e) => {
    setState(prev => ({
      ...prev,
      selectedCategory: e.target.value,
      pagination: { ...prev.pagination, currentPage: 1 }
    }));
  };

  const resetFilters = () => {
    setState(prev => ({
      ...prev,
      searchTerm: '',
      selectedCategory: '',
      pagination: { ...prev.pagination, currentPage: 1 }
    }));
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Explore Our Products</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={state.searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search products"
          />
        </div>
        
        <div className="w-full md:w-64">
          <select
            value={state.selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        {hasFilters && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            aria-label="Reset filters"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {loading && pagination.currentPage === 1 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: pagination.itemsPerPage }).map((_, idx) => (
            <LoadingSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isInCart={isItemInCart(product.id)}
                  />
                ))}
              </div>

              <div className="flex justify-center mt-10">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
              {hasFilters && (
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListingPage;