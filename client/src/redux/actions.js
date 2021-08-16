import { COUNTER, AUTH } from './constants';
import axios from 'axios';

export const addCounter = () => {
  return {
    type: COUNTER,
  };
};

export const profileState = (profile) => {
  return {
    type: AUTH,
    profile,
  };
};

export const authCheck = () => {
  return (dispatch) => {
    axios.get(`/api/me`).then((res) => {
      dispatch(profileState(res.data.currentUser));
    });
  };
};
