import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createBackup } from '../../reducers/backupsReducer'

import {
    ListGroup,
    Col, Row
} from 'reactstrap'

import { BigAddButton } from '../../components/Buttons/AddButton'

import Backup from './Backup'

class Backups extends Component {

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    createBackup = (token) => {
        this.props.createBackup(token)
    }

    render() {
        const token = this.context.store.getState().login.login.token
        const backups = this.context.store.getState().backups
        const Backups = backups.map((backup, indx) => <Backup key={indx} backup={backup} token={token} />)

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md='0'>
                        <BigAddButton className="float-left" what='new Backup' add={() => this.createBackup(token)} />
                    </Col>
                    <Col>
                        <ListGroup>
                            {Backups}
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}

Backups.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null, { createBackup }
)(Backups)