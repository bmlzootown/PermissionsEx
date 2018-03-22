import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Col, Row, } from 'reactstrap'

import WorldsWorld from './WorldsWorld'

import { addWorld, duplicateWorld, removeWorld, swapWorld } from '../../reducers/worldsReducer'

import { BigAddButton } from '../../components/Buttons/AddButton'
import { BiggerRemoveButton } from '../../components/Buttons/RemoveButton'
import { BiggerDuplicateButton } from '../../components/Buttons/DuplicateButton'

import SortableComponent from '../../components/Sortable/SortableWithElements'

class Worlds extends Component {

    swapWorld = ({ oldIndex, newIndex }) => {
        this.props.swapWorld(oldIndex, newIndex)
    };

    componentWillUnmount() {
        this.unsubscribe()
    }

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    render() {
        const worlds = this.context.store.getState().worlds

        const Worlds = worlds.map((world, indx) => {
            return {
                value: <WorldsWorld key={indx} world={world} />,
                after: <span>
                    <BiggerDuplicateButton duplicate={() => this.props.duplicateWorld(world, prompt('Name of the duplicated world'))} />
                    <BiggerRemoveButton remove={() => this.props.removeWorld(world)} />
                </span>
            }
        })

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md='0'>
                        <BigAddButton className="float-left" what='World' add={() => this.props.addWorld(prompt('Name of the World'))} />
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
)(Worlds)