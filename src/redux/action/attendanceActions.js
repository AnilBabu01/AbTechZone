import axios from "axios";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backendApiUrl } from "../../Config/config";
import {
  MARK_ATTENDANCE_REQUEST,
  MARK_ATTENDANCE_SUCCESS,
  MARK_ATTENDANCE_FAIL,
  DONE_ATTENDANCE_REQUEST,
  DONE_ATTENDANCE_SUCCESS,
  MONTHLY_ATTENDANCE_REQUEST,
  MONTHLY__ATTENDANCE_SUCCESS,
  MONTHLY__ATTENDANCE_FAIL,
  DONE_ATTENDANCE_FAIL,
} from "../constants/attendanceConstants";

export const MarkStudentAttendance = (date, batch) => async (dispatch) => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    dispatch({ type: MARK_ATTENDANCE_REQUEST });
    const { data } = await axios.post(
      `${backendApiUrl}attendanceatudent/attendance`,
      {
        Attendancedate: date,
        batch: batch,
      },
      config
    );

    console.log("search", date, batch);
    if (data?.status) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data?.msg,
      });
    }

    dispatch({
      type: MARK_ATTENDANCE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: MARK_ATTENDANCE_FAIL,
      payload: error?.response?.data?.msg,
    });
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.response?.data?.msg,
    });
  }
};

export const DoneStudentAttendance = (udata) => async (dispatch) => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    dispatch({ type: DONE_ATTENDANCE_REQUEST });
    const { data } = await axios.put(
      `${backendApiUrl}attendanceatudent/attendance`,
      {
        data: udata,
      },
      config
    );
    console.log("Done Attendance is ", data);
    if (data?.status) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data?.msg,
      });
    }

    dispatch({
      type: DONE_ATTENDANCE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: DONE_ATTENDANCE_FAIL,
      payload: error?.response?.data?.msg,
    });
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.response?.data?.msg,
    });
  }
};

export const MonthlyStudentAttendance = (udata, months) => async (dispatch) => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    dispatch({ type: MONTHLY_ATTENDANCE_REQUEST });
    const { data } = await axios.post(
      `${backendApiUrl}attendanceatudent/analysisattendance`,
      {
        batch: udata,
        month: months,
      },
      config
    );

    if (data?.status) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data?.msg,
      });
    }

    dispatch({
      type: MONTHLY__ATTENDANCE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: MONTHLY__ATTENDANCE_FAIL,
      payload: error?.response?.data?.msg,
    });
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.response?.data?.msg,
    });
  }
};
