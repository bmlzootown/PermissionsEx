import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import Dummy from '../../components/Dummy'
import { initializePlugins } from '../../reducers/pluginsReducer'

import Plugin from './Plugin'

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

    return (
      <div className="animated fadeIn">
        {Plugins}
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