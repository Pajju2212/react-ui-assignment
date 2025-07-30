import React from 'react';
import ProductTable from './components/ProductTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="stars"></div>
      <div className="content">
        <h1 className="gradient-text">Product Dashboard</h1>
        <ProductTable />
      </div>
    </div>
  );
}

export default App;