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
    <div className="flex flex-col items-center justify-center">
      <h1 className="px-5 pt-5 mb-2 mt-0 text-3xl font-medium leading-tight text-primary">Are you sure you want to delete?</h1>
      <h2 className="px-5 pt-5 mb-5 mt-0 text-xl font-medium leading-tight text-primary">This will permanently delete the product!</h2>
      <div>
        <button onClick={deleteProduct} className="m-2 text-xl bg-zinc-400 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">Yes</button>
        <button onClick={closeModal} className="m-2 text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">No</button>
      </div>
    </div>
  )
}

export default ConfirmDeleteProduct;
