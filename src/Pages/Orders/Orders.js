import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
  const [orders, setOrders] = useState([])
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://genius-car-server-six-olive.vercel.app/orders?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('geniusToken')}`
        }
      })
        .then(res => {
          if (res.status === 401 || res.status === 403) {
            return;
          }
          return res.json();
        })
        .then(data => {
          // console.log(data)
          setOrders(data);
        })
        .catch(err => console.error(err))
    }
  }, [user?.email, logOut])


  const handleDeleteOrder = id => {
    const proceed = window.confirm('Do you want to delete it really?')
    if (proceed) {
      fetch(`https://genius-car-server-six-olive.vercel.app/orders/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.deletedCount > 0) {
            alert('Deleted SuccessFully')
            const remaining = orders.filter(odr => odr._id !== id)
            setOrders(remaining)
          }
        })
    }
  }

  const handleStatusUpdate = id => {
    fetch(`https://genius-car-server-six-olive.vercel.app/orders/${id}`, {
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
      <h2 className='text-2xl'>
        You Have {orders?.length} orders
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Delete History</th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              orders?.length && orders.map(order => <OrderRow
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