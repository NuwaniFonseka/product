import React from "react";
//import ProductForm from './components/ProductForm.js';
import ProductList from "./components/ProductList.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Management</h1>
        <ProductList />
      </header>
    </div>
  );
}

export default App;
