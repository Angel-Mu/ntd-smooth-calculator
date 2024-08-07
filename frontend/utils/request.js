const request = (url, options = {}, body = {}) => {
  return fetch(url, {
    ...options,
    ...(['GET', 'HEAD'].includes(options.method) ? { body: JSON.stringify(body) } : {}),
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
