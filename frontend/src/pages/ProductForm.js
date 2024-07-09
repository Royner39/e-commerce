// ProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/products', product)
      .then(response => {
        console.log('Product added successfully:', response.data);
        // Puedes agregar lógica adicional aquí, como redirigir al usuario o limpiar el formulario
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={product.description} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required />

        <label>Stock:</label>
        <input type="number" name="stock" value={product.stock} onChange={handleChange} required />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductForm;
