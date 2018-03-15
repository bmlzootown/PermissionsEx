import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Users from '../../views/Users/Users';
import Groups from '../../views/Groups/Groups';
import Worlds from '../../views/Worlds/Worlds';
import Plugins from '../../views/Plugins/Plugins';
import Backups from '../../views/Backups/Backups';

import Login from '../../views/Login/Login'

import {initialize} from '../../reducers/initializer'
import {getLogin} from '../../localstorage/localstorage';

class Full extends Component {

  componentDidMount() {
    initialize()
  }

  render() {
      const login = getLogin();
    if (!login) {
      return <div>
        <Switch>
          <Route path="/login" name="Login" component={Login} />
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    }
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
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

export default Full;
