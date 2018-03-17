import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { success, error } from '../../reducers/notificationReducer'
import { copyToClipboard } from '../../utils/clipboard'

import Icon from '../../components/Icon'

import {
    ListGroupItem,
    Button,
    Media,
    UncontrolledTooltip
} from 'reactstrap'

class Permission extends React.Component {

    render() {
        const permission = this.props.permission

        const clipboardButton = {
            color: '#fff',
            backgroundColor: '#AF6E4D',
            padding: '12px 15px',
            borderColor: '#a06648'
        }

        const id = (this.props.pluginName + '_' + permission + '_').replace(' ', '')

        return (
            <div>
                <Media>
                    <Media left>
                        <Button title='Copy permission to Clipboard' id={id + 'clip'} style={clipboardButton}
                            onClick={() => copyToClipboard(permission, this.props.success, this.props.error)}><Icon i='fa fa-copy' />
                        </Button>
                    </Media>
                    <Media left>
                        <Button title='Copy negated permission to Clipboard' id={id + 'nclip'} style={clipboardButton}
                            onClick={() => this.copyToClipboard('-' + permission, this.props.success, this.props.error)}><Icon i='fa fa-minus-square' />
                        </Button>
                    </Media>
                    <Media body>
                        <ListGroupItem color="secondary" >
                            {permission}
                        </ListGroupItem>
                    </Media>
                </Media>
            </div>
        )
    }
}

Permission.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null, { success, error }
)(Permission)