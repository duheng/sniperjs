import Reqwest from 'reqwest';
function Request(configParam) {
    const config = {
        contentType: 'application/json',
        withCredentials: true,
        ...configParam
    };
    return Reqwest(config);
}
export default Request;
  