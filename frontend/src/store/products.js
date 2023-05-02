import { csrfFetch } from './csrf';

const POPULATE_PRODUCTS = "spots/POPULATE_PRODUCTS";

const populateProducts = (products) => {
  return {
    type: POPULATE_PRODUCTS,
    payload: products
  }
}

export const loadProducts = () => async (dispatch) => {
  const response = await csrfFetch('/api/products?page=1&size=10');
  const data = await response.json();
  dispatch(populateProducts(data));
  return response;
}

const productsReducer = ( state = {}, action) => {
  let newState;
  switch (action.type) {
    case
  }
}
