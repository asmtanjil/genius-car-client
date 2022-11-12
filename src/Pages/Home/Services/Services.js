import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  const [services, setServices] = useState([])
  const [isAsc, setIsAsc] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:5000/services?order=${isAsc ? 'asc' : 'desc'}`)
      .then(res => res.json())
      .then(data => setServices(data))
  }, [isAsc])
  return (
    <div>
      <div className='text-center'>
        <p className="text-2xl font-bold text-orange-600">Services</p>
        <h2 className="text-5xl font-semibold my-2">Our Service Area</h2>
        <p className='text-4 text-gray-500 capitalize'>the majority have suffered alteration in some form, by injected humour, or randomised <br />words which don't look even slightly believable. </p>
        <button onClick={() => setIsAsc(!isAsc)} className='btn btn-xs'>{isAsc ? 'desc' : 'asc'}</button>
      </div>
      <div className='grid my-8 gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {
          services.map(service => <ServiceCard
            key={service._id}
            service={service}
          ></ServiceCard>)
        }
      </div>
    </div>
  );
};

export default Services;