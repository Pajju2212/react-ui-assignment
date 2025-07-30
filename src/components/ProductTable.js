import './ProductTable.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    category: '',
    image: ''
  });

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );


const handleAddProduct = (e) => {
  e.preventDefault();

  const fakeProduct = {
    id: products.length + 1, // Just fake ID for local UI
    ...newProduct
  };

  // Add it to UI only (API won't really store it)
  setProducts([...products, fakeProduct]);


  // Reset form
  setNewProduct({
    title: '',
    price: '',
    category: '',
    image: ''
  });

  console.log('New Product added locally:', fakeProduct);
};


  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
    const sortedData = res.data.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setProducts(sortedData);
  })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (confirmDelete) {
    const updatedList = products.filter(p => p.id !== id);
    setProducts(updatedList);
  }
};


  return (
    <div>
      <h2 className="product-list-title">📦 Product List (Live + Local)</h2>


<input
  type="text"
  className="search-input"
  placeholder="Search by title or category"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>


{/* 🔽 Add Product Form */}
<form onSubmit={handleAddProduct} style={{ marginBottom: '20px' }}>
  <input
    type="text"
    placeholder="Title"
    value={newProduct.title}
    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
    required
  />
  <input
    type="number"
    placeholder="Price"
    value={newProduct.price}
    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
    required
  />
  <input
    type="text"
    placeholder="Category"
    value={newProduct.category}
    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
    required
  />
  <input
    type="text"
    placeholder="Image URL"
    value={newProduct.image}
    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
    required
  />
  <button type="submit">Add Product</button>
</form>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
  <tr>
    <th>ID</th>
    <th>Title</th>
    <th>Price</th>
    <th>Category</th>
    <th>Image</th>
    <th>Actions</th> {/* ✅ New */}
  </tr>
</thead>

<tbody>
  {filteredProducts.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.title}</td>
      <td>${product.price}</td>
      <td>{product.category}</td>
      <td><img src={product.image} width="50" alt="product" /></td>
      <td>
        <button
          onClick={() => handleDelete(product.id)}
          style={{ background: 'red', color: 'white' }}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>



      </table>
    </div>
  );
}

// ✅ This line is required for App.js to import properly
export default ProductTable;