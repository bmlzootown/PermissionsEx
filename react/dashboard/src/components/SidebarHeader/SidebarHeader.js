import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SidebarHeader extends Component {

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const login = this.context.store.getState().login.login
        const name = login.username
        const url = login ? `https://visage.surgeplay.com/head/150/${name}.png` : ''
        return (
            <div className="sidebar-header">
                <img src={url}></img>
                <p style={{ padding: 0, margin: 0 }}>Logged in as<br></br>{name}</p>
            </div>
        )
    }
}

SidebarHeader.contextTypes = {
    store: PropTypes.object
}

export default SidebarHeader
