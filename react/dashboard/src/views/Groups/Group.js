import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Col, Collapse, Media, Row } from 'reactstrap'

import Icon from '../../components/Icon'
import SortableComponent from '../../components/Sortable/SortableWithElements'
import SubHeader from '../../components/Text/SubHeader'

import {
    addInheritedGroup,
    addPermission,
    addWorld,
    addWorldPermission,
    negatePermission,
    negateWorldPermission,
    removeGroup,
    removeInheritedGroup,
    removePermission,
    removeWorld,
    renameWorld,
    removeWorldPermission,
    renameGroup,
    swapInheritedGroup,
    swapPermission,
    swapWorld,
    swapWorldPermission
} from '../../reducers/groupsReducer'
import { isOpen, toggleGroup, toggleWorld } from '../../reducers/openReducer'

import NegateButton from '../../components/Buttons/NegateButton'
import { RemoveButton } from '../../components/Buttons/RemoveButton'
import { AddButton } from '../../components/Buttons/AddButton'
import { EditButton } from '../../components/Buttons/EditButton'
import GroupsWorld from './GroupsWorld'

class Group extends React.Component {

    toggle = () => {
        this.props.toggleGroup(this.props.group.name)
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    swapPermission = ({ oldIndex, newIndex }) => {
        const group = this.props.group
        this.props.swapPermission(group, oldIndex, newIndex)
    }

    swapInheritedGroup = ({ oldIndex, newIndex }) => {
        const group = this.props.group
        this.props.swapInheritedGroup(group, oldIndex, newIndex)
    }

    swapWorld = ({ oldIndex, newIndex }) => {
        const group = this.props.group
        this.props.swapWorld(group, oldIndex, newIndex)
    }

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    render() {
        const group = this.props.group

        const open = isOpen(this.context.store.getState().open.openGroups, group.name)

        const permissions = group.permissions.map(permission => {
            const negated = permission.startsWith('-')
            return {
                value: permission,
                after: <span>
                    <NegateButton negated={negated} negate={() => this.props.negatePermission(group, permission)} />
                    <RemoveButton remove={() => this.props.removePermission(group, permission)} />
                </span>
            }
        })

        const existingGroups = this.context.store.getState().groups.map(g => g.name)
        let hasUnexistingGroups = false

        const inheritance = group.inheritance.map(inheritedGroup => {
            const exists = !existingGroups.includes(inheritedGroup)
            if (exists) {
                hasUnexistingGroups = true
            }
            return {
                value: group.name === inheritedGroup
                    ? <span title='Group can not inherit itself' style={{ color: '#b71c1c' }}>{inheritedGroup} <Icon i='fa fa-warning' /> </span>
                    : (exists
                        ? <span title='Group does not exist yet' style={{ color: '#ff9800' }}>{inheritedGroup} <Icon i='fa fa-warning' /> </span>
                        : inheritedGroup),
                after: <RemoveButton remove={() => this.props.removeInheritedGroup(group, inheritedGroup)} />
            }
        })

        const worlds = group.worlds.map(world => {
            return {
                value: <GroupsWorld
                    world={world}
                    open={true}

                    swapPermission={({ oldIndex, newIndex }) =>
                        this.props.swapWorldPermission(group, world, oldIndex, newIndex)}
                    addPermission={() =>
                        this.props.addWorldPermission(group, world, prompt('Add Permission'))}
                    negatePermission={(permission) =>
                        this.props.negateWorldPermission(group, world, permission)}
                    removePermission={(permission) =>
                        this.props.removeWorldPermission(group, world, permission)}
                    renameWorld={() =>
                        this.props.renameWorld(group, world, prompt('Rename World', world.name))}
                    toggleWorld={() =>
                        this.props.toggleWorld(world.name)}
                />,
                after: <RemoveButton remove={() => this.props.removeWorld(group, world)} />
            }
        })

        const circularInheritance = group.inheritance.includes(group.name)

        return (
            <Media>
                <Media body>
                    <Row onClick={this.toggle} title={'Click to ' + (open ? 'Collapse' : 'Open')}>
                        <Col>
                            <span>
                                <h5 style={{ padding: 0 }} className="float-left">
                                    {(circularInheritance
                                        ? <span title='Group can not inherit itself' style={{ color: '#b71c1c' }}>{group.name} <Icon i='fa fa-warning' /> </span>
                                        : (hasUnexistingGroups ? <span title='Inherited Group does not exist yet' style={{ color: '#ff9800' }}>{group.name} <Icon i='fa fa-warning' /> </span>
                                            : group.name + ' ')
                                    )}
                                </h5>
                                <EditButton what='Change Group Name' edit={() => this.props.renameGroup(group, prompt('Rename Group', group.name))} />
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
                            Permissions{' '}
                            <AddButton what='new permission' add={() => this.props.addPermission(group, prompt('Add Permission'))} />
                        </span>} />
                        <SortableComponent items={permissions} onSortEnd={this.swapPermission} />

                        <br></br>
                        <SubHeader text={<span>
                            Inherited Groups{' '}
                            <AddButton what='new inherited group' add={() => this.props.addInheritedGroup(group, prompt('Inherited Group Name'))} />
                        </span>} />
                        <SortableComponent items={inheritance} onSortEnd={this.swapInheritedGroup} />

                        <br></br>
                        <SubHeader text={<span>
                            World specific permissions{' '}
                            <AddButton what='new world' add={() => this.props.addWorld(group, prompt('World Name'))} />
                        </span>} />
                        <SortableComponent items={worlds} onSortEnd={this.swapWorld} />
                    </Collapse>
                </Media>
            </Media>
        )
    }
}

Group.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null, {
        negatePermission,
        removePermission, removeInheritedGroup,
        swapPermission, swapInheritedGroup,
        addPermission, addInheritedGroup,
        removeGroup, renameGroup,

        toggleGroup, toggleWorld,

        addWorld, removeWorld, swapWorld,
        swapWorldPermission,
        addWorldPermission,
        removeWorldPermission,
        negateWorldPermission, renameWorld
    }
)(Group)