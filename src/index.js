import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App/App';
import { PersonProvider } from "./contexts/PersonContext";
import { RmbrProvider } from './contexts/RmbrContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import { UserContext, UserProvider } from "./contexts/UserContext";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faPlus, faChevronLeft, faTrashAlt, faCheckDouble, faEdit, faAngleRight, faSignOutAlt, faPen, faFolderOpen, faCheckSquare, faBirthdayCake, faBolt, faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';

library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble, faEdit, faAngleRight, faSignOutAlt, faPen, faFolderOpen, faCheckSquare, faBirthdayCake, faBolt, faCalendarCheck)

ReactDOM.render(
  <BrowserRouter>
      <UserProvider>
      <PersonProvider>
        <RmbrProvider>
            <CssBaseline />
            <App/>
        </RmbrProvider>
      </PersonProvider>
      </UserProvider>
  </BrowserRouter>, 
  document.getElementById('root'));