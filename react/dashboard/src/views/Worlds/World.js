import React from 'react'

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

class World extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    toggle = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        const world = this.props.world
        const open = this.state.open

        const negateButton = {
            backgroundColor: '#7e57c2',
            color: '#fff',
            padding: '12px 15px',
            borderColor: '#673ab7'
        }

        const items = world.permissions.map(permission => {
            const negated = permission.startsWith('-')
            return {
                value: permission,
                after: <Button title={negated ? "Permit permission" : "Negate permission"} style={negateButton} onClick={() => this.props.negate(world, permission)}>
                    <Icon i={negated ? 'fa fa-plus-square' : 'fa fa-minus-square'} />
                </Button>
            }
        })

        return (
            <ListGroupItem>
                <Row onClick={this.toggle}>
                    <Col><h5 style={{ padding: 0 }} className="float-left">{world.name}</h5></Col>
                    <Col><h5 style={{ padding: 0 }} className="float-right"><Icon i={open ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} /></h5></Col>
                </Row>
                <Collapse isOpen={open} >
                    <SubHeader text='Permissions' />
                    <SortableComponent items={items} />
                    <br></br>
                    <SubHeader text='Inherited Permissions' />
                    <ListGroup>
                        {(world.inheritedWorlds ? world.inheritedWorlds : [])
                            .map((inheritedWorld, idx) => (
                                <InheritedPerms key={idx} name={inheritedWorld.name} permissions={inheritedWorld.permissions} />
                            ))
                        }
                    </ListGroup>
                </Collapse>
            </ListGroupItem>
        )
    }
}

export default World