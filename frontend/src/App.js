import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Home from './pages/Home';
//import Product from './pages/Product';
//import Cart from './pages/Cart';
//import ProductList from './pages/ProductList';
//import ProductDetails from './pages/ProductDetails';
//import ProductForm from './pages/ProductForm';
import ProductService from './services/ProductService';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', stock: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsData = await ProductService.getProducts();
      setProducts(productsData);
    } catch (error) {
      setError(error);
      console.error('Error fetching products:', error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      await ProductService.createProduct(newProduct);
      setNewProduct({name: '', description: '',price: '', stock: ''});
      fetchProducts();
    } catch (error) {
      setError(error);
      console.error('Error creating product:', error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      if (selectedProduct) {
        await ProductService.updateProduct(selectedProduct.id, selectedProduct);
        setSelectedProduct(null);
        fetchProducts();
      }
    } catch (error) {
      setError(error);
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await ProductService.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      setError(error);
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      {error && <div>There was an error: {error.message}</div>}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.description} ${product.price} : {product.stock} 
            <button onClick={() => setSelectedProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Create Product</h2>
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Stock"
        value={newProduct.stock}
        onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
      />
      <button onClick={handleCreateProduct}>Create</button>

      {selectedProduct && (
        <div>
          <h2>Edit Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={selectedProduct.name}
            onChange={e => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={selectedProduct.description}
            onChange={e => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={selectedProduct.price}
            onChange={e => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            value={selectedProduct.stock}
            onChange={e => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
          />
          <button onClick={handleUpdateProduct}>Update</button>
        </div>
      )}
    </div>
  );
}

/*
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddProduct" element={<ProductForm />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" exact component={ProductList} />
        <Route path="/product/:id" component={ProductDetails} />
      </Routes>
    </Router>
  );
}
*/
export default App;
