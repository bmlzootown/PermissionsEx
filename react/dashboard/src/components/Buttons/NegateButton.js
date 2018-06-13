import React from 'react'

import { Button } from 'reactstrap'

import Icon from '../Icon'

const active = {
    backgroundColor: '#ba68c8',
    color: '#fff',
    padding: '12px 18px',
    borderColor: '#ba68c8'
}

const inactive = {
    backgroundColor: '#ce93d8',
    color: '#fff',
    padding: '12px 18px',
    borderColor: '#ce93d8'
}

const NegateButton = ({ negated, negate }) => (
    <Button title={negated ? "Permit" : "Negate"} style={negated ? active : inactive} onClick={negate}>
        <Icon i={'fa fa-minus-square'} />
    </Button>
)

export default NegateButton
