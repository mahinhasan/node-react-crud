import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const params = useParams();
  const navigateHome = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/update/${params.id}`);
        console.log("Fetched data:", response.data); // Log fetched data
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        // Handle error here
      }
    };
  
    fetchData();
  }, [params.id]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/update/${params.id}`, productData);
      alert("Product updated successfully!");
      navigateHome('/');
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Company:
          <input
            type="text"
            name="company"
            value={productData.company}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Update</button>
        <p>If don't want update <Link to={'/'}>Go to Home</Link></p>
      </form>
    </div>
  );
};

export default UpdateProduct;
