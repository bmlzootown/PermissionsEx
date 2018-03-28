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
} from '../../reducers/usersReducer'
import { isOpen, toggleGroup, toggleWorld } from '../../reducers/openReducer'

import NegateButton from '../../components/Buttons/NegateButton'
import { RemoveButton } from '../../components/Buttons/RemoveButton'
import { AddButton } from '../../components/Buttons/AddButton'
import { EditButton } from '../../components/Buttons/EditButton'
import GroupsWorld from '../Groups/GroupsWorld'

class User extends React.Component {

    toggle = () => {
        this.props.toggleGroup(this.props.group.name)
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    swapPermission = ({ oldIndex, newIndex }) => {
        const user = this.props.user
        this.props.swapPermission(user, oldIndex, newIndex)
    }

    swapWorld = ({ oldIndex, newIndex }) => {
        const user = this.props.user
        this.props.swapWorld(user, oldIndex, newIndex)
    }

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    render() {
        const user = this.props.user

        const open = isOpen(this.context.store.getState().open.openGroups, user.name)

        const permissions = user.permissions.map(permission => {
            const negated = permission.startsWith('-')
            return {
                value: permission,
                after: <span>
                    <NegateButton negated={negated} negate={() => this.props.negatePermission(user, permission)} />
                    <RemoveButton remove={() => this.props.removePermission(user, permission)} />
                </span>
            }
        })

        const worlds = user.worlds.map(world => {
            return {
                value: <GroupsWorld
                    world={world}
                    open={true}

                    swapPermission={({ oldIndex, newIndex }) =>
                        this.props.swapWorldPermission(user, world, oldIndex, newIndex)}
                    addPermission={() =>
                        this.props.addWorldPermission(user, world, prompt('Add Permission'))}
                    negatePermission={(permission) =>
                        this.props.negateWorldPermission(user, world, permission)}
                    removePermission={(permission) =>
                        this.props.removeWorldPermission(user, world, permission)}
                    renameWorld={() =>
                        this.props.renameWorld(user, world, prompt('Rename World', world.name))}
                    toggleWorld={() =>
                        this.props.toggleWorld(world.name)}
                />,
                after: <RemoveButton remove={() => this.props.removeWorld(user, world)} />
            }
        })

        return (
            <Media>
                <Media body>
                    <Row onClick={this.toggle} title={'Click to ' + (open ? 'Collapse' : 'Open')}>
                        <Col>
                            <span>
                                <h5 style={{ padding: 0 }} className="float-left">{user.name + ' '}</h5>
                                <EditButton what='Change Group Name' edit={() => this.props.renameGroup(user, prompt('Rename Group', user.name))} />
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
                            <AddButton what='new permission' add={() => this.props.addPermission(user, prompt('Add Permission'))} />
                        </span>} />
                        <SortableComponent items={permissions} onSortEnd={this.swapPermission} />

                        <br></br>
                        <SubHeader text={<span>
                            World specific permissions{' '}
                            <AddButton what='new world' add={() => this.props.addWorld(user, prompt('World Name'))} />
                        </span>} />
                        <SortableComponent items={worlds} onSortEnd={this.swapWorld} />
                    </Collapse>
                </Media>
            </Media>
        )
    }
}

User.contextTypes = {
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
)(User)