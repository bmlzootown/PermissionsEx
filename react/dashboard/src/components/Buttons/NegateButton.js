import React from 'react'

import { Button } from 'reactstrap'

import Icon from '../Icon'

const negateButton = {
    backgroundColor: '#7e57c2',
    color: '#fff',
    padding: '12px 15px',
    borderColor: '#673ab7'
}

const NegateButton = ({ negated, negate }) => (
    <Button title={negated ? "Permit" : "Negate"} style={negateButton} onClick={negate}>
        <Icon i={negated ? 'fa fa-plus-square' : 'fa fa-minus-square'} />
    </Button>
)

export default NegateButton
