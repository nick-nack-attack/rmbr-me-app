import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom'
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
  <BrowserRouter>
      <RmbrmeProvider>
        <CssBaseline/>
            <App/>
      </RmbrmeProvider>
  </BrowserRouter>,

  document.getElementById('root'));