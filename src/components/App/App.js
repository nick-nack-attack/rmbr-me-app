// this component handles all pages in the app
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// route
import PrivateRoute from "../Utils/PrivateRoute";
import PublicRoute from "../Utils/PublicRoute";

// service
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import IdleService from "../../services/idle-service";

// component
import Header from "../Header/Header";

// styling
import './App.css';
import './App.scss';

// components
import LogInPage from "../Page/LogIn/LogInPage";
import SignUpPage from "../Page/SignUp/SignUpPage";
import PersonPage from '../Page/Person/PersonPage';
import LandingPage from "../Page/Landing/LandingPage";
import NotFoundPage from '../Page/NotFound/NotFoundPage';
import PersonList from '../List/Person/PersonList';

export default class App extends Component {

  state = {
    hasError: false,
    IdleOut: false
  };

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);
    if (TokenService.hasAuthToken()) {
      this.setState({IdleOut: false});
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken()
            .then(r => {
              console.log('refresh token posted');
            });
      });
    };
  };

  componentWillUnmount() {
    IdleService.unregisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  };

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unregisterIdleResets();
    this.setState({IdleOut: true});
    this.forceUpdate();
  };

  render() {

    this.handleDeletePerson = () => {
      this.forceUpdate();
    }

    this.renderMainPage = () => {
      return TokenService.hasAuthToken()
          ? PersonList
          : LandingPage
    };

    const mainPage = this.renderMainPage();

    return (
      <div className="App">
        <header className='App__header'>
          <Header/>
        </header>
          <main className="Main">
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
                component={ LogInPage }
              />
              <PublicRoute
                path={'/sign-up'}
                component={ SignUpPage }
              />
              <PrivateRoute
                path={'/person/:person_id'}
                component={ PersonPage }
              />
              <Route
                  component={ NotFoundPage }
              />
            </Switch>  
          </main>
      </div>
    );
  };
};