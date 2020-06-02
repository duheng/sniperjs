function Request(config) {
    const { url, method, data } = config;
    // eslint-disable-next-line no-undef
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open(method, url, true);
    xhr.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Credentials', true);

    try {
        xhr.send(JSON.stringify(data));
    } catch (error) {
        throw error;
    }

    return xhr;
}

export default Request;
