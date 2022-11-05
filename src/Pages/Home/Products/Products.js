import React, { useEffect, useState } from 'react';
import ProductsCard from './ProductsCard';

const Products = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
  return (
    <div>
      <div className='text-center'>
        <p className="text-2xl font-bold text-orange-600">Popular Products</p>
        <h2 className="text-5xl font-semibold my-2">Browse Our Products       </h2>
        <p className='text-4 text-gray-500 capitalize'>the majority have suffered alteration in some form, by injected humour, or randomised <br />words which don't look even slightly believable. </p>
      </div>
      <div className='grid my-8 gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {
          products.map(product => <ProductsCard
            key={product._id}
            product={product}
          ></ProductsCard>)
        }
      </div>
    </div>
  );
};

export default Products;