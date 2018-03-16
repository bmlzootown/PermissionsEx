import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { success } from '../../reducers/notificationReducer'

import { Alert } from 'reactstrap';

class SuccessNotification extends React.Component {

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
            .filter(n => n.type === 'SUCCESS')
            .map(n => <Alert key={this.random()} color="success">{n.message}</Alert>)

        return <div>
            {messages}
        </div>
    }

}

SuccessNotification.contextTypes = {
    store: PropTypes.object
};

export default connect(
    null, { success }
)(SuccessNotification)