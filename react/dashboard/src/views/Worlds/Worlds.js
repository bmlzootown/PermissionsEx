import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  Row,
  Col,
  Button,
  ListGroup
} from 'reactstrap'

import World from './World'
import Icon from '../../components/Icon'

import { addWorld, addInheritedWorld, addPermission, removePermission, removeInheritedWorld, negatePermission } from '../../reducers/worldsReducer'

class Worlds extends Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const worlds = this.context.store.getState().worlds

    const Worlds = !worlds || worlds.length === 0
      ? (<p>No Worlds (yet)</p>)
      : (<div>{worlds.map(world => <World key={world.name} world={world} />)}</div>)

    const addButton = {
      color: '#fff',
      backgroundColor: '#689f38',
      padding: '10px 20px',
      fontSize: '26px',
      borderColor: '#686868'
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md='0'>
            <Button onClick={() => this.props.addWorld(prompt('Name of the World'))} className="float-left" title='Add World' style={addButton}><Icon i='fa fa-plus' /></Button>
          </Col>
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
  null, { addWorld, addInheritedWorld, addPermission, removePermission, removeInheritedWorld, negatePermission }
)(Worlds);