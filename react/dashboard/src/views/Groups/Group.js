import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    Card, CardBody, CardTitle,
    Collapse,
    ListGroup,
    ListGroupItem,
    Media,
    Button,
    Row, Col
} from 'reactstrap'

import Icon from '../../components/Icon';
import SortableComponent from '../../components/Sortable/SortableWithElements';
import SubHeader from '../../components/Text/SubHeader';
import InheritedPerms from '../Worlds/InheritedPerms'

import {
    negatePermission,
    removePermission, removeInheritedGroup,
    swapPermission, swapInheritedGroup,
    addPermission, addInheritedGroup,
    removeGroup, renameGroup
} from '../../reducers/groupsReducer'
import { isOpen, toggleGroup } from '../../reducers/openReducer'

import NegateButton from '../../components/Buttons/NegateButton';
import { RemoveButton, BiggerRemoveButton } from '../../components/Buttons/RemoveButton';
import { AddButton } from '../../components/Buttons/AddButton';
import { EditButton } from '../../components/Buttons/EditButton';

class Group extends React.Component {

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    toggle = () => {
        this.props.toggleGroup(this.props.group.name)
    }

    swapPermission = ({ oldIndex, newIndex }) => {
        const group = this.props.group
        this.props.swapPermission(group, oldIndex, newIndex)
    }

    swapInheritedGroup = ({ oldIndex, newIndex }) => {
        const group = this.props.group
        this.props.swapInheritedGroup(group, oldIndex, newIndex)
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

        const inheritance = group.inheritance.map(inheritedGroup => {
            return {
                value: inheritedGroup,
                after: <RemoveButton remove={() => this.props.removeInheritedGroup(group, inheritedGroup)} />
            }
        })

        const circularInheritance = group.inheritedGroups.map(group => group.name).includes(group.name)

        return (
            <Media>
                <Media body>
                    <Row onClick={this.toggle} title={'Click to ' + (open ? 'Collapse' : 'Open')}>
                        <Col>
                            <span>
                                <h5 style={{ padding: 0 }} className="float-left">
                                    {
                                        (circularInheritance
                                            ? <span title='Group can not inherit itself' style={{ color: '#b71c1c' }}>{group.name} <Icon i='fa fa-warning' /> </span>
                                            : group.name + ' ')
                                    }
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
                        <SubHeader text={(circularInheritance
                            ? (<span title='Group can not inherit itself' style={{ color: '#b71c1c' }}>Inherited Permissions <Icon i='fa fa-warning' /></span>)
                            : 'Inherited Permissions')} />
                        <ListGroup>
                            {(group.inheritedGroups ? group.inheritedGroups : [])
                                .map((inheritedGroup, idx) => (
                                    <InheritedPerms key={idx} name={inheritedGroup.name} permissions={inheritedGroup.permissions} />
                                ))
                            }
                        </ListGroup>
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
        toggleGroup
    }
)(Group);