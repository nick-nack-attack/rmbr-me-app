// layer with nested contexts
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as ServiceWorker from './serviceWorker';

// set context providers
import { UserContextProvider, UserContext } from './contexts/UserContext';
import ApiWrapper from './contexts/ApiWrapper';
import { AppContextProvider } from './contexts/AppContext';

// main app
import App from './components/App/App';

//styling
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faPlus, 
    faChevronLeft, 
    faTrashAlt, 
    faCheckDouble, 
    faEdit, 
    faAngleRight, 
    faSignOutAlt, 
    faPen, 
    faFolderOpen, 
    faCheckSquare, 
    faBirthdayCake, 
    faBolt, 
    faCalendarCheck, 
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { RmbrmeProvider } from "./contexts/RmbrmeContext";

library.add(
    faPlus, 
    faChevronLeft, 
    faTrashAlt, 
    faCheckDouble, 
    faEdit, 
    faAngleRight, 
    faSignOutAlt, 
    faPen, 
    faFolderOpen, 
    faCheckSquare, 
    faBirthdayCake, 
    faBolt, 
    faCalendarCheck, 
    faArrowLeft
);

ReactDOM.render(
    <Router>
        <AppContextProvider>
            
                <UserContextProvider>
                    <ApiWrapper>
                    <CssBaseline/>
                        <App/>
                    </ApiWrapper>
                </UserContextProvider>
            
        </AppContextProvider>
    </Router>,

  document.getElementById('root'));