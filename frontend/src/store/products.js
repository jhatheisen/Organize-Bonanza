import { csrfFetch } from './csrf';

const POPULATE_PRODUCTS = "products/POPULATE_PRODUCTS";
const ADD_PRODUCTS = 'products/ADD_PRODUCTS';

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
  return response;
}

const initialState = {};

const productsReducer = ( state = initialState, action) => {
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
    default:
      return state
  }
}

export default productsReducer;
