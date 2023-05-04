import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteProduct from "../ConfirmDeleteProduct";
import EditProductFormModal from "../EditProductFormModal";

function ProductButton({product}) {

  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "projectDropdown absolute bg-white" + (showMenu ? " flexCol" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      <button onClick={openMenu}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2"><i class="fas fa-ellipsis-h"></i></button>
      <div className={ulClassName} ref={ulRef}>
        {  showMenu &&
        <>
          <OpenModalButton
            buttonText={<i class="fas fa-edit"></i>}
            onItemClick={closeMenu}
            modalComponent={<EditProductFormModal product={product}/>}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded mt-2"
          />
          <OpenModalButton
            buttonText={<i class="fas fa-trash-alt"></i>}
            onItemClick={closeMenu}
            modalComponent={<ConfirmDeleteProduct productId={product.id}/>}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2"
          />
        </>
        }
      </div>
    </div>
  )
}

export default ProductButton;
