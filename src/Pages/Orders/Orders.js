import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
  const [orders, setOrders] = useState([])
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/orders?email${user?.email}`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err))
  }, [user?.email])


  const handleDeleteOrder = _id => {
    const proceed = window.confirm('Do you want to delete it really?')
    if (proceed) {
      fetch(`http://localhost:5000/orders/${_id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.deletedCount > 0) {
            alert('Deleted SuccessFully')
            const remaining = orders.filter(odr => odr._id !== _id)
            setOrders(remaining)
          }
        })
    }
  }

  const handleStatusUpdate = id => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ status: 'Approved' })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.modifiedCount > 0) {
          const remaining = orders.filter(odr => odr._id !== id)
          const approving = orders.find(odr => odr._id === id)
          approving.status = 'Approved'

          const newOrders = [approving, ...remaining];
          setOrders(newOrders)
        }
      })
  }

  return (
    <div>
      <h2>
        {orders.length}
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <button className='btn btn-ghost'>X</button>
                </label>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map(order => <OrderRow
                key={order._id}
                order={order}
                handleDeleteOrder={handleDeleteOrder}
                handleStatusUpdate={handleStatusUpdate}
              ></OrderRow>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;