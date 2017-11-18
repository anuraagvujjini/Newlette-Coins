import ConfigLoader from '../config/ConfigLoader';
import UserData from '../storages/UserData';
import request from 'request-promise';
class Service {
    constructor() {
        this._config = ConfigLoader;
        this._request = request;
    }

    get config() {
        return this._config;
    }

    get request() {
        return this._request;
    }

    get requestAuth() {
        return this._request.defaults({'headers': {'X-Auth-Token': UserData.sessionToken}});
    }

}
export default Service;