import React from 'react'
import PropTypes from 'prop-types'

import { Alert } from 'reactstrap';

class ErrorNotification extends React.Component {

    componentWillUnmount() {
        this.unsubscribe()
    }

    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    random = () => {
        return Math.random()
    }

    render() {
        const messages = this.context.store.getState().notification
            .filter(n => n.type === 'ERROR')
            .map(n => <Alert key={this.random()} color="danger">{n.message}</Alert>)

        return <div>
            {messages}
        </div>
    }

}

ErrorNotification.contextTypes = {
    store: PropTypes.object
};

export default ErrorNotification