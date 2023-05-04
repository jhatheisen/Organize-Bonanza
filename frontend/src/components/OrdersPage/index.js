import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { loadOrders } from "../../store/orders";
import OpenModalButton from "../OpenModalButton";
import CreateOrderModal from "../CreateOrderModal";

const OrdersPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const orders = useSelector(state => state.orders);

  useEffect(() => {
    handleLoad();
  },[])

  const handleLoad = (e) => {
    return dispatch(loadOrders())
      .catch(async (res) => {
        const data = await res.json();
        if (!data.ok) console.log(data);
      })
  }

  if (!orders.Orders) return null;

  const textC =  "mb-2 text-xl tracking-tight text-gray-900 dark:text-white";


  return (
    <>
    <h3 className="px-5 pt-5 mb-2 mt-0 text-3xl font-medium leading-tight text-primary">Create a new order or click below to view one.</h3>
     <OpenModalButton
          buttonText={<p><i class="far fa-plus-square fa-lg"></i> Create Order</p>}
          modalComponent={<CreateOrderModal />}
          className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5"}
        />
     <h3 className="px-5 pt-5 mb-2 mt-0 text-2xl font-medium leading-tight text-primary">Current Orders</h3>
     <div className="m-5 flex flex-row items-center">
      {orders.Orders.map(order =>
      <div onClick={() => history.push(`/orders/${order.id}`)}  className="cursor-pointer block max-w-lg p-5 m-2 bg-white border border-white-200 rounded-lg shadow hover:bg-zinc-100 dark:bg-zinc-500 dark:border-zinc-700 dark:hover:bg-zinc-700">
        <p className={textC}>Order # : {order.id}</p>
        <p className={textC}>Tracking # : {order.trackingNumber}</p>
        <p className={textC}>Status: {order.status}</p>
      </div>
        )}
     </div>
    </>
  )
}

export default OrdersPage;
