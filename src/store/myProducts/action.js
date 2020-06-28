export const actionTypes = {
  MY_PRODUCTS_SET_VIEW_PRODUCT: 'MY_PRODUCTS_SET_VIEW_PRODUCT',
  MY_PRODUCTS_SET_INFO: 'MY_PRODUCTS_SET_INFO',
  MY_PRODUCTS_UPDATE_A_PRODUCT: 'MY_PRODUCTS_UPDATE_A_PRODUCT',
  MY_PRODUCTS_ADD_A_PRODUCT: 'MY_PRODUCTS_ADD_A_PRODUCT',
  MY_PRODUCTS_REMOVE_A_PRODUCT: 'MY_PRODUCTS_REMOVE_A_PRODUCT',
};

export function setInfo(props) {
  return { type: actionTypes.MY_PRODUCTS_SET_INFO, props };
}

export function setViewProduct(props) {
  return { type: actionTypes.MY_PRODUCTS_SET_VIEW_PRODUCT, props };
}

export function updateProduct(id, props) {
  return { type: actionTypes.MY_PRODUCTS_UPDATE_A_PRODUCT, id, props };
}

export function addProduct(product) {
  return { type: actionTypes.MY_PRODUCTS_ADD_A_PRODUCT, product };
}

export function removeProduct(id) {
  return { type: actionTypes.MY_PRODUCTS_REMOVE_A_PRODUCT, id };
}
