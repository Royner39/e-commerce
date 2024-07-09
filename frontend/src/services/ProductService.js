import axios from 'axios';

const API_URL = 'http://localhost:5258/api/products';

const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

const getProductByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with name ${name}:`, error);
    throw error;
  }
};

const getLastProduct = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data[response.data.length - 1];
  } catch (error) {
    console.error(`Error fetching product:`, error);
    throw error;
  }
}

const createProduct = async (product) => {
  try {
    var lastproduct = await getLastProduct();
    var connewID = lastproduct.id + 1;
    product.id = connewID;
    const response = await axios.post(API_URL, product);
    
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};

const ProductoService = {
  getProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct
};

export default ProductoService;