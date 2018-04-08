import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    Collapse,
    ListGroup,
    ListGroupItem,
    Row, Col
} from 'reactstrap'

import Permission from './Permission'
import Icon from '../../components/Icon'
import SubHeader from '../../components/Text/SubHeader'

import { isOpen, togglePlugin } from '../../reducers/openReducer'

class Plugin extends React.Component {

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    toggle = () => {
        this.props.togglePlugin(this.props.plugin.name)
    }

    render() {
        const plugin = this.props.plugin
        const open = isOpen(this.context.store.getState().open.openPlugins, plugin.name)

        return (
            <ListGroupItem>
                <Row onClick={this.toggle}>
                    <Col><h5 style={{ padding: 0 }} className="float-left">{plugin.name}</h5></Col>
                    <Col>
                        <h5 style={{ padding: 0, margin: 0  }} className="float-right"><Icon i={open ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} /></h5>
                        <p style={{ padding: 0, margin: 0  }} className="float-right"><b>{plugin.permissions.length}</b> listed permissions&nbsp;</p>
                    </Col>
                </Row>
                <Collapse isOpen={open} >
                    <ListGroup>
                        <SubHeader text='Permissions' />
                        {[...new Set(plugin.permissions)]
                            .filter(permission => !permission.startsWith('-'))
                            .map(permission =>
                                <Permission key={permission} pluginName={plugin.name} permission={permission} />
                            )}
                    </ListGroup>
                </Collapse>
            </ListGroupItem>
        )
    }
}

Plugin.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null, { togglePlugin }
)(Plugin)