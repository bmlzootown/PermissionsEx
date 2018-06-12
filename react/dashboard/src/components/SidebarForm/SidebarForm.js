import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SidebarForm extends Component {

    render() {
        return (
            <div className="sidebar-form"></div>
        )
    }
}

SidebarForm.contextTypes = {
    store: PropTypes.object
}

export default SidebarForm
