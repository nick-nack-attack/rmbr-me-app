import { REACT_APP_API_ENDPOINT } from "../config";
import TokenService from "./token-service";
import IdleService from "./idle-service";

const AuthApiService = {
    postUser(user) {
        return fetch(`${ REACT_APP_API_ENDPOINT }/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    postLogin(credentials) {
        return fetch(`${REACT_APP_API_ENDPOINT}/auth/login`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
                .then(res => {
                    /*
                        whenever a login is performed:
                        1. save the token in local storage
                        2. queue auto logout when the user goes idle
                        3. queue a call to the refresh endpoint based on the JWT's exp value
                    */
                    TokenService.saveAuthToken(res.authToken)
                    TokenService.saveUserId(res.user_id)
                    IdleService.registerIdleTimerResets()
                    TokenService.queueCallbackBeforeExpiry()
            })
      },

    postRefreshToken() {
        return fetch(`${REACT_APP_API_ENDPOINT}/auth/refresh`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(res => {
                /*
                  similar logic to whenever a user logs in, the only differences are:
                  - we don't need to queue the idle timers again as the user is already logged in.
                  - we'll catch the error here as this refresh is happening behind the scenes
                */
                TokenService.saveAuthToken(res.authToken)
                TokenService.saveUserId(res.user_id)
                TokenService.queueCallbackBeforeExpiry()
                return res
            })
            .catch(err => {
                console.log('refresh token request error:', err)
            })
    }
}

export default AuthApiService;
