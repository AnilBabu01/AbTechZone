import axios from "axios";
import { toast } from "react-toastify";
import { backendApiUrl } from "../../Config/config";
import { serverInstance } from "../../API/ServerInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GET_HOSTEL_SUCCESS,
  GET_HOSTEL_REQUEST,
  GET_HOSTEL_FAIL,
  GET_ROOM_CATEGORY_FAIL,
  GET_ROOM_CATEGORY_SUCCESS,
  GET_ROOM_CATEGORY_REQUEST,
  GET_ROOM_FACILITY_REQUEST,
  GET_ROOM_FACILITY_SUCCESS,
  GET_ROOM_FACILITY_FAIL,
  GET_ROOM_REQUEST,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAIL,
  GET_CHECKIN_FAIL,
  GET_CHECKIN_SUCCESS,
  GET_CHECKIN_REQUEST,
  CLEAR_ERRORS,
} from "../constants/hostelConstants";

// Get all Category
export const GetCategory = (categoryname) => async (dispatch) => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    dispatch({ type: GET_ROOM_CATEGORY_REQUEST });

    if (categoryname) {
      const { data } = await axios.get(
        `${backendApiUrl}hostel/category?categoryname=${categoryname}`,
        config
      );

      dispatch({
        type: GET_ROOM_CATEGORY_SUCCESS,
        payload: data?.data,
      });
    } else {
      dispatch({ type: GET_ROOM_CATEGORY_REQUEST });
      const { data } = await axios.get(
        `${backendApiUrl}hostel/category`,
        config
      );

      dispatch({
        type: GET_ROOM_CATEGORY_SUCCESS,
        payload: data?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ROOM_CATEGORY_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

// Get all Facility
export const GetFacility = (facilityname) => async (dispatch) => {
  try {
   let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    dispatch({ type: GET_ROOM_FACILITY_REQUEST });

    if (facilityname) {
      const { data } = await axios.get(
        `${backendApiUrl}hostel/facility?facilityname=${facilityname}`,
        config
      );
      console.log("get book list from actions", data?.data);
      dispatch({
        type: GET_ROOM_FACILITY_SUCCESS,
        payload: data?.data,
      });
    } else {
      dispatch({ type: GET_ROOM_FACILITY_REQUEST });
      const { data } = await axios.get(
        `${backendApiUrl}hostel/facility`,
        config
      );

      dispatch({
        type: GET_ROOM_FACILITY_SUCCESS,
        payload: data?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ROOM_FACILITY_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

// Get all Facility
export const GetHostel = (hostelname) => async (dispatch) => {
  try {
   let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    dispatch({ type: GET_HOSTEL_REQUEST });

    if (hostelname) {
      const { data } = await axios.get(
        `${backendApiUrl}hostel/addhostel?hostelname=${hostelname}`,
        config
      );

      dispatch({
        type: GET_HOSTEL_SUCCESS,
        payload: data?.data,
      });
    } else {
      dispatch({ type: GET_HOSTEL_REQUEST });
      const { data } = await axios.get(
        `${backendApiUrl}hostel/addhostel`,
        config
      );

      dispatch({
        type: GET_HOSTEL_SUCCESS,
        payload: data?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_HOSTEL_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

// Get all Facility
export const GetRoom = (hostelname) => async (dispatch) => {
  try {
   let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    dispatch({ type: GET_ROOM_REQUEST });

    if (hostelname) {
      const { data } = await axios.get(
        `${backendApiUrl}hostel/addroom?hostelname=${hostelname}`,
        config
      );

      dispatch({
        type: GET_ROOM_SUCCESS,
        payload: data?.data,
      });
    } else {
      dispatch({ type: GET_ROOM_REQUEST });
      const { data } = await axios.get(
        `${backendApiUrl}hostel/addroom`,
        config
      );

      dispatch({
        type: GET_ROOM_SUCCESS,
        payload: data?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ROOM_FAIL,
      payload: error?.response?.data?.msg,
    });
  }
};

// Get all Facility
export const GetCheckin =
  (sessionname, sectionname, sno, checkinstatus, scoursename, hostelname) =>
  async (dispatch) => {
    try {
     let token = await AsyncStorage.getItem('erptoken');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };
      dispatch({ type: GET_CHECKIN_REQUEST });

      if (
        sessionname ||
        sectionname ||
        sno ||
        checkinstatus ||
        scoursename ||
        hostelname
      ) {
        const { data } = await axios.post(
          `${backendApiUrl}hostel/GetAllCheckin`,
          {
            sessionname,
            sectionname,
            sno,
            checkinstatus,
            scoursename,
            hostelname,
          },
          config
        );

        dispatch({
          type: GET_CHECKIN_SUCCESS,
          payload: data?.data,
        });
      } else {
        dispatch({ type: GET_CHECKIN_REQUEST });

        serverInstance("hostel/GetAllCheckin", "post").then((res) => {
          if (res?.status === true) {
            dispatch({
              type: GET_CHECKIN_SUCCESS,
              payload: res?.data,
            });
          }
        });
      }
    } catch (error) {
      dispatch({
        type: GET_CHECKIN_FAIL,
        payload: error?.response?.data?.msg,
      });
    }
  };
