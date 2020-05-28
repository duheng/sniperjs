function Request(config) {
    const {url, method, data} = config;
    // eslint-disable-next-line no-undef
    return window.fetch(url, {
        method,
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    });
}
export default Request;
  