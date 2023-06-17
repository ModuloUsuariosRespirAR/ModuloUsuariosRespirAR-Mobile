import axios from 'axios';
import Constants from 'expo-constants';

export const login = async ({ data }) => {
  try {
    const response = await axios.post(
      Constants.manifest.extra.backendUrl + '/login',
      data
    );
    return response.data;
  } catch (error) {
    throw new error();
  }
};

export const getUsers = async ({ token }) => {
  try {
    const response = await axios.get(
      Constants.manifest.extra.backendUrl + '/users/list',
      {
        headers: { 'X-Auth-token': token }
      }
    );
    return response.data;
  } catch (error) {
    throw new error();
  }
};


export const getRoles = async ({ token }) => {
  try {
    const response = await axios.get(
      Constants.manifest.extra.backendUrl + '/roles/list',
      {
        headers: { 'X-Auth-token': token }
      }
    );
    return response.data;
  } catch (error) {
    throw new error();
  }
};
