import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { showDetailOrder } from "../../store/orders";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import EditOrderFormModal from "../EditOrderModal";

const OrdersDetails = () => {

  const { orderId } = useParams();
  const dispatch = useDispatch();

  const detailedOrder = useSelector(state => state.orders.detailOrder);


  useEffect(() => {
    dispatch(showDetailOrder(orderId))
  }, [])

  if (!detailedOrder) return null;

  console.log(detailedOrder.products)

  return (
    <>
      <h1>Order Details</h1>
      <OpenModalButton
          buttonText="Edit Order"
          modalComponent={<EditOrderFormModal order={detailedOrder.Order}/>}
        />
      <p>{detailedOrder.Order.id}</p>
      <p>{detailedOrder.Order.trackingCompany}</p>
      <p>{detailedOrder.Order.trackingNumber}</p>
      <p>{detailedOrder.Order.status}</p>
      <p>{detailedOrder.Order.createdAt}</p>
      <hr></hr>
      <h2>Products</h2>
      {detailedOrder.products &&
        detailedOrder.products.map(product => (
        <>
          <p>{product.name}</p>
          <p>x {product.quantity}</p>
        </>
        ))
      }
      {detailedOrder.products.length == 0 && (
        <>
          <p>Sorry no products for this order, add some.</p>
        </>
      )
      }
    </>
  )
}

export default OrdersDetails;
