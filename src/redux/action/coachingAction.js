import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {backendApiUrl} from '../../Config/config';
import {
  ALL_ENQUIRY_REQUEST,
  ALL_ENQUIRY_SUCCESS,
  ALL_ENQUIRY_FAIL,
  ADD_ENQUIRY_REQUEST,
  ADD_ENQUIRY_SUCCESS,
  ADD_ENQUIRY_FAIL,
  UPDATE_ENQUIRY_REQUEST,
  UPDATE_ENQUIRY_SUCCESS,
  UPDATE_ENQUIRY_FAIL,
  DELETE_ENQUIRY_REQUEST,
  DELETE_ENQUIRY_SUCCESS,
  FILTER_ENQUIRY_REQUEST,
  FILTER__ENQUIRY_SUCCESS,
  FILTER__ENQUIRY_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  DELETE_ENQUIRY_FAIL,
  ADD_PAYCOACHINGFEE_REQUEST,
  ADD_PAYCOACHINGFEE_SUCCESS,
  ADD_PAYCOACHINGFEE_FAIL,
} from '../constants/coachingContants';
import {serverInstance} from '../../API/ServerInstance';
import {
  ADD_FEESTRUCTURE_FAIL,
  ADD_FEESTRUCTURE_REQUEST,
  ADD_FEESTRUCTURE_SUCCESS,
} from '../constants/commanConstants';
// post add enquiry
export const Addenquiry = datas => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };
    dispatch({type: ADD_ENQUIRY_REQUEST});

    const {data} = await axios.post(
      `${backendApiUrl}coaching/enquiry`,
      datas,
      config,
    );

    if (data?.status) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data?.msg,
      });
    }

    dispatch({
      type: ADD_ENQUIRY_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ENQUIRY_FAIL,
      payload: error?.response?.data?.msg,
    });
    console.log('data from action', error);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.response?.data?.msg,
    });
  }
};

// post add enquiry
export const Updateenquiry = (datas, setOpen) => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };
    dispatch({type: UPDATE_ENQUIRY_REQUEST});

    const {data} = await axios.put(
      `${backendApiUrl}coaching/enquiry`,
      datas,
      config,
    );

    if (data?.status) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data?.msg,
      });
    }

    dispatch({
      type: UPDATE_ENQUIRY_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ENQUIRY_FAIL,
      payload: error?.response?.data?.msg,
    });
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.response?.data?.msg,
    });
  }
};

// delete  enquiry
export const deleteenquiry = deleteid => async dispatch => {
  try {
    dispatch({type: DELETE_ENQUIRY_REQUEST});
    serverInstance('coaching/enquiry', 'delete', {
      id: deleteid,
    }).then(res => {
      if (res?.status) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.msg,
        });

        dispatch({
          type: DELETE_ENQUIRY_SUCCESS,
          payload: res,
        });
      }

      console.log('delete enwuory from action ', res);
    });
  } catch (error) {
    dispatch({
      type: DELETE_ENQUIRY_FAIL,
      payload: error?.response?.data?.msg,
    });
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.response?.data?.msg,
    });
  }
};

// Get all Enquiry
export const getenquiries = (page, limit, setPage) => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };
    dispatch({type: ALL_ENQUIRY_REQUEST});
    if (page) {
      setPage(page + 1);
      const {data} = await axios.get(
        `${backendApiUrl}coaching/enquiry?page=${page}&limit=${limit}`,

        config,
      );

      dispatch({
        type: ALL_ENQUIRY_SUCCESS,
        payload: data?.data,
      });
    } else {
      const {data} = await axios.get(
        `${backendApiUrl}coaching/enquiry`,

        config,
      );

      dispatch({
        type: ALL_ENQUIRY_SUCCESS,
        payload: data?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: ALL_ENQUIRY_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

// Get all Enquiry
export const getFILTERenquiries =
  (fromdate, todate, name) => async dispatch => {
    try {
      let token = await AsyncStorage.getItem('erptoken');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      };
      dispatch({type: FILTER_ENQUIRY_REQUEST});
      let url = `${backendApiUrl}coaching/enquiry?fromdate=${fromdate}&todate=${todate}&name=${name}`;
      const {data} = await axios.get(url, config);

      dispatch({
        type: FILTER__ENQUIRY_SUCCESS,
        payload: data?.data,
      });
    } catch (error) {
      dispatch({
        type: FILTER__ENQUIRY_FAIL,
        payload: error?.response?.data?.msg,
      });
    }
  };

// post Update profile
export const UpdateProfile = (datas, setOpen) => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
      },
    };
    dispatch({type: UPDATE_PROFILE_REQUEST});

    const {data} = await axios.put(
      `${backendApiUrl}comman/profile`,
      datas,
      config,
    );
    if (data?.status) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data?.msg,
      });
    }

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data?.status,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error?.response?.data?.msg,
    });
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.response?.data?.msg,
    });
  }
};

export const Addpayfee = (datas, setOpen) => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };
    dispatch({type: ADD_PAYCOACHINGFEE_REQUEST});

    const {data} = await axios.post(
      `${backendApiUrl}Student/pacoachingfee`,
      datas,
      config,
    );
    if (data?.status) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data?.msg,
      });
    }
    dispatch({
      type: ADD_PAYCOACHINGFEE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PAYCOACHINGFEE_FAIL,
      payload: error?.response?.data?.msg,
    });
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.response?.data?.msg,
    });
  }
};
