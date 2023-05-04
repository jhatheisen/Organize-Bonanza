import { useDispatch, useSelector } from "react-redux";

import { loadProducts, nextPageProducts } from "../../store/products";
import { useEffect, useState } from 'react';

import OpenModalButton from "../OpenModalButton";

import { useHistory } from 'react-router-dom';
import CreateProductModal from "../CreateProductModal";

import ProductButton from "./ProductButton";
import SelectEmptyOrder from "../SelectEmptyOrder";

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
    if (existingProduct && existingProduct.quantity != existingProduct.stock ) {
      existingProduct.quantity++;
    } else if (!existingProduct) {
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

  const textC =  "mb-2 text-xl tracking-tight text-gray-900 dark:text-white";

  return (
    <div className="flex justify-between m-2">
      <div className="productsPageContent">
      <h3 className="px-5 pt-5 mb-2 mt-0 text-3xl font-medium leading-tight text-primary">Products</h3>
        <OpenModalButton
            buttonText={<p><i class="far fa-plus-square fa-lg"></i> Create Product</p> }
            modalComponent={<CreateProductModal />}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
          />
        <div style={{display:'flex', flexWrap:'wrap'}}>

        <div className="flex flex-wrap">
          {products &&
            products.Products.map(product => {

              return (
                <div className="productBox">
                  <div className="w-60 min-h-[330px] rounded overflow-hidden shadow-lg m-5">
                    <img className="w-full h-40 object-cover"  src={product.imageUrl}/>
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{product.name}</div>
                      <div className="flex justify-between">
                        <p className="text-gray-700 text-base">{product.description}</p>
                        <p className="text-gray-700 text-base">{product.stock} in stock</p>
                      </div>
                      <p className="text-gray-700 text-base">${product.price}</p>
                      <div className="flex justify-between">
                        <ProductButton product={product}/>
                        { product.stock != 0 && (
                          <button onClick={() => addToList(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-2"><i class="fas fa-cart-plus"></i> Add to list</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        </div>
    <button onClick={nextPage} className="bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded m-2">Load More</button>
    </div>
    <div className="flex flex-col items-start">
      <h3 className="text-2xl font-bold">List</h3>
      <div className="p-2 border-2 border-gray-300">
        {list.map(product => {

          // make product quantity selects
          let options = [];

          for (let i = 0; i <= product.stock; i++) {
            options.push(<option value={i}>{i}</option>)
          }

          return (
            <div className="rounded overflow-hidden shadow-lg">
              <div className="w-40" >
                <img src={product.imageUrl} class="w-full h-24 object-cover"></img>
              </div>
              <div className="px-6 py-4">
                <p className="font-bold text-xl mb-2">{product.name}</p>
                <select value={product.quantity} onChange={(e) => editProduct(product.id, e.target.value)} className="w-10">
                  {options}
                </select>
                <button onClick={() => removeFromList(product.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"><i class="fas fa-trash-alt"></i></button>
              </div>
            </div>
          );
        })}
        { list.length ? (
          <OpenModalButton
              buttonText="Add items to order"
              modalComponent={<SelectEmptyOrder list={list} />}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
            />
        ) : ( <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-800">No items yet, add some to make a list</p>)}
      </div>
    </div>
    </div>
  )
}

export default ProductsPage;
