import React from 'react';
import { FaStar } from 'react-icons/fa';

const ProductsCard = ({ product }) => {
  const { image, title, price } = product
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="" className="bg-gray-100 rounded-xl w-full h-60" />
      </figure>

      <div className="card-body items-center text-center">
        <h5 className='flex gap-2 text-orange-600'>
          <FaStar></FaStar>
          <FaStar></FaStar>
          <FaStar></FaStar>
          <FaStar></FaStar>
          <FaStar></FaStar>
        </h5>
        <h2 className="card-title">{title}</h2>
        <p className='text-2xl font-semibold text-orange-600'>${price}.00</p>
      </div>

    </div>
  );
};

export default ProductsCard;

