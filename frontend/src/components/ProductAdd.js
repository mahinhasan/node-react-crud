import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = ({ formData }) => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });

  useEffect(() => {
    if (formData) {
      setProductData(formData);
    }
  }, [formData]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add-product/", productData);
      setProductData({
        name: "",
        price: "",
        category: "",
        company: "",
      });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
