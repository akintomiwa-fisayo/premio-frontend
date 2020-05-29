export const actionTypes = {
  SET_COUNTRY_STATES: 'SET_COUNTRY_STATES',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  CHANGE_USER: 'CHANGE_USER',
};

export function setCountryStates(countryId, states) {
  return { type: actionTypes.SET_COUNTRY_STATES, countryId, states };
}

export function loginSuccess() {
  return { type: actionTypes.LOGIN_SUCCESS };
}

export function logOut() {
  return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS };
}

export function changeUser(user) {
  return { type: actionTypes.CHANGE_USER, user };
}
