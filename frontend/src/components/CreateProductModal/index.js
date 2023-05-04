import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewProduct } from "../../store/products";

function CreateProductModal() {
  const dispatch = useDispatch();
  const [name , setName] = useState();
  const [description , setDescription] = useState();
  const [price , setPrice] = useState();
  const [stock , setStock] = useState();
  const [imageUrl , setImageUrl] = useState();
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(createNewProduct({ name, description, price, stock, imageUrl }))
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
      <h1 className="px-5 pt-5 mb-2 mt-0 text-3xl font-medium leading-tight text-primary">Create Product</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label className={labelC}>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputC}
              />
          </label>
        </div>
        <div className="mb-4">
          <label className={labelC}>
            Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className={inputC}
              />
          </label>
        </div>
        <div className="mb-4">
          <label className={labelC}>
            Price $
            <input
              type="number"
              step='.01'
              value={price}
              precision={2}
              min={'.01'}
              onChange={(e) => setPrice(e.target.value)}
              required
              className={inputC}
              />
          </label>
        </div>
        <div className="mb-4">
          <label className={labelC}>
            Stock
            <input
              type="number"
              value={stock}
              min={1}
              onChange={(e) => setStock(e.target.value)}
              required
              className={inputC}
              />
          </label>
        </div>
        <div className="mb-4">
          <label className={labelC}>
            Image Url
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
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

export default CreateProductModal;
