import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Pagination from '../../components/Pagination'

import { changePage, changeFilter } from '../../reducers/usersReducer'

import {
    InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText,
    Row,
    Col,
    Media
} from 'reactstrap'

import User from './User'
import { BigAddButton } from '../../components/Buttons/AddButton'
import { BiggerRemoveButton } from '../../components/Buttons/RemoveButton'
import { BiggerDuplicateButton } from '../../components/Buttons/DuplicateButton'

import Icon from '../../components/Icon'
import SortableComponent from '../../components/Sortable/SortableWithElements'

class Users extends Component {

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleChange = (event) => {
        this.props.changeFilter(event.target.value)
    }

    SearchBox = () => (
        <InputGroup className="float-left">
            <InputGroupAddon addonType="prepend">
                <InputGroupText>
                    <Icon i="fa fa-search" />
                </InputGroupText>
            </InputGroupAddon>
            <Input onChange={this.handleChange} placeholder="Search" />
        </InputGroup>
    )

    render() {
        const usersStore = this.context.store.getState().users
        const currentPage = usersStore.currentPage
        const maxPage = usersStore.maxPage

        const displayedUsers = usersStore.displayedUsers

        const Users = displayedUsers.map(user => {
            return {
                value: <User key={user.name} user={user} />,
                after: <span>
                    <BiggerDuplicateButton duplicate={() => this.props.duplicateGroup(user, prompt('Name of the duplicated group'))} />
                    <BiggerRemoveButton remove={() => this.props.removeGroup(user)} />
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
                        <Row>
                            <Col>
                                <Media>
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={maxPage}
                                        onChange={this.props.changePage}
                                    />
                                    {' '}
                                    <this.SearchBox />
                                </Media>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <SortableComponent items={Users} onSortEnd={undefined} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

Users.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null, { changePage, changeFilter }
)(Users)