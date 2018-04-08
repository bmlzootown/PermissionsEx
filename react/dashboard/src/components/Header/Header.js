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
    NavbarBrand,
    Button
} from 'reactstrap'

import localStore from '../../localstorage/localstorage'

class Header extends Component {

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
            await usersSvc.save(token, users)
            await groupsSvc.save(token, groups)
            await worldsSvc.save(token, worlds)

            localStore.discardChanges()
            this.props.success('Changes saved successfully!')
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    this.props.logoutExpiredTokenNoDispatch(error.response.data.error)
                } else {
                    console.log(error.response)
                }
            } else {
                console.log(error)
            }
        }
    }

    ChangesButtons = () => {
        if (!localStore.containsChanges()) {
            return <div></div>
        }

        return (
            <div>
                <Button disabled color="link">Unsaved Changes</Button>
                <Button onClick={this.saveChanges} color="success">Save Changes</Button>
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
                <NavbarBrand href="#"></NavbarBrand>
                <NavbarToggler className="d-md-down-none mr-auto" onClick={this.sidebarToggle}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <this.ChangesButtons />
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
