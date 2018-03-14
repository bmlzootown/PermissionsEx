import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dummy from '../../components/Dummy'
import { initializePlugins } from '../../reducers/pluginsReducer'

class Plugins extends Component {

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Dummy />
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