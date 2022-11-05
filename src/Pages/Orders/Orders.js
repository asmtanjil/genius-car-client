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
              ></OrderRow>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;