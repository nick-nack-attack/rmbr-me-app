import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import landingPage from '../routes/landingPage/landingPage'
import LoginPage from '../routes/LoginPage/LoginPage'
import SignUpPage from '../routes/SignUpPage/SignUpPage'
import MyPeople from '../routes/MyPeople/MyPeople'
import ViewProfile from '../routes/ViewProfilePage/ViewProfilePage'
import AddNotePage from '../routes/AddNotePage/AddNotePage'
import AddPersonPage from '../routes/AddPersonPage/AddPersonPage'
import ViewProfilePage from '../routes/ViewProfilePage/ViewProfilePage'
import './App.css'

class App extends Component {

  generateNavBar() {
    return (
    <div>
        <ul>
          <li><Link to="/">rmbr me</Link></li>
          <li><Link to="/my-people">demo</Link></li>
          <li><Link to="/log-in">log in</Link></li>
          <li><Link to="/sign-in">sign up</Link></li>
        </ul>
    </div>
  )}

  render() {
    return (
      <div className="App">
        <nav className="App__nav">{this.generateNavBar()}</nav>
          <main className="App__main">
            <Switch>
              <Route
                exact path={'/'}
                component={landingPage}
              />
              <Route
                path={'/my-people'}
                component={MyPeople}
              />
              <Route
                path={'/log-in'}
                component={LoginPage}
              />
              <Route
                path={'/sign-in'}
                component={SignUpPage}
              />
              <Route
                path={'/view-profile'}
                component={ViewProfile}
              />
              <Route
                path={'/add-note'}
                component={AddNotePage}
              />
              <Route
                path={'/add-person'}
                component={AddPersonPage}
              />
              <Route 
                path={'/view-profile'}
                component={ViewProfilePage}
              />

              
            </Switch>  
          </main>
      </div>
    )
  }
}

export default App;