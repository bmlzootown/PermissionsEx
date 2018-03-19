import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dummy from '../../components/Dummy'
import { initializePlugins } from '../../reducers/pluginsReducer'

import {
  Row,
  Col,
  Button,
  ListGroup
} from 'reactstrap'

import Plugin from './Plugin'
import Icon from '../../components/Icon'

class Plugins extends Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const plugins = this.context.store.getState().plugins

    const Plugins = !plugins || plugins.length === 0
      ? (<p>No Plugins with permissions in plugin.yml</p>)
      : (<div>{plugins.map(plugin => <Plugin key={plugin.name} plugin={plugin} />)}</div>)

    const alignButton = {
      color: '#fff',
      backgroundColor: '#757575',
      padding: '10px 15px',
      fontSize: '26px',
      borderColor: '#686868'
    }

    return (
      <div className="animated fadeIn">
        <Col>
          <Button className="float-right" title='Tree Permission view' style={alignButton}><Icon i='fa fa-align-left' /></Button>
          <Button className="float-right" title='Flat Permission view' style={alignButton}><Icon i='fa fa-align-justify' /></Button>
        </Col>
        <Row>
          <Col>
            <ListGroup>
              {Plugins}
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

Plugins.contextTypes = {
  store: PropTypes.object
}

export default connect(
  null, { initializePlugins }
)(Plugins);