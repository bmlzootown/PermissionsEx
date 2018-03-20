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

import { addWorld, swapWorld, removeWorld, duplicateWorld } from '../../reducers/worldsReducer'

import { BiggerRemoveButton } from '../../components/Buttons/RemoveButton';
import { BiggerDuplicateButton } from '../../components/Buttons/DuplicateButton';

import SortableComponent from '../../components/Sortable/SortableWithElements';

class Worlds extends Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  swapWorld = ({ oldIndex, newIndex}) => {
    this.props.swapWorld(oldIndex, newIndex)
  }

  render() {
    const worlds = this.context.store.getState().worlds

    const Worlds = worlds.map(world => {
      return {
        value: <World key={world.name} world={world} />,
        after: <span>
          <BiggerDuplicateButton duplicate={() => this.props.duplicateWorld(world, prompt('Name of the duplicated world'))} />
          <BiggerRemoveButton remove={() => this.props.removeWorld(world)} />
        </span>
      }
    })

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
            <SortableComponent items={Worlds} onSortEnd={this.swapWorld} />
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
  null, { addWorld, swapWorld, removeWorld, duplicateWorld }
)(Worlds);