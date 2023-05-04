import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewOrder } from "../../store/orders";

function CreateOrderModal() {
  const dispatch = useDispatch();
  const [trackingCompany , setTrackingCompany] = useState();
  const [trackingNumber , setTrackingNumber] = useState();
  const [status , setStatus] = useState();
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(createNewOrder({ trackingCompany, trackingNumber, status }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <>
      <h1>Create Order</h1>
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
            type="text"
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
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateOrderModal;
