import React from 'react'

import ErrorNotification from './ErrorNotification';
import SuccessNotification from './SuccessNotification';

const Notification = () => {

    const style = {
        position: 'fixed',
        width: '50%',
        top: '25px',
        marginLeft: '25%',
        marginRight: '25%',
        zIndex: 100000
    }

    return (
        <div style={style}>
            <ErrorNotification />
            <SuccessNotification />
        </div>
    )
}

export default Notification