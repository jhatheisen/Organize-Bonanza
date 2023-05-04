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

  const ulClassName = "projectDropdown" + (showMenu ? " flexCol" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      <button onClick={openMenu}>Edit</button>
      <div className={ulClassName} ref={ulRef}>
        {  showMenu &&
        <>
          <OpenModalButton
            buttonText="Edit Product"
            onItemClick={closeMenu}
            modalComponent={<EditProductFormModal product={product}/>}
          />
          <OpenModalButton
            buttonText="Delete"
            onItemClick={closeMenu}
            modalComponent={<ConfirmDeleteProduct productId={product.id}/>}
          />
        </>
        }
      </div>
    </div>
  )
}

export default ProductButton;
