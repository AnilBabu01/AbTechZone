import axios from 'axios';
import Toast from 'react-native-toast-message';
import {backendApiUrl} from '../../Config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MARK_ATTENDANCE_REQUEST,
  MARK_ATTENDANCE_SUCCESS,
  MARK_ATTENDANCE_FAIL,
  DONE_ATTENDANCE_REQUEST,
  DONE_ATTENDANCE_SUCCESS,
  MONTHLY_ATTENDANCE_REQUEST,
  MONTHLY__ATTENDANCE_SUCCESS,
  MONTHLY__ATTENDANCE_FAIL,
  ALL_HOLIDAY_REQUEST,
  ALL_HOLIDAY_ATTENDANCE_SUCCESS,
  ALL_HOLIDAY_ATTENDANCE_FAIL,
  DONE_ATTENDANCE_FAIL,
  ALL_EMPLOYEE_HOLIDAY_REQUEST,
  ALL_EMPLOYEE_HOLIDAY_ATTENDANCE_SUCCESS,
  ALL_EMPLOYEE_HOLIDAY_ATTENDANCE_FAIL,
} from '../constants/attendanceConstants';

export const MarkStudentAttendance =
  (date, batch, classname, sectionname, sessionname) => async dispatch => {
    try {
      let token = await AsyncStorage.getItem('erptoken');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      };
      dispatch({type: MARK_ATTENDANCE_REQUEST});
      const {data} = await axios.post(
        `${backendApiUrl}attendanceatudent/attendance`,
        {
          // Attendancedate: date,
          // batch: batch,
          // classname: classname,
          // sectionname: sectionname,
          // sessionname: sessionname,
          Attendancedate: date,
          batch: '',
          classname: classname,
          sectionname: sectionname,
          sessionname: sessionname,
        },
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

export const DoneStudentAttendance = udata => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };
    dispatch({type: DONE_ATTENDANCE_REQUEST});
    const {data} = await axios.put(
      `${backendApiUrl}attendanceatudent/attendance`,
      {
        data: udata,
      },
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

export const MonthlyStudentAttendance =
  (
    udata,
    months,
    rollname,
    studentname,
    status,
    classname,
    sectionname,
    sessionname,
  ) =>
  async dispatch => {
    try {
      let token = await AsyncStorage.getItem('erptoken');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      };
      dispatch({type: MONTHLY_ATTENDANCE_REQUEST});
      const {data} = await axios.post(
        `${backendApiUrl}attendanceatudent/analysisattendance`,
        {
          batch: udata,
          month: months,
          rollname: rollname,
          studentname: studentname,
          status: status,
          classname: classname,
          sectionname: sectionname,
          session: sessionname,
          // batch: '',
          // classname: 'I',
          // month: 3,
          // rollname: '',
          // sectionname: 'NONE',
          // session: '2023-2024',
          // status: '',
          // studentname: '',
        },
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

// Get all Enquiry
export const getHolidays = month => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };
    dispatch({type: ALL_HOLIDAY_REQUEST});

    const {data} = await axios.post(
      `${backendApiUrl}attendanceatudent/getholidy`,
      {
        month: Number(month),
      },
      config,
    );
    dispatch({
      type: ALL_HOLIDAY_ATTENDANCE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_HOLIDAY_ATTENDANCE_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

// Get all Enquiry
export const getEmpHolidays = month => async dispatch => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    };
    dispatch({type: ALL_EMPLOYEE_HOLIDAY_REQUEST});

    const {data} = await axios.post(
      `${backendApiUrl}EmployeeAttendance/getholidy'`,
      {
        month: Number(month),
      },
      config,
    );

    console.log('Attendace from action', data);

    dispatch({
      type: ALL_EMPLOYEE_HOLIDAY_ATTENDANCE_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_EMPLOYEE_HOLIDAY_ATTENDANCE_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};
