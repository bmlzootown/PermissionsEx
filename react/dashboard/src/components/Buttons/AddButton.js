import React from 'react'

import { Button } from 'reactstrap'

import Icon from '../Icon'

const addButton = {
    backgroundColor: '#fff',
    color: '#43a047',
    padding: '2px 5px',
    borderColor: '#fff'
}

export const AddButton = ({ add, what }) => (
    <Button title={'Add' + (what ? ' ' + what : '')} style={addButton} onClick={add}>
        <Icon i='fa fa-plus' />
    </Button>
)

export default AddButton
