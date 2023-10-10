import {serverInstance} from '../../API/ServerInstance';
import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  LOADING,
  USER_ALLDONATION,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from '../constants/action';

export const LoginwithOtp = (data, response) => {
  serverInstance('user/login-with-mobile', 'POST', data).then(res => {
    response(res);
  });
};

export const VerifyOtp = (data, response) => {
  serverInstance('user/verify-opt', 'POST', data).then(res => {
    response(res);
  });
};

export const User_AllDonation = (data, response) => {
  serverInstance('user/donation-list', 'GET', {}).then(res => {
    try {
      response(res);
    } catch (error) {
      alert(res.message);
    }
  });
};

export const loadUser = () => async dispatch => {
  try {
    serverInstance('user/profile-list', 'GET')
      .then(async res => {
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: res.profile,
        });
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
