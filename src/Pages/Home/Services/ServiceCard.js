import React from 'react';
import { FaGreaterThan } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const { _id, title, img, price } = service
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src={img} alt="" className='p-6' /></figure>
      <div className="card-body">
        <h1 className="card-title">{title}</h1>
        <p className='text-2xl font-semibold text-orange-600'>Price: ${price}</p>
        <div className="card-actions justify-end">
          <Link to={`/checkOut/${_id}`}>
            <button className="btn btn-primary text-white">CheckOut <FaGreaterThan className='ml-2 '></FaGreaterThan></button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;