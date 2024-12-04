
const getToken = () => localStorage.getItem('token');

// Generic GET request
export const getRequest = (api, url) => {
  const token = getToken();
  return api.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
};

// Generic POST request without token
export const postRequestWithoutToken = (api, url, data) => {
  return api.post(url, data, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
};

// Generic POST request with token
export const postRequest = (api, url, data) => {
  const token = getToken();
  return api.post(url, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
};

// Generic PUT request
export const putRequest = (api, url, data) => {
  const token = getToken();
  return api.put(url, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
};

// Generic DELETE request
export const deleteRequest = (api, url) => {
  const token = getToken();
  return api.delete(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.data)
    .catch(error => Promise.reject(error));
};