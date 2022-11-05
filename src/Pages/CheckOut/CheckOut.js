import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const CheckOut = () => {
  const { _id, title, price } = useLoaderData()
  const { user } = useContext(AuthContext)

  const handlePlaceOrder = e => {
    e.preventDefault();
    const form = e.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email;
    const phone = form.phone.value;
    const message = form.message.value;

    const orderDetail = {
      service: _id,
      serviceName: title,
      price,
      customerName: name,
      phone,
      email,
      message,
    }

    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(orderDetail)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.acknowledged) {
          alert('Order Placed')
          form.reset()
        }
      })
      .catch(err => console.error(err))
  }
  return (
    <div className='my-8'>
      <form onSubmit={handlePlaceOrder}>
        <h2 className="text-3xl text-center">You are going to order: {title}</h2>
        <h4 className='text-2xl text-center text-orange-600 font-semibold'>Price: ${price}</h4>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 my-4'>
          <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full " />
          <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full " />
          <input name='phone' type="text" placeholder="Phone" className="input input-bordered w-full" required />
          <input name='email' defaultValue={user?.email} type="text" placeholder="Phone" className="input input-bordered w-full " readOnly required />
        </div>

        <textarea name='message' className="textarea textarea-bordered h-60 w-full" placeholder="message" required></textarea>
        <input className='btn' type="submit" value="Place Your Order" />

      </form>
    </div>
  );
};

export default CheckOut;