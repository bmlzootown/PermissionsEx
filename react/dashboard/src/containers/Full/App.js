import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Notification from '../../components/Notification/Notification'

import Users from '../../views/Users/Users';
import Groups from '../../views/Groups/Groups';
import Worlds from '../../views/Worlds/Worlds';
import Plugins from '../../views/Plugins/Plugins';
import Backups from '../../views/Backups/Backups';

import { initializeBackups } from '../../reducers/backupsReducer'
import { initializeGroups } from '../../reducers/groupsReducer'
import { initializePlugins } from '../../reducers/pluginsReducer'
import { initializeUsers } from '../../reducers/usersReducer'
import { initializeWorlds } from '../../reducers/worldsReducer'

class App extends Component {

    componentWillUnmount() {
        this.unsubscribe()
    }

    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate())

        const login = store.getState().login.login;
        if (login) {
            try {
                this.initialize(login)
            } catch (error) {
                console.log(error)
            }
        }
    }

    initialize = async (login) => {
        console.log('Initializing from backend')
        const token = login ? login.token : undefined
        await this.props.initializeWorlds(token)
        await this.props.initializeGroups(token)
        await this.props.initializeUsers(token)

        await this.props.initializePlugins(token)
        await this.props.initializeBackups(token)
        console.log('Initialization complete')
    }

    render() {
        return (
            <div className="app">
                <Notification />
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

App.contextTypes = {
    store: PropTypes.object
};

export default connect(
    null, { initializeBackups, initializeGroups, initializePlugins, initializeUsers, initializeWorlds }
)(App);