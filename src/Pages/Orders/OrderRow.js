import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDeleteOrder, handleStatusUpdate }) => {
  const { customerName, _id, phone, price, serviceName, service, status } = order;

  const [orderService, setOrderService] = useState({})

  useEffect(() => {
    fetch(`https://genius-car-server-six-olive.vercel.app/services/${service}`)
      .then(res => res.json())
      .then(data => setOrderService(data))
  }, [service]);


  return (
    <tr>
      <th>
        <label>
          <button onClick={() => handleDeleteOrder(_id)} className='btn btn-ghost'>X</button>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded w-24 h-24">
              {orderService?.img &&
                <img src={orderService.img} alt="" />
              }
            </div>
          </div>
          <div>
            <div className="font-bold">{customerName}</div>
            <div className="text-sm opacity-50">{phone}</div>
          </div>
        </div>
      </td>
      <td>
        {serviceName}
        <br />
        <span className="badge badge-ghost badge-sm">${price}</span>
      </td>
      <td>Unique Service</td>
      <th>
        <button onClick={() => handleStatusUpdate(_id)} className="btn btn-warning btn-xs">{status ? status : 'pending'}</button>
      </th>
    </tr>
  );
};

export default OrderRow;