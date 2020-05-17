import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from "../Header/Header";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";

import MyPeople from '../../routes/MyPeople/MyPeople';
import LandingPage from "../../routes/LandingPage/LandingPage";
import PersonPage from '../../routes/PersonPage/PersonPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import IdleService from "../../services/idle-service";
import './App.css'

import AddNotePage from '../../routes/AddNotePage/AddNotePage'
import AddPersonPage from '../../routes/AddPersonPage/AddPersonPage'

class App extends Component {

  state = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return { hasError: true }
  };

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle)
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken()
      })
    }
  };

  componentWillUnmount() {
    IdleService.unregisterIdleResets()
    TokenService.queueCallbackBeforeExpiry()
  };

  logoutFromIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unregisterIdleResets()
    this.forceUpdate()
  };

  render() {
    return (
      <div className="App">
        <header className='App__header'>
          <Header/>
        </header>
          <main className="App__main">
            { this.state.hasError && <p className='red'>There was an error!</p> }
            <Switch>
              <Route
                exact path={'/'}
                component={LandingPage}
              />
              <PublicOnlyRoute
                path={'/login'}
                component={LoginPage}
              />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationPage}
              />
              <PrivateRoute
                path={'/my-people'}
                component={MyPeople}
              />
              <PrivateRoute
                path={'/people/:personId'}
                component={PersonPage}
              />
              <PrivateRoute
                path={'/add-note'}
                component={AddNotePage}
              />
              <PrivateRoute
                path={'/add-person'}
                component={AddPersonPage}
              />
              {/*<PrivateRoute*/}
              {/*    path={'/edit-note/:noteId'}*/}
              {/*    component={EditNotePage}*/}
              {/*/>*/}
              {/*<PrivateRoute*/}
              {/*    path={'/edit-person/:personId'}*/}
              {/*    component={EditPersonPage}*/}
              {/*/>*/}
              <Route
                  component={NotFoundPage}
              />
            </Switch>  
          </main>
      </div>
    )
  }
}

export default App;