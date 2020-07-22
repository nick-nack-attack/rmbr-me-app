// for api interaction
import React, { useContext, useEffect } from 'react';

// contexts
import { AppContext } from './AppContext';
import { UserContext } from './UserContext';

// services
import TokenService from '../services/token-service';
import AppApiService from '../services/app-api-service';
import { parseWithOptions } from 'date-fns/fp';

const ApiWrapper = props => {

    // set variables
    let appContext = useContext(AppContext);
    let { dispatch } = useContext(UserContext);

    let login = () => dispatch({
        type: 'login'
    });

    let logout = () => dispatch({
        type: 'logout'
    });

    let checkIfLoggedIn = () => {
        return (
            TokenService.hasAuthToken()
                ? login()
                : logout()
        );
    };

    useEffect(() => {
        checkIfLoggedIn();
        if (TokenService.hasAuthToken) {
            let id = TokenService.getUserId();
            Promise.all([
                AppApiService.getPersonByUserId(id),
                AppApiService.getRmbrByUserId(id)
            ])
            .then(([people, rmbrs]) => {
                // set context with returned data
                appContext.dispatch({
                    type: 'set-people',
                    payload: people 
                });
                appContext.dispatch({
                    type: 'set-rmbrs',
                    payload: rmbrs
                });

            })
            .catch(err => {
                console.log('catch ran', err)
            })
        }

    }, [appContext.state.fetched]);

    return (
        <>
        { props.children }
        </>
    );

};

export default ApiWrapper;