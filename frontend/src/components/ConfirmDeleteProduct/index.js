import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeProduct } from "../../store/products";


function ConfirmDeleteProduct({productId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const products = useSelector(state => state.products.Products);

  const deleteProduct = () => {
    dispatch(removeProduct(productId));
    return closeModal();
  }

  return (
    <div>
      <p>Are you sure you want to delete?</p>
      <button onClick={deleteProduct}>Yes</button>
      <button onClick={closeModal}>No</button>
    </div>
  )
}

export default ConfirmDeleteProduct;
