import React, {
    createContext,
    useReducer
} from 'react';

// Services
import TokenService from "../services/token-service";

let UserContext = createContext();

let initialState = {
    isLoggedIn: false,
    fetched: false
};

let reducer = (state, action) => {
    switch (action.type) {
        // Logs the user in. Updates state about the user.
        case 'login':
            return {
                isLoggedIn: true,
                fetched: true
            };
        case 'logout':
            // Logs the user out. Clears settings and info about user.
            TokenService.clearAuthToken();
            return {
                isLoggedIn: false,
                fetched: false
            }
        default:
            return initialState
    }
};

const UserContextProvider = (props) => {
    let [state, dispatch] = useReducer( reducer, initialState );
    let value = { state, dispatch };
    return (
        <UserContext.Provider value={value}>
            { props.children }
        </UserContext.Provider>
    );
};

let UserContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, UserContextConsumer };