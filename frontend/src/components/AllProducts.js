import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllProducts.css';
// import { Link } from 'react-router-dom';


const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  // update 
  const handleUpdate = (productId) => {
    window.location.href = `/update/${productId}`;
  };


  //Delete

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  
  
  return (
    <div className="all-products-container">
      <h2>All Products</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.company}</td>
              <td>
              <div className='button'>
                <p onClick={() => handleUpdate(product._id)}>Update</p>
                <br/>
                <p onClick={() => handleDelete(product._id)}>Delete</p>
                </div>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
