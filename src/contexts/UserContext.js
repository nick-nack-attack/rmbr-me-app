import React, {
    Component,
    createContext,
} from 'react';

let UserContext = createContext(({
    user_id: [],
    isLoggedIn: false
}));

export default UserContext;

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