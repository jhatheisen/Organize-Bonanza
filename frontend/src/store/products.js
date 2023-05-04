import { csrfFetch } from './csrf';

const POPULATE_PRODUCTS = "products/POPULATE_PRODUCTS";
const ADD_PRODUCTS = 'products/ADD_PRODUCTS';
const CREATE_PRODUCT = 'products/CREATE_PRODUCT';
const DELETE_PRODUCT = 'products/DELETE_PRODUCT';
const EDIT_PRODUCT = 'products/EDIT_PRODUCT';

const populateProducts = (products) => {
  return {
    type: POPULATE_PRODUCTS,
    payload: products
  }
}

const addProducts = (products) => {
  return {
    type: ADD_PRODUCTS,
    payload: products
  }
}

const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    payload: product
  }
}

const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    payload: productId
  }
}

const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    payload: product
  }
}

export const loadProducts = () => async (dispatch) => {
  const response = await csrfFetch('/api/products?page=1&size=5');
  const data = await response.json();
  dispatch(populateProducts(data));
  return response;
}

export const nextPageProducts = (pageNum) => async (dispatch) => {
  const response = await csrfFetch(`/api/products?page=${pageNum}&size=5`);
  const data = await response.json();
  dispatch(addProducts(data));
  return data;
}

export const createNewProduct = (product) => async (dispatch) => {
  const response = await csrfFetch('/api/products', {
    method: "POST",
    body: JSON.stringify(product)
  });
  const data = await response.json();
  dispatch(createProduct(data));
  return response;
}

export const modifyProduct = (product) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${product.id}`, {
    method: "PUT",
    body: JSON.stringify(product)
  });
  const data = await response.json();
  dispatch(editProduct(product));
  return response;
}

export const removeProduct = (productId) => async (dispatch) => {
  const response = await csrfFetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  dispatch(deleteProduct(productId));
  return response;
}

const productsReducer = ( state = {}, action) => {
  let newState;
  switch (action.type) {
    case POPULATE_PRODUCTS: {
      newState = {...state};
      newState = action.payload;
      return newState;
    }
    case ADD_PRODUCTS: {
      newState = {...state};
      newState.Products = [...newState.Products, ...action.payload.Products];
      newState.page = action.payload.page;
      return newState;
    }
    case CREATE_PRODUCT: {
      newState = {...state};
      newState.Products = [...newState.Products, action.payload];
      return newState;
    }
    case DELETE_PRODUCT: {
      newState = {...state};
      newState.Products = newState.Products.filter(product => product.id != action.payload)
      return newState;
    }
    case EDIT_PRODUCT: {
      newState = {...state};
      newState.Products = newState.Products.map(product => product.id == action.payload.id ? action.payload : product)
      return newState;
    }
    default:
      return state
  }
}

export default productsReducer;
