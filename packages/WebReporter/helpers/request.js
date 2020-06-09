import { stringify } from 'querystring';

function Request(config) {
    const { url, method, data } = config;

    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send(stringify(data));

    return xhr;
}

export default Request;
