import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Container } from 'reactstrap';

import Users from '../../views/Users/Users';
import Groups from '../../views/Groups/Groups';
import Worlds from '../../views/Worlds/Worlds';
import Plugins from '../../views/Plugins/Plugins';
import Backups from '../../views/Backups/Backups';

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Notification from '../../components/Notification/Notification'

import App from './App'

import { initializeLogin } from '../../reducers/loginReducer'
import Login from '../../views/Login/Login'

class Full extends Component {

  componentWillUnmount() {
    this.unsubscribe()
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate())

    this.props.initializeLogin()
  }

  render() {
    const state = this.context.store.getState()
    const login = state.login.login;
    if (!login) {
      return <div>
        <Switch>
          <Route path="/login" name="Login" render={() =>
            <Login />
          } />
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    }
    return (
      <div className="app">
        <Notification />
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <App />
              <Switch>
                <Route path="/users" name="Users" component={Users} />
                <Route path="/groups" name="Groups" component={Groups} />
                <Route path="/worlds" name="Worlds" component={Worlds} />
                <Route path="/plugins" name="Plugins" component={Plugins} />
                <Route path="/backups" name="Backups" component={Backups} />
                <Redirect from="/" to="/users" />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

Full.contextTypes = {
  store: PropTypes.object
};

export default connect(
  null, { initializeLogin }
)(Full);