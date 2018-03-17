import React, { Component } from 'react';
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
    const url = login ? `https://minotar.net/avatar/${login.username}/100` : ''
    return (
      <div className="sidebar-header">
        <img src={url}></img>
      </div>
    )
  }
}

SidebarHeader.contextTypes = {
  store: PropTypes.object
}

export default SidebarHeader;
