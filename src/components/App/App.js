import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from "../Header/Header";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicRoute from "../Utils/PublicRoute";

import PersonPage from '../../routes/PersonPage/PersonPage'
import LogInPage from '../../routes/LogInPage/LogInPage'
import SignUpPage from '../../routes/SignUpPage/SignUpPage'
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";

import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import IdleService from "../../services/idle-service";
import './App.css'
import UserLoggedOut from "../UserLoggedOut/UserLoggedOut";
import PersonList from "../PersonList/PersonList";

export default class App extends Component {

  state = {
    hasError: false,
    IdleOut: false
  };

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle)
    if (TokenService.hasAuthToken()) {
      this.setState({IdleOut: false})
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken()
            .then(r => {
              console.log('refresh token posted')
            })
      })
    }
  };

  componentWillUnmount() {
    IdleService.unregisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  };

  logoutFromIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unregisterIdleResets()
    this.setState({IdleOut: true})
    this.forceUpdate()
  };

  renderMainPage = () => {
    return TokenService.hasAuthToken()
        ? PersonList
        : UserLoggedOut
  }

  render() {

    const mainPage = this.renderMainPage()
    return (
      <div className="App">
        <header className='App__header'>
          <Header/>
        </header>
          <main className="App__main">
            { this.state.IdleOut === true
                ? <div role='alert'><p className='error_message'>You have been logged out due to inactivity</p></div>
                : ""
            }
            { this.state.hasError && <p className='red'>There was an error!</p> }
            <Switch>
              <Route
                  exact path={'/'}
                  component={ mainPage }
              />
              <PublicRoute
                path={'/log-in'}
                component={LogInPage}
              />
              <PublicRoute
                path={'/sign-up'}
                component={SignUpPage}
              />
              <PrivateRoute
                path={'/person/:person_id'}
                component={PersonPage}
              />
              <Route
                  component={NotFoundPage}
              />
            </Switch>  
          </main>
      </div>
    )
  }
}