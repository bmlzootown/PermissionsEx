import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import usersSvc from '../../services/users'
import groupsSvc from '../../services/groups'
import worldsSvc from '../../services/worlds'

import { success, error } from '../../reducers/notificationReducer'
import { logoutExpiredTokenNoDispatch } from '../../reducers/loginReducer'

import {
    NavbarToggler,
    Button
} from 'reactstrap'

import localStore from '../../localstorage/localstorage'

class Header extends Component {

    constructor(props) {
        super(props)

        this.state = { saving: false }
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    sidebarToggle(e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-hidden')
    }

    sidebarMinimize(e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-minimized')
    }

    mobileSidebarToggle(e) {
        e.preventDefault()
        document.body.classList.toggle('sidebar-mobile-show')
    }

    asideToggle(e) {
        e.preventDefault()
        document.body.classList.toggle('aside-menu-hidden')
    }

    discardChanges = () => {
        if (confirm('Are you sure you want to discard local changes?')) {
            localStore.discardChanges()
            window.location.reload()
        }
    }

    saveChanges = async () => {
        const state = this.context.store.getState()

        const token = localStore.getLogin().token

        const users = state.users.users
        const groups = state.groups
        const worlds = state.worlds

        try {
            this.setState({ saving: true })
            this.props.success('Saving..')
            await worldsSvc.save(token, worlds)
            await groupsSvc.save(token, groups)
            await usersSvc.save(token, users)

            localStore.discardChanges()
            this.props.success('Changes saved successfully!')
        } catch (e) {
            if (e.response) {
                if (e.response.status === 401) {
                    this.props.logoutExpiredTokenNoDispatch(e.response.data.error)
                } else if (e.response.status === 504 || e.response.status === 0 || e.response.message.includes("Network Error")) {
                    error("Server is offline, changes saved just locally. Check that server is online.")
                } else {
                    console.log(e.response)
                }
            } else if (e.message.includes("Network Error")) {
                error("Server is offline, changes saved just locally. Check that server is online.")
            } else {
                console.log(e)
            }
        } finally {
            this.setState({ saving: false })
        }
    }

    ChangesButtons = ({ saving }) => {
        if (!localStore.containsChanges()) {
            return <div></div>
        }

        return (
            <div>
                <Button disabled color="link">Unsaved Changes</Button>
                <Button disabled={saving} onClick={this.saveChanges} color="success">Save Changes</Button>
                <Button onClick={this.discardChanges} color="danger">Discard</Button>
            </div>
        )
    }

    render() {
        return (
            <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <h5 style={{padding: '0px 0px 0px 10px'}}href="#">PermissionsEx</h5>
                <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <this.ChangesButtons saving={this.state.saving} />
                <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
            </header>
        )
    }
}

Header.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null, { success, error, logoutExpiredTokenNoDispatch }
)(Header)
