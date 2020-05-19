import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App/App';
import { PeopleListProvider } from "./contexts/PeopleListContext";
import { RmbrMeProvider } from './contexts/RmbrMeContext';

ReactDOM.render(
  <BrowserRouter>
      <RmbrMeProvider>
        <PeopleListProvider>
    <App/>
        </PeopleListProvider>
      </RmbrMeProvider>
  </BrowserRouter>, 
  document.getElementById('root'));