import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import ProductForm from './pages/ProductForm';
import productService from './services/ProductService';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productService.getProducts();
        setProducts(productsData);
      } catch (error) {
        setError(error);
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>There was an error fetching the products! {error.message}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}:{product.stock} ${product.price}</li>
        ))}
      </ul>
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
