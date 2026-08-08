import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Helper: Merges API data with Manual LocalStorage Data
   * Task 1 & Manual Requirement
   */
  const mergeWithLocal = (apiData) => {
    const localData = JSON.parse(localStorage.getItem('my_products')) || [];
    // Ensure no duplicates if the user re-fetches
    const filteredLocal = localData.filter(lp => !apiData.some(ap => ap.id === lp.id));
    return [...filteredLocal, ...apiData];
  };

  /**
   * Task 1 & 9: Fetch Products with Pagination
   */
  const fetchProducts = async (offset = 0, limit = 10) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/products', {
        params: { offset, limit }
      });
      const merged = mergeWithLocal(res.data);
      setProducts(merged);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Task 2: Fetch Categories for Sidebar/Scroll
   */
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  /**
   * Task 3: Category-based Products
   */
  const filterByCategory = async (id) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/products', {
        params: { categoryId: id }
      });
      setProducts(mergeWithLocal(res.data));
    } catch (error) {
      console.error("Error filtering products:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Task 5: Search Functionality
   */
  const searchProducts = async (title) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/products', {
        params: { title }
      });
      setProducts(mergeWithLocal(res.data));
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Task 10: Sorting Logic (Client-side)
   */
  const sortProducts = (type) => {
    const sorted = [...products];
    if (type === 'lowToHigh') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === 'highToLow') {
      sorted.sort((a, b) => b.price - a.price);
    }
    setProducts(sorted);
  };

  /**
   * Custom Requirement: Add Manual Product to LocalStorage
   */
  const addManualProduct = (newProduct) => {
    const localData = JSON.parse(localStorage.getItem('my_products')) || [];
    const updatedLocal = [newProduct, ...localData];
    localStorage.setItem('my_products', JSON.stringify(updatedLocal));
    // Immediately update UI by adding it to the current state
    setProducts(prev => [newProduct, ...prev]);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <ProductContext.Provider value={{ 
      products, 
      categories, 
      loading, 
      fetchProducts, 
      filterByCategory, 
      searchProducts, 
      sortProducts, 
      addManualProduct 
    }}>
      {children}
    </ProductContext.Provider>
  );
};