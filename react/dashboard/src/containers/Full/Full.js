import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Container } from 'reactstrap';

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
          <Route path="/login" name="Login" component={Login} />
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    }
    return (
      <App />
    );
  }
}

Full.contextTypes = {
  store: PropTypes.object
};

export default connect(
  null, { initializeLogin }
)(Full);