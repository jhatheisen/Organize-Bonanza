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

  const pC = "font-bold text-zinc-700";

  return (
    <div className="m-2 flex flex-col">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-800">Order Details</h1>
      <OpenModalButton
          buttonText={<p><i class="fas fa-edit"></i> Edit Order</p>}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 w-36"
          modalComponent={<EditOrderFormModal order={detailedOrder.Order}/>}
        />
      <div className="m-5 p-3 shadow-lg rounded flex flex-col w-60">
        <p className={pC}>Order # : {detailedOrder.Order.id}</p>
        <p className={pC}>Shipping Company : {detailedOrder.Order.trackingCompany}</p>
        <p className={pC}>Tracking # : {detailedOrder.Order.trackingNumber}</p>
        <p className={pC}>Order Status : {detailedOrder.Order.status}</p>
        <p className={pC}>Order Date : {detailedOrder.Order.createdAt.slice(0,10)}</p>
      </div>
      <hr></hr>
      <div className="m-5">
        <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-800">Products</h2>
        <div className="flex">
          {detailedOrder.products &&
            detailedOrder.products.map(product => (
            <div className="w-60 rounded overflow-hidden shadow-lg m-5">
              <img className="w-full h-40 object-cover"  src={product.imageUrl}/>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <div className="flex justify-between">
                  <p className="text-gray-700 text-base">{product.description}</p>
                  <p className="text-gray-700 text-base">Quantity: {product.quantity}</p>
                </div>
                  <p className="text-gray-700 text-base">${product.price}</p>
              </div>
            </div>
            ))
          }
        </div>
        {detailedOrder.products.length == 0 && (
          <p className="mb-2 m-3 text-lg tracking-tight text-gray-900 dark:text-zinc-800">No products for this order. Add some from the products page.</p>
        )}
      </div>
    </div>
  )
}

export default OrdersDetails;
