import { useDispatch, useSelector } from "react-redux";

import { loadProducts, nextPageProducts } from "../../store/products";
import { useEffect, useState } from 'react';

import OpenModalButton from "../OpenModalButton";

import { useHistory } from 'react-router-dom';
import CreateProductModal from "../CreateProductModal";

import ProductButton from "./ProductButton";

function ProductsPage() {

  const dispatch = useDispatch();
  const history = useHistory();

  const products = useSelector(state => state.products)
  const currPage = useSelector(state => state.products.page);
  const [list, setList] = useState([]);
  const [changingProduct, setChanginProduct] = useState();

  let localList = localStorage.getItem("list");

  useEffect(() => {

    dispatch(loadProducts())

    localList = JSON.parse(localList);

    if (localList) setList(localList);

  }, []);

  if (!products.Products) return null;

  const addToList = (product) => {
    let listCopy = [...list];
    let {id} = product;
    let existingProduct = listCopy.find(element => element.id == id)

    // if id in list
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      listCopy.push(product)
    }

    setList(listCopy)

    let stringList = JSON.stringify(listCopy);
    localStorage.setItem("list", stringList);
  }

  const editProduct = (productID, amount) => {

    let listCopy = [...list]

    //find if item exists, just in case
    let existentProduct = listCopy.find(element => element.id == productID);

    //if it doesnt exist simply return
    if (!existentProduct) return

    //continue and update quantity
    existentProduct.quantity = amount;

    //validate result
    if (existentProduct.quantity <= 0) {
      //remove item  by filtering it from cart array
      listCopy = listCopy.filter(element => element.id != productID)
    }

    //again, update state and localState
    setList(listCopy);

    let listString = JSON.stringify(listCopy);
    localStorage.setItem('list', listString);
  }

  const removeFromList = (productId) => {
    let listCopy = [...list];

    listCopy = listCopy.filter(product => product.id != productId);

    setList(listCopy)

    let stringList = JSON.stringify(listCopy);
    localStorage.setItem("list", stringList);
  }

  const nextPage = async () => {
    const products = await dispatch(nextPageProducts(currPage + 1));
    if (products.Products.length == 0) window.alert('No more products to load!')
  }


  return (
    <>
    <hr></hr>
    <div className="productsPageContent">
      {list.map(product => {

        // make product quantity selects
        let options = [];

        for (let i = 0; i <= product.stock; i++) {
          options.push(<option value={i}>{i}</option>)
        }

        return (
          <>
            <h3>List</h3>
            <p>{product.name}</p>
            <img src={product.imageUrl} style={{width: '100px', height: '100px'}}></img>
            {/* <p>quantity:{product.quantity}</p> */}
            <select value={product.quantity} onChange={(e) => editProduct(product.id, e.target.value)}>
              {options}
            </select>
            <button onClick={() => removeFromList(product.id)}>Remove</button>
          </>
        );
      })}
      <button>Create Order</button>
      <hr></hr>
      <OpenModalButton
          buttonText="Create Product"
          modalComponent={<CreateProductModal />}
        />
      <div style={{display:'flex', flexWrap:'wrap'}}>

      {products &&
        products.Products.map(product => {

          return (
            <div className="productBox">
              <p>{product.name}</p>
              <p>{product.description}</p>
              <ProductButton product={product}/>
              <img src={product.imageUrl} style={{width: '100px', height: '100px'}}></img>
              <p>${product.price}</p>
              <p>{product.stock} in stock</p>
              <button onClick={() => addToList(product)}>Add To List</button>
            </div>
          )
        })
      }
      </div>
    </div>
    <button onClick={nextPage}>Load More</button>
    </>
  )
}

export default ProductsPage;
