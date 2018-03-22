import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import World from '../../components/World'

import {
    negatePermission,
    removePermission, removeInheritedWorld,
    swapPermission, swapInheritedWorld,
    addPermission, addInheritedWorld,
    removeWorld, renameWorld
} from '../../reducers/worldsReducer'

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

                swapPermission={({ oldIndex, newIndex }) =>
                    this.props.swapPermission(world, oldIndex, newIndex)}
                addPermission={() =>
                    this.props.addPermission(world, prompt('Add Permission'))}
                negatePermission={(permission) =>
                    this.props.negatePermission(world, permission)}
                removePermission={(permission) =>
                    this.props.removePermission(world, permission)}
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

WorldsWorld.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null, {
        negatePermission,
        removePermission, removeInheritedWorld,
        swapPermission, swapInheritedWorld,
        addPermission, addInheritedWorld,
        removeWorld, renameWorld, toggleWorld
    }
)(WorldsWorld)