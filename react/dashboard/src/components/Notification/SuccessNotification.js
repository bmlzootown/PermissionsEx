import React from 'react'
import PropTypes from 'prop-types'

import { Alert, Collapse } from 'reactstrap';

class SuccessNotification extends React.Component {

    componentWillUnmount() {
        this.unsubscribe()
    }

    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    render() {
        const message = this.context.store.getState().notification.success
        if (!message || message.length === 0) {
            return null
        }
        const isClosed = !message || message.length === 0

        return <Collapse isOpen={!isClosed}>
            <Alert color="success">{message}</Alert>
        </Collapse>
    }

}

SuccessNotification.contextTypes = {
    store: PropTypes.object
};

export default SuccessNotification