import React from 'react'

import { Button } from 'reactstrap'

import Icon from '../Icon'

const duplicateButton = {
    backgroundColor: '#7986cb',
    color: '#fff',
    padding: '12px 15px',
    borderColor: '#7986cb'
}

const biggerDuplicateButton = {
    backgroundColor: '#7986cb',
    color: '#fff',
    padding: '15px 22px',
    borderColor: '#7986cb'
}

const biggestDuplicateButton = {
    backgroundColor: '#7986cb',
    color: '#fff',
    padding: '26px 30px',
    borderColor: '#7986cb'
}

export const BiggestDuplicateButton = ({ className, duplicate }) => (
    <Button className={className} title="Duplicate" style={biggestDuplicateButton} onClick={duplicate}>
        <Icon i='fa fa-clone' />
    </Button>
)

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
