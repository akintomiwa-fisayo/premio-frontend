export const actionTypes = {
  CART_SET_PRODUCTS: 'CART_SET_PRODUCTS',
  CART_ADD_PRODUCT: 'CART_ADD_PRODUCT',
  CART_REMOVE_PRODUCT: 'CART_REMOVE_PRODUCT',
};

export function setCartProducts(cartProducts) {
  return { type: actionTypes.CART_SET_PRODUCTS, cartProducts };
}

export function addCartProduct(product) {
  return { type: actionTypes.CART_ADD_PRODUCT, product };
}

export function removeCartProduct(productId) {
  return { type: actionTypes.CART_REMOVE_PRODUCT, productId };
}
