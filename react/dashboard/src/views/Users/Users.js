import React, { Component } from 'react';

import Dummy from '../../components/Dummy'

import {
  Card,
  CardHeader,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText
} from 'reactstrap'

import Icon from '../../components/Icon';
import Notification from '../../components/Notification/Notification';

class Users extends Component {

  // TODO onChange
  SearchBox = () => (
    <Card>
      <CardBody>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <Icon i="fa fa-search" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Search" />
        </InputGroup>
      </CardBody>
    </Card>
  )

  render() {
    return (
      <div className="animated fadeIn">
        <Notification />
        <this.SearchBox />
        <Dummy />
      </div>
    )
  }
}

export default Users;