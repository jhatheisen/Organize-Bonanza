import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { modifyOrder } from "../../store/orders";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function EditOrderFormModal({order}) {
  const dispatch = useDispatch();
  const [trackingCompany , setTrackingCompany] = useState(order.trackingCompany);
  const [trackingNumber , setTrackingNumber] = useState(order.trackingNumber);
  const [status , setStatus] = useState(order.status);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const newOrder = {id: order.id, trackingCompany, trackingNumber, status, createdAt: order.createdAt, updatedAt: order.updatedAt}
    const res = await dispatch(modifyOrder(newOrder));
    if (res.ok) {
      history.push(`/orders/${order.id}`)
      closeModal();
    } else {
      const data = res.json()
      return setErrors(data.errors)
    }

  };

  return (
    <>
      <h1>Edit Order</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Tracking Company
          <input
            type="text"
            value={trackingCompany}
            onChange={(e) => setTrackingCompany(e.target.value)}
            required
          />
        </label>
        <label>
          Tracking Number
          <input
            type="number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Status
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </label>
        <button type="submit">Edit</button>
      </form>
    </>
  );
}

export default EditOrderFormModal;
