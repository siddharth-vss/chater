import { initialState } from './appContext';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,

  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_BEGIN,

  LOGOUT_USER,

} from './actions'

const reducer = (state, action) => {

  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,

      email: action.payload.email,
      name: action.payload.name,
      _id: action.payload._id,
      pic: action.payload.pic,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created! Redirecting...',
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      email: action.payload.email,
      name: action.payload.name,
      _id: action.payload._id,
      pic: action.payload.pic,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting...',
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all correct values!  ',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
     };
  }

  throw new Error(`no such action :${action.type}`);
};
export default reducer;






