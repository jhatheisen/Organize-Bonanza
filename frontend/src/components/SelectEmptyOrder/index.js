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

  const textC =  "mb-2 text-xl tracking-tight text-gray-900 dark:text-white";

  return (
    <div className="flex flex-col items-center">
      <h1 className="px-5 pt-5 mb-2 mt-0 text-3xl font-medium leading-tight text-primary">Select an order to add items to</h1>
      <div className="flex justify-center">
        {emptyOrders.map(order =>
          <div onClick={() => addItemsToOrder(order.id)} className="cursor-pointer block max-w-sm p-5 m-2 bg-white border border-white-200 rounded-lg shadow hover:bg-zinc-100 dark:bg-zinc-500 dark:border-zinc-700 dark:hover:bg-zinc-700">
            <p className={textC}>Order # : {order.id}</p>
            <p className={textC}>Tracking # : {order.trackingNumber}</p>
            <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Status : {order.status}</p>
          </div>
      )}
      </div>
      {emptyOrders.length == 0 &&
        <p>No empty orders. Create a new order to add items.</p>
      }
    </div>
  )
}

export default SelectEmptyOrder;
