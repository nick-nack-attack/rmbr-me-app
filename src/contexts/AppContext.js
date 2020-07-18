import React, {
    createContext,
    useReducer
} from "react";

let AppContext = createContext();

let initialState = {
    fetched: false,
    people: [],
    rmbrs: [],
    all: [],
    error: null,
    notification: null
};

let reducer = (state, action) => {
    switch (action.type) {
        case 'set-items':
            return {
                ...state,
                fetched: true,
                people: action.payload.people,
                rmbrs: action.payload.rmbrs,
                all: action.payload.all
            };
        case 'set-people':
            return {
                ...state,
                fetched: true,
                people: action.payload
            };
        case 'set-rmbrs':
            return {
                ...state,
                fetched: true,
                rmbrs: action.payload,
            };
        case 'set-all':
            return {
                ...state,
                all: action.payload
            };
        case 'refetch':
            return {
                ...state,
                fetched: false
            };
        case 'set-error':
            return {
                ...state,
                error: action.payload
            };
        case 'set-notification':
            return {
                ...state,
                notification: action.payload
            }
        default:
            return initialState;
    };
};

const AppContextProvider = (props) => {
    let [ state, dispatch ] = useReducer(reducer, initialState);
    let value = { state, dispatch };
    return (
        <AppContext.Provider value={value}>
            { props.children }
        </AppContext.Provider>
    );
};

let AppContextConsumer = AppContext.Consumer;

export {
    AppContext,
    AppContextProvider,
    AppContextConsumer
};