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
