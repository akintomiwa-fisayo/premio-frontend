export const actionTypes = {
  HOME_SET_INFO: 'HOME_SET_INFO',
  HOME_SET_VENDORS: 'HOME_SET_VENDORS',
  HOME_UPDATE_VENDORS: 'HOME_UPDATE_VENDORS',
  HOME_UPDATE_A_VENDOR: 'HOME_UPDATE_A_VENDOR',
};

export function setInfo(props) {
  return { type: actionTypes.HOME_SET_INFO, props };
}

export function setVendors(vendors) {
  return { type: actionTypes.HOME_SET_VENDORS, vendors };
}

export function updateVendors(vendors) {
  return { type: actionTypes.HOME_UPDATE_VENDORS, vendors };
}

export function updateVendor(id, props) {
  return { type: actionTypes.HOME_UPDATE_A_VENDOR, id, props };
}
