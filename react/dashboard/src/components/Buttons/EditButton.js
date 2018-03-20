import React from 'react'

import { Button } from 'reactstrap'

import Icon from '../Icon'

const editButton = {
    backgroundColor: '#fff',
    color: '#757575',
    padding: '2px 5px',
    borderColor: '#fff'
}

export const EditButton = ({ edit, what }) => (
    <Button title={what} style={editButton} onClick={edit}>
        <Icon i='fa fa-edit' />
    </Button>
)

export default EditButton
