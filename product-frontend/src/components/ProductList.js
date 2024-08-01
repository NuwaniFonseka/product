import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm.js";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleSave = () => {
    setSelectedProduct(null);
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div>
      <div className="product-form-container">
        <ProductForm productId={selectedProduct} onSave={handleSave} />
      </div>
      <div className="product-list">
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <div>
                <h3>{product.name}</h3>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ${product.price}</p>
                  <img src={product.image} alt={product.name} />
                <br></br>
                <br></br>
                <button
                  className="edit"
                  onClick={() => setSelectedProduct(product._id)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
