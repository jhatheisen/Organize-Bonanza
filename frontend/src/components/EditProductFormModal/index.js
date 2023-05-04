import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { modifyProduct } from "../../store/products";

function EditProductFormModal({product}) {
  const dispatch = useDispatch();
  const [name , setName] = useState(product.name);
  const [description , setDescription] = useState(product.description);
  const [price , setPrice] = useState(product.price);
  const [stock , setStock] = useState(product.stock);
  const [imageUrl , setImageUrl] = useState(product.imageUrl);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(modifyProduct({ id: product.id, name, description, price, stock: parseInt(stock), imageUrl }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <>
      <h1>Edit Product</h1>
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
        <button type="submit">Edit</button>
      </form>
    </>
  );
}

export default EditProductFormModal;
