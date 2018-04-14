import React from 'react'

import { ListGroupItemText } from 'reactstrap'

const SubHeader = ({ text }) => (
    <ListGroupItemText style={{ padding: 0 }} className="text-muted">{text}</ListGroupItemText>
)

export default SubHeader