import React, { Component } from 'react'

import { Button, Card, CardBody } from 'reactstrap'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../reducers/loginReducer'

class LogoutButton extends Component {

    handleLogout = (event) => {
        event.preventDefault()
        this.props.logout()
        document.body.classList.toggle('aside-menu-hidden')
    }

    render() {
        return (
            <Card style={{ float: 'bottom', bottom: '3%', position: 'absolute', width: '100%' }}>
                <CardBody>
                    <Button style={{ width: '100%' }} color="danger" onClick={this.handleLogout}>Log Out</Button>
                </CardBody>
            </Card>
        )
    }
}

LogoutButton.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null, { logout }
)(LogoutButton)