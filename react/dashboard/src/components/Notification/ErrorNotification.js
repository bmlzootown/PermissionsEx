import React from 'react'
import PropTypes from 'prop-types'

import { Alert, Collapse } from 'reactstrap';

class ErrorNotification extends React.Component {

    componentWillUnmount() {
        this.unsubscribe()
    }

    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    render() {
        const message = this.context.store.getState().notification.error

        const isClosed = !message || message.length === 0

        return <Collapse isOpen={!isClosed}>
            <Alert color="danger">{message}</Alert>
        </Collapse>
    }

}

ErrorNotification.contextTypes = {
    store: PropTypes.object
};

export default ErrorNotification