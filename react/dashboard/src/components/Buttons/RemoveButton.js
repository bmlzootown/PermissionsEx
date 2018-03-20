import React from 'react'

import { Button } from 'reactstrap'

import Icon from '../Icon'

const removeButton = {
    backgroundColor: '#e53935',
    color: '#fff',
    padding: '12px 15px',
    borderColor: '#d32f2f'
}

const biggerRemoveButton = {
    backgroundColor: '#e53935',
    color: '#fff',
    padding: '15px 22px',
    borderColor: '#d32f2f'
}

export const BiggerRemoveButton = ({ className, remove }) => (
    <Button className={className} title="Remove" style={biggerRemoveButton} onClick={remove}>
        <Icon i='fa fa-times' />
    </Button>
)

export const RemoveButton = ({ remove }) => (
    <Button title="Remove" style={removeButton} onClick={remove}>
        <Icon i='fa fa-times' />
    </Button>
)

export default RemoveButton
