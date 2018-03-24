import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    Row, Col
} from 'reactstrap'

import Group from './Group'

import { addGroup, swapGroup, removeGroup, duplicateGroup } from '../../reducers/groupsReducer'

import { BigAddButton } from '../../components/Buttons/AddButton'
import { BiggerRemoveButton } from '../../components/Buttons/RemoveButton'
import { BiggerDuplicateButton } from '../../components/Buttons/DuplicateButton'

import SortableComponent from '../../components/Sortable/SortableWithElements'

class Groups extends Component {

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    swapGroup = ({ oldIndex, newIndex }) => {
        this.props.swapGroup(oldIndex, newIndex)
    }

    render() {
        const groups = this.context.store.getState().groups

        const Groups = groups.map(group => {
            return {
                value: <Group key={group.name} group={group} />,
                after: <span>
                    <BiggerDuplicateButton duplicate={() => this.props.duplicateGroup(group, prompt('Name of the duplicated group'))} />
                    <BiggerRemoveButton remove={() => this.props.removeGroup(group)} />
                </span>
            }
        })

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md='0'>
                        <BigAddButton className="float-left" what='Group' add={() => this.props.addGroup(prompt('Name of the Group'))} />
                    </Col>
                    <Col>
                        <SortableComponent items={Groups} onSortEnd={this.swapGroup} />
                    </Col>
                </Row>
            </div>
        )
    }
}

Groups.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null, { addGroup, swapGroup, removeGroup, duplicateGroup }
)(Groups)