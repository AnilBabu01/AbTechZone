import axios from "axios";
import { toast } from "react-toastify";
import { backendApiUrl } from "../../Config/config";
import { serverInstance } from "../../API/ServerInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ALL_COACHINGMONTHLYFEE_REQUEST,
  ALL_COACHINGMONTHLYFEE_SUCCESS,
  ALL_COACHINGMONTHLYFEE_FAIL,
  CLEAR_ERRORS,
} from "../constants/reportConstants";

// Get all Enquiry
export const getCoachingMonthlyFee =
  (fromdate, scoursename, sstudent, rollnumber, month, sbatch) =>
  async (dispatch) => {
    try {
      let token = await AsyncStorage.getItem('erptoken');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };
      if (fromdate || scoursename || sstudent || rollnumber||month&&sbatch) {
        dispatch({ type: ALL_COACHINGMONTHLYFEE_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}report/cochingmonthlyfee?name=${scoursename}&fromdate=${fromdate}&studentname=${sstudent}&rollnumber=${rollnumber}&month=${month}&sbatch=${sbatch}`,
          config
        );
        dispatch({
          type: ALL_COACHINGMONTHLYFEE_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: ALL_COACHINGMONTHLYFEE_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}report/cochingmonthlyfee`,

          config
        );
        dispatch({
          type: ALL_COACHINGMONTHLYFEE_SUCCESS,
          payload: data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_COACHINGMONTHLYFEE_FAIL,
        payload: error?.response?.data?.msg,
      });
    }
  };

// Get all Enquiry
export const getPrintReceipt =
  (fromdate, scoursename, sstudent, rollnumber) => async (dispatch) => {
    try {
     let token = await AsyncStorage.getItem('erptoken');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };
      if (fromdate || scoursename || sstudent || rollnumber) {
        dispatch({ type: ALL_RECEIPTDATA_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}student/getreceiptdata?name=${scoursename}&fromdate=${fromdate}&studentname=${sstudent}&rollnumber=${rollnumber}`,
          config
        );
        dispatch({
          type: ALL_RECEIPTDATA_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: ALL_RECEIPTDATA_REQUEST });
        const { data } = await axios.get(
          `${backendApiUrl}student/getreceiptdata`,

          config
        );
        dispatch({
          type: ALL_RECEIPTDATA_SUCCESS,
          payload: data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ALL_RECEIPTDATA_FAIL,
        payload: error?.response?.data?.msg,
      });
    }
  };
