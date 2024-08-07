const request = (url, options = {}, body = {}) => {
  return fetch(url, {
    body: body ? JSON.stringify(body) : null,
    ...options,
  })
    .then(async res => {
      const json = await res.json()
      if (res.ok) {
        return json;
      }
      return Promise.reject(json.message);
    });
}

export default request;
