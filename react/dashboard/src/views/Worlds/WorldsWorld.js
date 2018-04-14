import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    Collapse,
    Media,
    Row, Col
} from 'reactstrap'

import {
    removeInheritedWorld,
    swapInheritedWorld,
    addInheritedWorld,
    removeWorld,
    renameWorld
} from '../../reducers/worldsReducer'

import Icon from '../../components/Icon'
import SortableComponent from '../../components/Sortable/SortableWithElements'
import SubHeader from '../../components/Text/SubHeader'

import { RemoveButton } from '../../components/Buttons/RemoveButton'
import { AddButton } from '../../components/Buttons/AddButton'
import { EditButton } from '../../components/Buttons/EditButton'

import { isOpen, toggleWorld } from '../../reducers/openReducer'

class WorldsWorld extends React.Component {

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const world = this.props.world
        const open = isOpen(this.context.store.getState().open.openWorlds, world.name)

        return (
            <World
                world={world}
                open={open}

                swapInheritedWorld={({ oldIndex, newIndex }) =>
                    this.props.swapInheritedWorld(world, oldIndex, newIndex)}
                addInheritedWorld={() =>
                    this.props.addInheritedWorld(world, prompt('Inherited World Name'))}
                removeInheritedWorld={(inheritedWorld) =>
                    this.props.removeInheritedWorld(world, inheritedWorld)}
                renameWorld={() =>
                    this.props.renameWorld(world, prompt('Rename World', world.name))}
                toggleWorld={() =>
                    this.props.toggleWorld(this.props.world.name)}
            />
        )
    }
}

class World extends React.Component {

    render() {
        const world = this.props.world
        const open = this.props.open

        const inheritance = world.inheritance.map(inheritedWorld => {
            return {
                value: world.name === inheritedWorld
                ? <span title='World can not inherit itself' style={{ color: '#b71c1c' }}>{inheritedWorld} <Icon i='fa fa-warning' /> </span>
                : inheritedWorld,
                after: <RemoveButton remove={() => this.props.removeInheritedWorld(inheritedWorld)} />
            }
        })

        const circularInheritance = world.inheritance.includes(world.name)

        return (
            <Media>
                <Media body>
                    <Row onClick={this.props.toggleWorld} title={'Click to ' + (open ? 'Collapse' : 'Open')}>
                        <Col>
                            <span>
                                <h5 style={{ padding: 0 }} className="float-left">
                                    {
                                        (circularInheritance
                                            ? <span title='World can not inherit itself' style={{ color: '#b71c1c' }}>{world.name} <Icon i='fa fa-warning' /> </span>
                                            : world.name + ' ')
                                    }
                                </h5>
                                <EditButton what='Change World Name' edit={() => this.props.renameWorld()} />
                            </span>
                        </Col>
                        <Col>
                            <h5 style={{ padding: 0 }} className="float-right">
                                <Icon i={open ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} />
                            </h5>
                        </Col>
                    </Row>
                    <Collapse isOpen={open} >
                        <SubHeader text={<span>
                            Inherited Worlds{' '}
                            <AddButton what='new inherited world' add={() => this.props.addInheritedWorld()} />
                        </span>} />
                        <SortableComponent items={inheritance} onSortEnd={this.props.swapInheritedWorld} />
                    </Collapse>
                </Media>
            </Media>
        )
    }
}

WorldsWorld.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null, {
        removeInheritedWorld, swapInheritedWorld,
        addInheritedWorld, removeWorld, renameWorld, toggleWorld
    }
)(WorldsWorld)