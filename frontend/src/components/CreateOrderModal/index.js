import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewOrder } from "../../store/orders";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CreateOrderModal() {
  const dispatch = useDispatch();
  const [trackingCompany , setTrackingCompany] = useState();
  const [trackingNumber , setTrackingNumber] = useState();
  const [status , setStatus] = useState();
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

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

  const inputC = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  const labelC = "block text-gray-700 text-sm font-bold mb-2"


  return (
    <>
      <h1 className="px-5 pt-5 mb-2 mt-0 text-3xl font-medium leading-tight text-primary">Create Order</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label className={labelC}>
            Tracking Company
            <input
              type="text"
              value={trackingCompany}
              onChange={(e) => setTrackingCompany(e.target.value)}
              required
              className={inputC}
              />
          </label>
        </div>
        <div className="mb-4">
          <label className={labelC}>
            Tracking Number
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              required
              className={inputC}
              />
          </label>
        </div>
        <div className="mb-4">
          <label className={labelC}>
            Status
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className={inputC}
              />
          </label>
        </div>
        <ul>
          {errors.map((error, idx) => <li key={idx} className="text-red-500 text-xs italic pb-5">{error}</li>)}
        </ul>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create</button>
      </form>
    </>
  );
}

export default CreateOrderModal;
