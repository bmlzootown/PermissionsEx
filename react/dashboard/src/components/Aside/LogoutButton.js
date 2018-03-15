import React, { Component } from 'react';

import { Button, Card } from 'reactstrap'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../reducers/loginReducer'

class LogoutButton extends Component {

    handleLogout = (event) => {
        event.preventDefault()
        this.props.logout()
    }

    render() {
        return (
            <Card className="p-4">
                <Button color="danger" onClick={this.handleLogout} className="px-4">Log Out</Button>
            </Card>
        )
    }
}

LogoutButton.contextTypes = {
    store: PropTypes.object
};

export default connect(
    null, { logout }
)(LogoutButton);