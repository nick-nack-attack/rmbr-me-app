import jwtDecode from 'jwt-decode';
import { REACT_APP_API_TOKEN } from '../config';

let _timeoutId;
const _TEN_SECONDS_IN_MS = 10000;

const TokenService = {

    saveAuthToken(token) {
        window.localStorage.setItem(REACT_APP_API_TOKEN, token);
    },

    saveUserId(user_id) {
        window.localStorage.setItem('user_id', user_id);
    },

    getAuthToken() {
        return window.localStorage.getItem(REACT_APP_API_TOKEN);
    },

    clearAuthToken() {
        window.localStorage.removeItem(REACT_APP_API_TOKEN);
        window.localStorage.removeItem('user_id');
    },

    hasAuthToken() {
        return !!TokenService.getAuthToken();
    },

    makeBasicAuthToken(userName, password) {
        return window.btoa(`${userName}:${password}`);
    },

    parseJwt(jwt) {
        return jwtDecode(jwt);
    },

    readJwtToken() {
        return TokenService.parseJwt(TokenService.getAuthToken());
    },

    _getMsUntilExpiry(payload) {
        /*
          payload is from the JWT
          the `exp` value is in seconds, need to convert to ms, so * 1000
          calculates the difference between now and when the JWT will expire
        */
        return (payload.exp * 1000) - Date.now();
    },

    queueCallbackBeforeExpiry(callback) {
        /* get the number of ms from now until the token expires */
        const msUntilExpiry = TokenService._getMsUntilExpiry(
            TokenService.readJwtToken()
        );
        /*
          queue a callback that will happen 10 seconds before the token expires
          the callback is passed in as an argument so could be anything,
            in this app, the callback is for calling the refresh endpoint
        */
        _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS);
    },

    clearCallbackBeforeExpiry() {
        clearTimeout(_timeoutId);
    },

};

export default TokenService;
