export const actionTypes = {
  DOCUMENT_LOADED: 'DOCUMENT_LOADED',
  CHANGE_CURRENCY: 'CHANGE_CURRENCY',
  CHANGE_CURRENCY_SUCCESS: 'CHANGE_CURRENCY_SUCCESS',
  CHANGE_NAV: 'CHANGE_NAV',
  CHANGE_HEADER: 'CHANGE_HEADER',
  RESET_HEADER: 'RESET_HEADER',
  RESET_NAV: 'RESET_NAV',
};

export function documentLoaded() {
  return { type: actionTypes.DOCUMENT_LOADED };
}

export function changeCurrency(currency) {
  return { type: actionTypes.CHANGE_CURRENCY, currency };
}

export function changeCurrencySuccess(currency) {
  return { type: actionTypes.CHANGE_CURRENCY_SUCCESS, currency };
}

export function changeNav(nav) {
  return { type: actionTypes.CHANGE_NAV, nav };
}

export function changeHeader(header) {
  return { type: actionTypes.CHANGE_HEADER, header };
}

export function resetHeader() {
  return { type: actionTypes.RESET_HEADER };
}

export function resetNav() {
  return { type: actionTypes.RESET_NAV };
}
