import React from 'react'

import ErrorNotification from './ErrorNotification';
import SuccessNotification from './SuccessNotification';

const Notification = () => (
    <div>
        <ErrorNotification />
        <SuccessNotification />
    </div>
)

export default Notification