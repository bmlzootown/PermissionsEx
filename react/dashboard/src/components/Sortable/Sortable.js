import React, { Component } from 'react';

import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
} from 'react-sortable-hoc';

import {
    ListGroup,
    ListGroupItem
} from 'reactstrap'

import Icon from '../Icon'

const DragHandle = SortableHandle(() => <Icon i='fa fa-bars' />); // This can be any component you want

const SortableItem = SortableElement(({ value }) => {
    return (
        <ListGroupItem>
            <DragHandle />{' '}
            {value}
        </ListGroupItem>
    );
});

const SortableList = SortableContainer(({ items }) => {
    return (
        <ListGroup>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </ListGroup>
    );
});

class SortableComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: props.items
        }
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        const { items } = this.state;

        this.setState({
            items: arrayMove(items, oldIndex, newIndex),
        });
    };

    render() {
        const { items } = this.state;

        return <SortableList items={items} onSortEnd={this.onSortEnd} useDragHandle={true} />;
    }
}

export default SortableComponent