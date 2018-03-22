import React from 'react'
import PropTypes from 'prop-types'

import {
    Collapse,
    ListGroup,
    Media,
    Row, Col
} from 'reactstrap'

import Icon from './Icon'
import SortableComponent from './Sortable/SortableWithElements'
import SubHeader from './Text/SubHeader'
import InheritedPerms from '../views/Worlds/InheritedPerms'

import NegateButton from './Buttons/NegateButton'
import { RemoveButton } from './Buttons/RemoveButton'
import { AddButton } from './Buttons/AddButton'
import { EditButton } from './Buttons/EditButton'

class World extends React.Component {

    render() {
        const world = this.props.world
        const open = this.props.open

        const permissions = world.permissions.map(permission => {
            const negated = permission.startsWith('-')
            return {
                value: permission,
                after: <span>
                    <NegateButton negated={negated} negate={() => this.props.negatePermission(permission)} />
                    <RemoveButton remove={() => this.props.removePermission(permission)} />
                </span>
            }
        })

        const inheritance = world.inheritance.map(inheritedWorld => {
            return {
                value: inheritedWorld,
                after: <RemoveButton remove={() => this.props.removeInheritedWorld(inheritedWorld)} />
            }
        })

        const circularInheritance = world.inheritedWorlds.map(w => w.name).includes(world.name)

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
                            Permissions{' '}
                            <AddButton what='new permission' add={() => this.props.addPermission()} />
                        </span>} />
                        <SortableComponent items={permissions} onSortEnd={this.props.swapPermission} />
                        <br></br>
                        <SubHeader text={<span>
                            Inherited Worlds{' '}
                            <AddButton what='new inherited world' add={() => this.props.addInheritedWorld()} />
                        </span>} />
                        <SortableComponent items={inheritance} onSortEnd={this.props.swapInheritedWorld} />
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

World.contextTypes = {
    store: PropTypes.object
}

World.propTypes = {
    world: PropTypes.object,
    open: PropTypes.bool,

    swapPermission: PropTypes.func,
    addPermission: PropTypes.func,
    negatePermission: PropTypes.func,
    removePermission: PropTypes.func,
    swapInheritedWorld: PropTypes.func,
    addInheritedWorld: PropTypes.func,
    removeInheritedWorld: PropTypes.func,
    renameWorld: PropTypes.func,
    toggleWorld: PropTypes.func
}

export default World