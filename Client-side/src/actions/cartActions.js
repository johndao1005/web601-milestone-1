import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/product/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
