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

export const createUser = async (
  token,
  acessToken,
  username,
  email,
  password
) => {
  const user = {
    username: username,
    email: email,
    password: password
  };

  try {
    const result = await axios.post(
      Constants.manifest.extra.backendUrl + '/users/create',
      {
        user
      },
      {
        headers: { 'X-Auth-token': token, accesstoken: acessToken }
      }
    );

    if (result.access_token) {
      return result.access_token;
    } else {
      return result;
    }
  } catch (error) {
    if (error.response) {
      return {
        error: {
          statusCode: error.response.status,
          message: error.response.data
        }
      };
    } else {
      return {
        error: {
          statusCode: 500,
          message: 'Keyrock connection failed'
        }
      };
    }
  }
};

export const userEdit = async (
  token,
  accessToken,
  userId,
  username,
  enabled
) => {
  const user = {
    username: username,
    enabled: enabled
  };
  const result = await axios
    .put(
      Constants.manifest.extra.backendUrl + '/users/update/' + userId,
      {
        user
      },
      {
        headers: { 'X-Auth-token': token, accesstoken: accessToken }
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: error.response.data
          }
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: 'Keyrock connection failed'
          }
        };
      }
    });
  if (result.access_token) {
    return result.access_token;
  } else {
    return result;
  }
};

export const userDelete = async (token, accessToken, userId) => {
  const result = await axios
    .delete(Constants.manifest.extra.backendUrl + '/users/delete/' + userId, {
      headers: { 'X-Auth-token': token, accesstoken: accessToken }
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: error.response.data
          }
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: 'Keyrock connection failed'
          }
        };
      }
    });
  if (result.access_token) {
    return result.access_token;
  } else {
    return result;
  }
};

export const editRole = async (token, accessToken, role) => {
  const result = await axios
    .put(
      Constants.manifest.extra.backendUrl + '/roles/update/' + role.id,
      {
        rolName: role.name
      },
      {
        headers: { 'X-Auth-token': token, accessToken: accessToken }
      }
    )
    .then((res) => {
      const response = { data: res.data, status: res.status };
      return response;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: 'Hubo un error, intente nuevamente.'
          }
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: 'Keyrock connection failed'
          }
        };
      }
    });
  if (result.access_token) {
    return result.access_token;
  } else {
    return result;
  }
};

export const deleteRole = async (token, accessToken, roleID) => {
  const result = await axios
    .delete(Constants.manifest.extra.backendUrl + '/roles/delete/' + roleID, {
      headers: { 'X-Auth-token': token, accessToken: accessToken }
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: 'Hubo un error, intente nuevamente.'
          }
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: 'Keyrock connection failed'
          }
        };
      }
    });
  if (result.access_token) {
    return result.access_token;
  } else {
    return result;
  }
};

export const addRole = async (token, accessToken, role) => {
  const result = await axios
    .post(
      Constants.manifest.extra.backendUrl + '/roles/create/',
      { rolName: role },
      {
        headers: { 'X-Auth-token': token, accessToken: accessToken }
      }
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: 'Hubo un error, intente nuevamente.'
          }
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: 'Keyrock connection failed'
          }
        };
      }
    });
  if (result.access_token) {
    return result.access_token;
  } else {
    return result;
  }
};

export const assignRol = async (token, accessToken, userId, rolId) => {
  const result = await axios
    .put(
      Constants.manifest.extra.backendUrl + '/roles/assign',
      { rolId: rolId, userId: userId },
      {
        headers: {
          'X-Auth-token': token,
          'Content-Type': 'application/json',
          accessToken: accessToken
        }
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: error.response.data.error.message
          }
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: 'Keyrock connection failed'
          }
        };
      }
    });
  return result;
};

export const getUserRoles = async (userId, token) => {
  const result = await axios
    .get(
      Constants.manifest.extra.backendUrl + '/users/user/' + userId + '/roles',
      {
        headers: {
          'X-Auth-token': token
        }
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            statusCode: error.response.status,
            message: error.response.data.error.message
          }
        };
      } else {
        return {
          error: {
            statusCode: 500,
            message: 'Keyrock connection failed'
          }
        };
      }
    });
  return result;
};
