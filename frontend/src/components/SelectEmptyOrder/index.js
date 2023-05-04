import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addItems } from "../../store/orders";
import { loadOrders } from "../../store/orders";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function SelectEmptyOrder({list}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const orders = useSelector(state => state.orders);
  let emptyOrders = [];

  useEffect(() => {
    dispatch(loadOrders());
  },[])

  if (orders.Orders) {
    console.log(orders.Orders)
    emptyOrders = orders.Orders.filter(order => {
      if (order.Products && order.Products.length == 0) return order
    })
  }

  const addItemsToOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to add your current items to this order? This will CLEAR your list!")) {
      // add items
      let res = await dispatch(addItems(orderId, list))
      console.log(res);
      if (res.ok) {
        history.push(`/orders/${orderId}`)
        localStorage.removeItem('list')
        return closeModal();
      } else {
        window.alert(res.errors)
      }
    }
  }

  if (!orders.Orders) return null;

  return (
    <div>
      <h1>Select an order to add items to</h1>
      {emptyOrders.map(order =>
        <div onClick={() => addItemsToOrder(order.id)} style={{border: '1px solid black'}}>
          <p>Order: {order.id}</p>
          <p>Tracking Num: {order.trackingNumber}</p>
          <p>{order.status}</p>
        </div>
      )}
      {emptyOrders.length == 0 &&
        <p>No empty orders. Create a new order to add items.</p>
      }
    </div>
  )
}

export default SelectEmptyOrder;
