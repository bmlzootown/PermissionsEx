import React from 'react'

import { Button } from 'reactstrap'

import Icon from '../Icon'

const active = {
    backgroundColor: '#7e57c2',
    color: '#fff',
    padding: '12px 15px',
    borderColor: '#673ab7'
}

const inactive = {
    backgroundColor: '#ba68c8',
    color: '#fff',
    padding: '12px 15px',
    borderColor: '#ab47bc'
}

const NegateButton = ({ negated, negate }) => (
    <Button title={negated ? "Permit" : "Negate"} style={negated ? active : inactive} onClick={negate}>
        <Icon i={'fa fa-minus-square'} />
    </Button>
)

export default NegateButton
