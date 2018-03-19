import React, { Component } from 'react';

import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
} from 'react-sortable-hoc';

import {
    ListGroup,
    ListGroupItem,
    Media
} from 'reactstrap'

import Icon from '../Icon'

// TODO Refactor to use Redux store for updates

const DragHandle = SortableHandle(() => <Icon i='fa fa-bars' />); // This can be any component you want

const SortableItem = SortableElement(({ value }) => {
    return (
        <Media >
            <Media body>
                <ListGroupItem>
                    <DragHandle />{' '}
                    {value.value}
                </ListGroupItem>
            </Media>
            <Media>{value.after}</Media>
        </Media>
    );
});

const SortableList = SortableContainer(({ items }) => {
    return (
        <ListGroup>
            {items.map((item, index) => (
                <SortableItem key={`item-${index}`} index={index} value={item} />
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