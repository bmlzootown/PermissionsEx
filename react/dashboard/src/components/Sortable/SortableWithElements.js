import React, { Component } from 'react'

import {
    SortableContainer,
    SortableElement,
    SortableHandle,
} from 'react-sortable-hoc'

import {
    ListGroup,
    ListGroupItem,
    Media,
    Row, Col
} from 'reactstrap'

import Icon from '../Icon'

const DragHandle = SortableHandle(() => <Icon style={{ padding: '5px 5px' }} i='fa fa-bars' />)

const SortableItem = SortableElement(({ value }) => {
    return (
        <Media >
            <Media body>
                <ListGroupItem color={value.color ? value.color : undefined}>
                    <Row>
                        <Col md='0'><DragHandle />{' '}</Col>
                        <Col>{value.value}</Col>
                    </Row>
                </ListGroupItem>
            </Media>
            <Media>{value.after}</Media>
        </Media>
    )
})

const SortableList = SortableContainer(({ items }) => {
    return (
        <ListGroup>
            {items.map((item, index) => (
                <SortableItem key={`item-${index}`} index={index} value={item} />
            ))}
        </ListGroup>
    )
})

class SortableComponent extends Component {
    render() {
        const items = this.props.items

        return <SortableList helperClass='sortableHelper' items={items} onSortEnd={this.props.onSortEnd} useDragHandle={true} />
    }
}

export default SortableComponent