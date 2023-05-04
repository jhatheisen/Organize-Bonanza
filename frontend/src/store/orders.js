import { csrfFetch } from './csrf';

const POPULATE_ORDERS = 'orders/POPULATE_ORDERS';
const DETAIL_ORDER = 'orders/DETAIL_ORDER';
const CREATE_ORDER = 'orders/CREATE_ORDER';
const EDIT_ORDER = 'orders/EDIT_ORDER';

const populateOrders = (orders) => {
  return {
    type: POPULATE_ORDERS,
    payload: orders
  }
}

const detailOrder = (order) => {
  return {
    type: DETAIL_ORDER,
    payload: order
  }
}

const createOrder = (order) => {
  return {
    type: CREATE_ORDER,
    payload: order
  }
}

const editOrder = (order) => {
  return {
    type: EDIT_ORDER,
    payload: order
  }
}

export const loadOrders = () => async (dispatch) => {
  const response = await csrfFetch('/api/orders');
  const data = await response.json();
  dispatch(populateOrders(data));
  return response;
}

export const showDetailOrder = (orderId) => async (dispatch) => {
  const response = await csrfFetch(`/api/orders/${orderId}`);
  const data = await response.json();
  dispatch(detailOrder(data));
  return response;
}

export const createNewOrder = (order) => async (dispatch) => {
  const response = await csrfFetch('/api/orders', {
    method: "POST",
    body: JSON.stringify(order)
  });
  const data = await response.json();
  dispatch(createOrder(data));
  return response;
}

export const modifyOrder = (order) => async (dispatch) => {
  const response = await csrfFetch(`/api/orders/${order.id}`, {
    method: "PUT",
    body: JSON.stringify(order)
  });
  const data = await response.json();
  dispatch(editOrder(data));
  return response;
}

export const addItems = (orderId, items) => async (dispatch) => {
  const response = await csrfFetch(`/api/orders/${orderId}/items`, {
    method: "POST",
    body: JSON.stringify(items)
  });
  return response;
}

const ordersReducer = ( state = {}, action) => {
  let newState;
  switch (action.type) {
    case POPULATE_ORDERS: {
      newState = {...state};
      newState = action.payload;
      return newState;
    }
    case DETAIL_ORDER: {
      newState = {...state};
      newState.detailOrder = action.payload;
      return newState;
    }
    case CREATE_ORDER: {
      newState = {...state};
      newState.Orders = [...newState.Orders, action.payload];
      return newState;
    }
    case EDIT_ORDER: {
      newState = {...state};
      // newState.Orders = newState.Orders.map(order => order.id == action.payload.id ? action.payload : order)
      newState.detailOrder.Order = action.payload;
      return newState;
    }
    default:
      return state
  }
}

export default ordersReducer;
