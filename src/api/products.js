import axios from 'axios';

const API_BASE = 'https://api.escuelajs.co/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const ProductService = {
  async fetchProducts({ offset = 0, limit = 12, searchTerm = '', categoryId = '' }) {
    try {
      const params = {
        offset,
        limit,
      };

      if (searchTerm) {
        params.title = searchTerm;
      }

      if (categoryId) {
        params.categoryId = categoryId;
      }

      const response = await apiClient.get('/products', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  },

  async fetchCategories() {
    try {
      const response = await apiClient.get('/categories');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },
};