import axios from 'axios';
import Constants from 'expo-constants';

export const login = async ({ data }) => {
  try {
    const response = await axios.post(
      Constants.manifest.extra.backendUrl + '/login',
      data
    );
    console.log(response.data)
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


export const createUser = async (
  token,
  acessToken,
  displayName,
  username,
  email,
  password
) => {
  const user = {
    displayName: displayName,
    username: username,
    email: email,
    password: password,
  };

  console.log("user data", user)

  console.log("Login authToken; accessToken", token + "; " + acessToken)
  
  const result = await axios
    .post(
      Constants.manifest.extra.backendUrl  + "/users/create",
      {
        user,
      },
      {
        headers: { "X-Auth-token": token, accesstoken: acessToken },
      }
    )
    console.log("result", result)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: error.response.data,
          },
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: "Keyrock connection failed",
          },
        };
      }
    });
  if (result.access_token) {
    return result.access_token;
  } else {
    return result;
  }
};