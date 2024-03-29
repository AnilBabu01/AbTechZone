import axios from "axios";
import { toast } from "react-toastify";
import { backendApiUrl } from "../../Config/config";
import { serverInstance } from "../../API/ServerInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GET_ASSETTYPE_REQUEST,
  GET_ASSETTYPE_SUCCESS,
  GET_ASSET_REQUEST,
  GET_ASSET_SUCCESS,
  GET_EXPENSESTYPE_REQUEST,
  GET_EXPENSESTYPE_SUCCESS,
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  GET_TRANSFER_REQUEST,
  GET_TRANSFER_SUCCESS,
  GET_TRANSFERFAIL,
  CLEAR_ERRORS,
} from "../constants/expensesConstants";

// Get all books
export const GetAssetType =
  (courseorclass, BookId, auther) => async (dispatch) => {
    try {
      let token = await AsyncStorage.getItem('erptoken');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };
      dispatch({ type: GET_ASSETTYPE_REQUEST });

      if (courseorclass || BookId || auther) {
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addassettype?courseorclass=${courseorclass}&BookId=${BookId}&auther=${auther}`,
          config
        );

        dispatch({
          type: GET_ASSETTYPE_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: GET_ASSETTYPE_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addassettype`,
          config
        );

        dispatch({
          type: GET_ASSETTYPE_SUCCESS,
          payload: data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: CLEAR_ERRORS,
        payload: error?.response?.data?.msg,
      });
    }
  };

// Get all books
export const GetAsset =
  (fromdate, todate, assettypename) => async (dispatch) => {
    try {
    let token = await AsyncStorage.getItem('erptoken');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };
      dispatch({ type: GET_ASSET_REQUEST });

      if (fromdate || todate || assettypename) {
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addasset?fromdate=${fromdate}&todate=${todate}&assettypename=${assettypename}`,
          config
        );

        dispatch({
          type: GET_ASSET_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: GET_ASSET_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addasset`,
          config
        );

        dispatch({
          type: GET_ASSET_SUCCESS,
          payload: data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: CLEAR_ERRORS,
        payload: error?.response?.data?.msg,
      });
    }
  };

// Get all books
export const GetExpensesType =
  (courseorclass, BookId, auther) => async (dispatch) => {
    try {
    let token = await AsyncStorage.getItem('erptoken');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };
      dispatch({ type: GET_EXPENSESTYPE_REQUEST });

      if (courseorclass || BookId || auther) {
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addexpensestype?courseorclass=${courseorclass}&BookId=${BookId}&auther=${auther}`,
          config
        );

        dispatch({
          type: GET_EXPENSESTYPE_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: GET_EXPENSESTYPE_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addexpensestype`,
          config
        );

        dispatch({
          type: GET_EXPENSESTYPE_SUCCESS,
          payload: data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: CLEAR_ERRORS,
        payload: error?.response?.data?.msg,
      });
    }
  };

// Get all books
export const GetExpenses =
  (fromdate, todate, Expensestype, PayOption, sessionname) =>
  async (dispatch) => {
    try {
    let token = await AsyncStorage.getItem('erptoken');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };
      dispatch({ type: GET_EXPENSES_REQUEST });

      if (fromdate || todate || Expensestype || PayOption || sessionname) {
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addexpenses?fromdate=${fromdate}&todate=${todate}&expensestype=${Expensestype}&PayOption=${PayOption}&sessionname=${sessionname}`,
          config
        );

        dispatch({
          type: GET_EXPENSES_SUCCESS,
          payload: data?.data,
        });
      } else {
        let date = new Date();
        let fullyear = date.getFullYear();
        let lastyear = date.getFullYear() - 1;
        let sessionss = `${lastyear}-${fullyear}`;
        dispatch({ type: GET_EXPENSES_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}expenses/addexpenses?sessionname=${sessionss}`,
          config
        );

        dispatch({
          type: GET_EXPENSES_SUCCESS,
          payload: data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: CLEAR_ERRORS,
        payload: error?.response?.data?.msg,
      });
    }
  };

// Get all books
export const GetTransferAmmount =
  (fromdate, todate, Transfer_Mode, sessionname) => async (dispatch) => {
    try {
    let token = await AsyncStorage.getItem('erptoken');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };
      dispatch({ type: GET_TRANSFER_REQUEST });

      if (fromdate || todate || Transfer_Mode || sessionname) {
        const { data } = await axios.get(
          `${backendApiUrl}expenses/amounttransfer?fromdate=${fromdate}&todate=${todate}&Transfer_Mode=${Transfer_Mode}&sessionname=${sessionname}`,
          config
        );

        dispatch({
          type: GET_TRANSFER_SUCCESS,
          payload: data?.data,
        });
      } else {
        let date = new Date();
        let fullyear = date.getFullYear();
        let lastyear = date.getFullYear() - 1;
        let sessionss = `${lastyear}-${fullyear}`;
        dispatch({ type: GET_TRANSFER_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}expenses/amounttransfer?sessionname=${sessionss}`,
          config
        );

        dispatch({
          type: GET_TRANSFER_SUCCESS,
          payload: data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: CLEAR_ERRORS,
        payload: error?.response?.data?.msg,
      });
    }
  };
