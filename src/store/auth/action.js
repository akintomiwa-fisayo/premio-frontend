export const actionTypes = {
  AUTH_LOGIN_REQUEST: 'AUTH_LOGIN_REQUEST',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
  AUTH_CHECK_AUTHORIZATION: 'AUTH_CHECK_AUTHORIZATION',
  AUTH_SET_SESSION_USER: 'AUTH_SET_SESSION_USER',
};

export function login() {
  return { type: actionTypes.AUTH_LOGIN_REQUEST };
}

export function loginSuccess() {
  return { type: actionTypes.AUTH_LOGIN_SUCCESS };
}

export function logOut() {
  return { type: actionTypes.AUTH_LOGOUT };
}

export function logOutSuccess() {
  return { type: actionTypes.AUTH_LOGOUT_SUCCESS };
}

export function setSessionUser(user) {
  return { type: actionTypes.AUTH_SET_SESSION_USER, user };
}
