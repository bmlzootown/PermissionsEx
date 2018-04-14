import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Pagination from '../../components/Pagination'

import {
    changePage, changeFilter,
    duplicateUser,
    removeUser,
    addUser
} from '../../reducers/usersReducer'

import {
    InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Media
} from 'reactstrap'

import User from './User'
import { BigAddButton } from '../../components/Buttons/AddButton'
import { BiggerRemoveButton } from '../../components/Buttons/RemoveButton'
import { BiggerDuplicateButton } from '../../components/Buttons/DuplicateButton'

import Icon from '../../components/Icon'

class Users extends Component {

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleSearchChange = (event) => {
        this.props.changeFilter(event.target.value)
    }

    SearchBox = () => (
        <InputGroup className="float-left">
            <InputGroupAddon addonType="prepend">
                <InputGroupText>
                    <Icon i="fa fa-search" />
                </InputGroupText>
            </InputGroupAddon>
            <Input onChange={this.handleSearchChange} value={this.context.store.getState().users.filter} placeholder="Search (Case Sensitive)" />
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
                    <BiggerDuplicateButton duplicate={() => this.props.duplicateUser(user, prompt('Name of the duplicated user'))} />
                    <BiggerRemoveButton remove={() => this.props.removeUser(user)} />
                </span>
            }
        }).map((user, indx) => (
            <Media key={indx}>
                <Media body>
                    <ListGroupItem >
                        <Row>
                            <Col>{user.value}</Col>
                        </Row>
                    </ListGroupItem>
                </Media>
                <Media>{user.after}</Media>
            </Media>
        ))

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col md='0'>
                        <BigAddButton className="float-left" what='User' add={() => this.props.addUser(prompt('Name of the User'))} />
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
                                <ListGroup>
                                    {Users}
                                </ListGroup>
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
    null, {
        changePage, changeFilter,
        duplicateUser,
        removeUser,
        addUser
    }
)(Users)