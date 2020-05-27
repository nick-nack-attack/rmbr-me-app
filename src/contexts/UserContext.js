import React, {
    Component,
    createContext,
    useReducer
} from 'react';

// Services
import TokenService from "../services/token-service";

let UserContext = createContext(({
    user_id: [],
    isLoggedIn: false
}));

export default UserContext;

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

export class UserProvider extends Component {

    state = {
        user_id: [],
        isLoggedIn: false
    }

    setUserId = (user_id, isLoggedIn) => {
        this.setState({
            user_id: localStorage.setItem('user_id', user_id),
            isLoggedIn: localStorage.setItem('isLoggedIn', isLoggedIn)
        })
    }

    setUserLoggedOut = user_id => {
        this.setState({
            isLoggedIn: false
        })
    }

    render(){

        const value = {
            user_id: this.state.user_id,
            setUserId: this.setUserId,
            setUserLoggedOut: this.setUserLoggedOut
        }

        return (
            <UserContext.Provider value={value}>
                { this.props.children }
            </UserContext.Provider>
        );

    }
};