import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const CategoryList = () => {
  const { categories, filterByCategory, fetchProducts } = useContext(ProductContext);

  return (
    <div style={styles.container}>
      {/* "All" button to Task 1: Fetch Products List */}
      <button onClick={() => fetchProducts()} style={styles.catBtn}>
        All
      </button>
      
      {/* Task 2: Fetch Categories & Task 3: Category-based Products */}
      {categories.map(cat => (
        <button 
          key={cat.id} 
          onClick={() => filterByCategory(cat.id)} 
          style={styles.catBtn}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: { 
    display: 'flex', 
    gap: '15px', 
    // Task 2: Horizontal scroll implementation
    overflowX: 'auto', 
    padding: '20px 5%', 
    whiteSpace: 'nowrap', 
    backgroundColor: '#121212',
    // Ensures the scrollbar is visible/usable
    msOverflowStyle: 'thin',  /* IE and Edge */
    scrollbarWidth: 'thin',   /* Firefox */
    WebkitOverflowScrolling: 'touch' /* Smooth scrolling on iOS */
  },
  catBtn: { 
    padding: '10px 20px', 
    borderRadius: '20px', 
    border: '1px solid #ffffff', 
    background: '#ffffff', 
    color: '#1a1a1a',      
    cursor: 'pointer', 
    flexShrink: 0, // CRITICAL: Prevents buttons from squishing
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease'
  }
};


export default CategoryList;