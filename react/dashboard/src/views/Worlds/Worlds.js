import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { negatePermission } from '../../reducers/worldsReducer'

import {
  Row,
  Col,
  Button,
  ListGroup
} from 'reactstrap'

import World from './World'
import Icon from '../../components/Icon'

class Worlds extends Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  findWorld = (name, worlds) => {
    return worlds.find(world => world.name === name)
  }

  solveInheritance = (worlds) => {
    worlds.forEach(world => {
      const inherited = world.inheritance ? world.inheritance : []
      const inheritedWorlds = inherited.map(inheritedWorld => this.findWorld(inheritedWorld, worlds)).filter(world => Boolean(world))
      world.inheritedWorlds = inheritedWorlds
    })
    return worlds
  }

  negatePermission = (world, permission) => {
    const worlds = this.context.store.getState().worlds
    this.props.negatePermission(worlds, world, permission)
  }

  render() {
    const worlds = this.solveInheritance(this.context.store.getState().worlds)

    const Worlds = !worlds || worlds.length === 0
      ? (<p>No Worlds (yet)</p>)
      : (<div>{worlds.map(world => <World key={world.name} world={world} negate={this.negatePermission} />)}</div>)

    const addButton = {
      color: '#fff',
      backgroundColor: '#689f38',
      padding: '10px 20px',
      fontSize: '26px',
      borderColor: '#686868'
    }

    return (
      <div className="animated fadeIn">
        <Col>
          <Button className="float-right" title='Add World' style={addButton}><Icon i='fa fa-plus' /></Button>
        </Col>
        <Row>
          <Col>
            <ListGroup>
              {Worlds}
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

Worlds.contextTypes = {
  store: PropTypes.object
}

export default connect(
  null, { negatePermission }
)(Worlds);