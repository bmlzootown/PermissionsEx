import React, {Component} from 'react';
import PropTypes from 'prop-types'

class SidebarForm extends Component {

  render() {
    const login = this.context.store.getState().login.login
    const name = login ? login.username : ''
   return (
      <div className="sidebar-form"><p className="text-center">Logged in as {name}</p></div>
    )
  }
}

SidebarForm.contextTypes = {
  store: PropTypes.object
}

export default SidebarForm;
