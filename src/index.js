import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App/App';
import { PeopleListProvider } from "./contexts/PeopleListContext";
import { PersonProvider } from './contexts/RmbrMeContext';

ReactDOM.render(
  <BrowserRouter>
      <PersonProvider>
        <PeopleListProvider>
    <App/>
        </PeopleListProvider>
      </PersonProvider>
  </BrowserRouter>, 
  document.getElementById('root'));