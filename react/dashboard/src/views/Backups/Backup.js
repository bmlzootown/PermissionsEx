import React from 'react'
import { connect } from 'react-redux'

import {
    createBackup,
    cloneBackup,
    removeBackup,
    restoreBackup
} from '../../reducers/backupsReducer'

import {
    ListGroupItem,
    Media,
    Button,
    Row,
    Col
} from 'reactstrap'

import { BiggestRemoveButton } from '../../components/Buttons/RemoveButton'
import { BiggestDuplicateButton } from '../../components/Buttons/DuplicateButton'

class Backup extends React.Component {

    render() {
        const backup = this.props.backup
        const token = this.props.token
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
        const created = new Date(backup.created).toLocaleDateString("en-US", options)

        return (
            <Media>
                <Media body>
                    <ListGroupItem>
                        <Row>
                            <Col>
                                <div className="float-left" style={{ display: 'block' }}>
                                    <h5 style={{ padding: 0 }}>{backup.name}</h5>
                                    <p style={{ padding: 0, margin: 0 }}>{created}</p>
                                </div>
                            </Col>
                            <Col>
                                <Button className="float-right" color="success" onClick={() => this.props.restoreBackup(token, backup.name)}>Restore</Button>
                            </Col>
                        </Row>
                    </ListGroupItem >
                </Media>
                <Media>
                    <BiggestDuplicateButton duplicate={() => this.props.cloneBackup(token, backup.name)} />
                    <BiggestRemoveButton remove={() => this.props.removeBackup(token, backup.name)} />
                </Media>
            </Media>
        )
    }
}

export default connect(
    null, {
        createBackup,
        cloneBackup,
        removeBackup,
        restoreBackup
    }
)(Backup)