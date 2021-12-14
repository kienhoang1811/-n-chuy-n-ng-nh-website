import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;
  
  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();
  useEffect(()=> {
    console.log(orders);
  },[orders])

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return loading ? <div>Loading...</div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              {/* <th>DELIVERED AT</th> */}
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              const time = new Date(order.createdAt);
              const day = time.getDay()
              const month = time.getMonth()
              const year = time.getFullYear()
              const hour = time.getHours()
              const minute = time.getMinutes()
              const second = time.getSeconds()
              
              return (<tr key={order._id}>
              
              <td>{order._id}</td>
              <td>{`${day}/${month}/${year} ${hour}:${minute}:${second}`}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user.name}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{order.paidAt}</td>
              <td>{order.isDelivered.toString()}</td>
              {/* <td>{order.deliveredAt}</td> */}
              <td>
                <Link to={"/order/" + order._id} className="button secondary" >Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
              </td>
            </tr>)})}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;