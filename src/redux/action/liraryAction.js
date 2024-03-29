import axios from "axios";
import { toast } from "react-toastify";
import { backendApiUrl } from "../../Config/config";
import { serverInstance } from "../../API/ServerInstance";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAIL,
  CLEAR_ERRORS,
} from "../constants/libraryConstants";

// Get all books
export const GetBooks = (courseorclass, BookId, auther,stream) => async (dispatch) => {
  try {
    let token = await AsyncStorage.getItem('erptoken');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    dispatch({ type: GET_BOOK_REQUEST });

    if (courseorclass || BookId || auther||stream) {
      const { data } = await axios.get(
        `${backendApiUrl}library/addbook?courseorclass=${courseorclass}&BookId=${BookId}&auther=${auther}&stream=${stream}`,
        config
      );
      console.log("get book list from actions", data?.data);
      dispatch({
        type: GET_BOOK_SUCCESS,
        payload: data?.data,
      });
    } else {
      dispatch({ type: GET_BOOK_REQUEST });
      const { data } = await axios.get(
        `${backendApiUrl}library/addbook`,
        config
      );
      console.log("get book list from actions", data?.data);
      dispatch({
        type: GET_BOOK_SUCCESS,
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
