import React from 'react'

import { Button } from 'reactstrap'

import Icon from '../Icon'

const duplicateButton = {
    backgroundColor: '#5c6bc0',
    color: '#fff',
    padding: '12px 15px',
    borderColor: '#3f51b5'
}

const biggerDuplicateButton = {
    backgroundColor: '#5c6bc0',
    color: '#fff',
    padding: '15px 22px',
    borderColor: '#3f51b5'
}

export const BiggerDuplicateButton = ({ className, duplicate }) => (
    <Button className={className} title="Duplicate" style={biggerDuplicateButton} onClick={duplicate}>
        <Icon i='fa fa-clone' />
    </Button>
)

export const DuplicateButton = ({ duplicate }) => (
    <Button title="Duplicate" style={duplicateButton} onClick={duplicate}>
        <Icon i='fa fa-clone' />
    </Button>
)

export default DuplicateButton
