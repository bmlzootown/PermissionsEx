import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { success, error } from '../../reducers/notificationReducer'

import Icon from '../../components/Icon'

import {
    ListGroupItem,
    Button,
    Media,
    UncontrolledTooltip
} from 'reactstrap'

class Permission extends React.Component {

    copyToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;

        textArea.style.width = '2em';
        textArea.style.height = '2em';

        textArea.style.padding = 0;

        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        textArea.style.background = 'transparent';

        textArea.value = text;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            this.props.success(`Copied '${text}' to Clipboard!`)
        } catch (err) {
            this.props.error('Unable to copy to clipboard.')
        }

        document.body.removeChild(textArea);
    }

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
                        <Button title='Copy permission to Clipboard' id={id + 'clip'} style={clipboardButton} onClick={() => this.copyToClipboard(permission)}><Icon i='fa fa-copy' /></Button>
                    </Media>
                    <Media left>
                        <Button title='Copy negated permission to Clipboard' id={id + 'nclip'} style={clipboardButton} onClick={() => this.copyToClipboard('-' + permission)}><Icon i='fa fa-minus-square' /></Button>
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