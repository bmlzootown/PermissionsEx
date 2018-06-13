import React from 'react'

import { Button } from 'reactstrap'

import Icon from '../Icon'

const removeButton = {
    backgroundColor: '#ef5350',
    color: '#fff',
    padding: '12px 18px',
    borderColor: '#ef5350'
}

const biggerRemoveButton = {
    backgroundColor: '#ef5350',
    color: '#fff',
    padding: '15px 22px',
    borderColor: '#ef5350'
}

const biggestRemoveButton = {
    backgroundColor: '#ef5350',
    color: '#fff',
    padding: '26px 30px',
    borderColor: '#ef5350'
}
export const BiggestRemoveButton = ({ className, remove }) => (
    <Button className={className} title="Remove" style={biggestRemoveButton} onClick={remove}>
        <Icon i='fa fa-times' />
    </Button>
)

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
