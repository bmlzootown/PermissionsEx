import React, { Component } from 'react'
import PropTypes from 'prop-types'

import uuidSvc from '../../services/uuid'

class SidebarHeader extends Component {

    constructor(props) {
        super(props)

        this.state = {
            uuid: null
        }
    }

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
        const login = this.context.store.getState().login.login
        const name = login.username
        uuidSvc.getUUID(name).then(uuid => {
            this.setState({ uuid })
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const login = this.context.store.getState().login.login
        const name = login.username
        const uuid = this.state.uuid

        const url = login ? `https://visage.surgeplay.com/head/150/${uuid ? uuid : 'X-Alex'}.png` : ''
        return (
            <div className="sidebar-header">
                <img src={url}></img>
                <p style={{ padding: 0, margin: 0 }}>Logged in as<br></br><b>{name}</b></p>
            </div>
        )
    }
}

SidebarHeader.contextTypes = {
    store: PropTypes.object
}

export default SidebarHeader
