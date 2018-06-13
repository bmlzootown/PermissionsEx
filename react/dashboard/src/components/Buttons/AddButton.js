import React from 'react'

import { Button } from 'reactstrap'

import Icon from '../Icon'

const addButton = {
    backgroundColor: '#fff',
    color: '#66bb6a',
    padding: '2px 5px',
    borderColor: '#fff'
}

const bigAddButton = {
    color: '#fff',
    backgroundColor: '#66bb6a',
    padding: '10px 20px',
    fontSize: '26px',
    borderColor: '#66bb6a'
}


export const AddButton = ({ add, what }) => (
    <Button title={'Add' + (what ? ' ' + what : '')} style={addButton} onClick={add}>
        <Icon i='fa fa-plus' />
    </Button>
)

export const BigAddButton = ({ className, add, what }) => (
    <Button className={className} title={'Add' + (what ? ' ' + what : '')} style={bigAddButton} onClick={add}>
        <Icon i='fa fa-plus' />
    </Button>
)

export default AddButton
