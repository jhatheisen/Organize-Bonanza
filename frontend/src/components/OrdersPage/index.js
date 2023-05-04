import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { loadOrders } from "../../store/orders";
import OpenModalButton from "../OpenModalButton";
import CreateOrderModal from "../CreateOrderModal";

const OrdersPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const orders = useSelector(state => state.orders);

  useEffect(() => {
    const loadOrders = async () => {
      let res = await dispatch(loadOrders());
      console.log(res.json())
    }

    loadOrders()
    .catch(console.error)
  },[])

  if (!orders.Orders) return null;

  return (
    <>
    <h3>Create a new order to get started</h3>
     <OpenModalButton
          buttonText="Create New Order"
          modalComponent={<CreateOrderModal />}
        />
      <h3>Current Orders</h3>
     {orders.Orders.map(order =>
     <div onClick={() => history.push(`/orders/${order.id}`)} style={{border: '1px solid black'}}>
      <p>Order: {order.id}</p>
      <p>Tracking Num: {order.trackingNumber}</p>
      <p>{order.status}</p>
     </div>
      )}
    </>
  )
}

export default OrdersPage;
