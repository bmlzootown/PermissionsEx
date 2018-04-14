import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import localStore from '../../localstorage/localstorage'

import { initializeBackups } from '../../reducers/backupsReducer'
import { initializeGroups } from '../../reducers/groupsReducer'
import { initializePlugins } from '../../reducers/pluginsReducer'
import { initializeUsers } from '../../reducers/usersReducer'
import { initializeWorlds } from '../../reducers/worldsReducer'

class App extends Component {

    componentDidMount() {
        const login = this.context.store.getState().login.login
        if (login) {
            try {
                this.initialize(login)
            } catch (error) {
                console.log(error)
            }
        }
    }

    initialize = async (login) => {
        console.log('Initializing')
        const token = login ? login.token : undefined
        await this.props.initializeWorlds(token, localStore.getWorlds())
        await this.props.initializeGroups(token, localStore.getGroups())
        await this.props.initializeUsers(token, localStore.getUsers())

        await this.props.initializePlugins(token)
        await this.props.initializeBackups(token)
        console.log('Initialization complete', this.context.store.getState())
    }

    render() {
        return (
            <div></div>
        )
    }
}

App.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null, { initializeBackups, initializeGroups, initializePlugins, initializeUsers, initializeWorlds }
)(App)