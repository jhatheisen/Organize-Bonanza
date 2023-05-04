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

  return (
    <>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price $
          <input
            type="number"
            step='.01'
            value={price}
            precision={2}
            min={'.01'}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Stock
          <input
            type="number"
            value={stock}
            min={1}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </label>
        <label>
          Image Url
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </>
  );
}

export default CreateProductModal;
