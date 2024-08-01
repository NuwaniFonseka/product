import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductForm.css"; 

const ProductForm = ({ productId, onSave }) => {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:3000/api/products/${productId}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error("Error fetching product:", error));
    } else {
      // Clear form for creating a new product
      setProduct({
        name: "",
        quantity: "",
        price: "",
        image: "",
      });
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productId) {
      axios
        .put(`http://localhost:3000/api/products/${productId}`, product)
        .then((response) => {
          onSave(response.data);
        })
        .catch((error) => console.error("Error updating product:", error));
    } else {
      axios
        .post("http://localhost:3000/api/products", product)
        .then((response) => {
          onSave(response.data);
        })
        .catch((error) => console.error("Error creating product:", error));
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{productId ? "Update Product" : "Create Product"}</h2>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        type="number"
        name="quantity"
        value={product.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="image"
        value={product.image}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button type="submit">{productId ? "Update" : "Create"} Product</button>
    </form>
  );
};

export default ProductForm;
