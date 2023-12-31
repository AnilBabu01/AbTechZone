import {backendApiUrl} from '../Config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const serverInstance = async (path, method = 'get', payload, token) => {
  let tokens = await AsyncStorage.getItem('erptoken');
  let headers = {
    'Content-Type': 'application/json',
    Authorization: `${tokens}`,
  };
  return new Promise((resolve, reject) => {
    let fetchOptions = {
      method,
      headers,
    };
    if (payload) fetchOptions.body = JSON.stringify(payload);
    fetch(backendApiUrl + path, fetchOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};


export const serverFormdataInstance = async (path, method = 'get', payload, token) => {
  let tokens = await AsyncStorage.getItem('erptoken');
  let headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `${tokens}`,
  };
  return new Promise((resolve, reject) => {
    let fetchOptions = {
      method,
      headers,
    };
    if (payload) fetchOptions.body = JSON.stringify(payload);
    fetch(backendApiUrl + path, fetchOptions)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

