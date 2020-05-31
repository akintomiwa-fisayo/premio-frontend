import { actionTypes } from './action';

export const initState = {
  isLoggedIn: false,
  user: {
    status: 'active',
    accountType: 'vendor',
    id: '11',
    firstName: 'akintomiwa',
    lastName: 'fisayo',
    email: 'akintomiwa.fisayo@gmail.com',
    DOB: '2018-12-14T00:00:00.000Z',
    industry: 'fashon',
    description: 'the desctiption or bio of company comes here',
    logo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD',
    totalWithdrawals: 0,
    planId: 100,
    planBeginDate: '2019-12-17T10:05:33.557Z',
    referer: '',
    dateOfReg: '2019-12-17T10:05:33.557Z',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGY4YTg2ZGIwMGM5ZTZiZWNjYjFlZjQiLCJlbWFpbCI6ImFraW50b21pd2EuZmlzYXlvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE5OR3l0Y3VJU3ZqdTlWeEwub1BDTk9JN0RaM1cwb044MnZUMkR5OXBOaS55MHc3Ny5hZEllIiwiaWF0IjoxNTg4MzIwNDgzLCJleHAiOjE1ODg0MDY4ODN9.sScARUd6Ep3cUhLLix5n6si0Lg_vmlm2kp-CWYh8GSM',
  },

};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: true },
      };
    case actionTypes.AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: false },
      };
    case actionTypes.AUTH_SET_SESSION_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}

export default reducer;
