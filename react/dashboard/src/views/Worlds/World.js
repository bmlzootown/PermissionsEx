import React from 'react'
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
import InheritedPerms from './InheritedPerms'

import {
    negatePermission,
    removePermission, removeInheritedWorld,
    swapPermission, swapInheritedWorld,
    addPermission, addInheritedWorld,
    removeWorld, renameWorld
} from '../../reducers/worldsReducer'
import NegateButton from '../../components/Buttons/NegateButton';
import { RemoveButton, BiggerRemoveButton } from '../../components/Buttons/RemoveButton';
import { AddButton } from '../../components/Buttons/AddButton';
import { EditButton } from '../../components/Buttons/EditButton';

class World extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            open: true
        }
    }

    toggle = () => {
        this.setState({ open: !this.state.open })
    }

    swapPermission = ({ oldIndex, newIndex }) => {
        const world = this.props.world
        this.props.swapPermission(world, oldIndex, newIndex)
    }

    swapInheritedWorld = ({ oldIndex, newIndex }) => {
        const world = this.props.world
        this.props.swapInheritedWorld(world, oldIndex, newIndex)
    }

    render() {
        const world = this.props.world
        const open = this.state.open

        const permissions = world.permissions.map(permission => {
            const negated = permission.startsWith('-')
            return {
                value: permission,
                after: <span>
                    <NegateButton negated={negated} negate={() => this.props.negatePermission(world, permission)} />
                    <RemoveButton remove={() => this.props.removePermission(world, permission)} />
                </span>
            }
        })

        const inheritance = world.inheritance.map(inheritedWorld => {
            return {
                value: inheritedWorld,
                after: <RemoveButton remove={() => this.props.removeInheritedWorld(world, inheritedWorld)} />
            }
        })

        const circularInheritance = world.inheritedWorlds.map(w => w.name).includes(world.name)

        return (
            <Media>
                <Media body>
                    <Row onClick={this.toggle} title={'Click to ' + (open ? 'Collapse' : 'Open')}>
                        <Col>
                            <span>
                                <h5 style={{ padding: 0 }} className="float-left">{world.name + ' '}</h5>
                                <EditButton what='Change World Name' edit={() => this.props.renameWorld(world, prompt('Rename World', world.name))} />
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
                            <AddButton what='new permission' add={() => this.props.addPermission(world, prompt('Add Permission'))} />
                        </span>} />
                        <SortableComponent items={permissions} onSortEnd={this.swapPermission} />
                        <br></br>
                        <SubHeader text={<span>
                            Inherited Worlds{' '}
                            <AddButton what='new inherited world' add={() => this.props.addInheritedWorld(world, prompt('Inherited World Name'))} />
                        </span>} />
                        <SortableComponent items={inheritance} onSortEnd={this.swapInheritedWorld} />
                        <br></br>
                        <SubHeader text={(circularInheritance
                            ? (<span title='World can not inherit itself' style={{ color: '#b71c1c' }}>Inherited Permissions <Icon i='fa fa-warning' /></span>)
                            : 'Inherited Permissions')} />
                        <ListGroup>
                            {(world.inheritedWorlds ? world.inheritedWorlds : [])
                                .map((inheritedWorld, idx) => (
                                    <InheritedPerms key={idx} name={inheritedWorld.name} permissions={inheritedWorld.permissions} />
                                ))
                            }
                        </ListGroup>
                    </Collapse>
                </Media>
            </Media>
        )
    }
}

export default connect(
    null, {
        negatePermission,
        removePermission, removeInheritedWorld,
        swapPermission, swapInheritedWorld,
        addPermission, addInheritedWorld,
        removeWorld, renameWorld
    }
)(World);