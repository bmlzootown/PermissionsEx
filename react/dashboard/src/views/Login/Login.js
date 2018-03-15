import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

import ForgotPass from '../../components/Modals/Login/ForgotPass'
import RegisterInfo from '../../components/Modals/Login/RegisterInfo'

import { connect } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import { error } from '../../reducers/notificationReducer' 
import Notification from '../../components/Notification/Notification';

class Login extends Component {

  toggleRegisterModal = () => {
    this.setState({
      registerModal: !this.state.registerModal
    });
  };

  toggleForgotPassModal = () => {
    this.setState({
      forgotPassModal: !this.state.forgotPassModal
    });
  };

  handleLogin = (target) => {
    const username = target.username.value;
    if (!username || username.length === 0) {
      this.props.error('Please write your username');
      return
    }

    const password = target.password.value;

    if (!password || password.length === 0) {
      this.props.error('Please write your password');
      return
    }

    this.props.login(username, password)
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleLogin(event.target)
  };

  LoginForm = () => (
    <Form onSubmit={this.handleSubmit}>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-user"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="text" name="username" id="username" placeholder="Username" />
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="icon-lock"></i>
          </InputGroupText>
        </InputGroupAddon>
        <Input type="password" name="password" id="password" placeholder="Password" />
      </InputGroup>
      <Row>
        <Col xs="6">
          <Button type="submit" color="primary" className="px-4">Login</Button>
        </Col>
        <Col xs="6" className="text-right">
          <Button onClick={this.toggleForgotPassModal} color="link" className="px-0">Forgot password?</Button>
        </Col>
      </Row>
    </Form>
  )

  LoginPart = () => (
    <Col>
      <Card className="p-4">
        <CardBody>
          <h1>Login</h1>
          <p className="text-muted">Sign In to your account</p>
          <this.LoginForm />
        </CardBody>
      </Card>
      <Card className="p-4">
        <Button onClick={this.toggleRegisterModal} color="success" className="px-4">How to create an
                  account?</Button>
      </Card>
    </Col>
  );

  constructor(props) {
    super(props);
    this.state = {
      registerModal: false,
      forgotPassModal: false
    };
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  render() {
    return (
      <div className="app flex-row align-items-center animated fadeIn">
        <RegisterInfo isOpen={this.state.registerModal} toggle={this.toggleRegisterModal} />
        <ForgotPass isOpen={this.state.forgotPassModal} toggle={this.toggleForgotPassModal} />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Notification />
              <CardGroup>
                <this.LoginPart />
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.contextTypes = {
  store: PropTypes.object
};

export default connect(
  null, { login, error }
)(Login);