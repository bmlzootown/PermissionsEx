import React, {Component} from 'react';
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

import {connect} from 'react-redux'
import {login} from '../../reducers/loginReducer'

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
        console.log('No username specified');
      // TODO Error notification "unknown user ect"
      return
    }

      const password = target.password.value;

    if (!password || password.length === 0) {
        console.log('No password specified');
      // TODO Error notification "unknown user ect"
      return
    }

    this.props.login(username, password)
  };
  handleSubmit = (event) => {
      event.preventDefault();
    this.handleLogin(event.target)
  };
  LoginPart = () => (
      <Col>
          <Card className="p-4">
              <CardBody>
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <Form onSubmit={this.handleSubmit}>
                      <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                  <i className="icon-user"></i>
                              </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" name="username" id="username" placeholder="Username"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                  <i className="icon-lock"></i>
                              </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" name="password" id="password" placeholder="Password"/>
                      </InputGroup>
                      <Row>
                          <Col xs="6">
                              <Button type="submit" color="primary" className="px-4">Login</Button>
                          </Col>
                          <Col xs="6" className="text-right">
                              <Button onClick={this.toggleForgotPassModal} color="link" className="px-0">Forgot
                                  password?</Button>
                          </Col>
                      </Row>
                  </Form>
              </CardBody>
          </Card>
          <Card className="p-4">
              <Button onClick={this.toggleRegisterModal} color="success" className="px-4">How to create an
                  account?</Button>
          </Card>
      </Col>
  );
    CreateAccountModal = () => (
        <div>
            <Modal isOpen={this.state.registerModal} toggle={this.toggleRegisterModal} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>User Creation instructions</ModalHeader>
                <ModalBody>
                    <p>In order to keep the dashboard secure users are registered in the dashboard_users.yml file.</p>
                    <p>You can create new users by using the following format:</p>
                    <pre>
            users:<br></br>
                        &nbsp;&nbsp;YourUsername:<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;password: YourPassword
          </pre>
                    <p>After loading the file the passwords will be hashed with a salt to keep them secure in case of a
                        breach:</p>
                    <pre>
            users:<br></br>
                        &nbsp;&nbsp;YourUsername:<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;pass_hash: $2a$10$giJkTU6RAdKpCn8wvn4i1u
          </pre>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggleRegisterModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
    ForgotPassModal = () => (
        <div>
            <Modal isOpen={this.state.forgotPassModal} toggle={this.toggleForgotPassModal}
                   className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Password Replacement instructions</ModalHeader>
                <ModalBody>
                    <p>You can replace a password dashboard_users.yml file in the same way you create a new user.</p>
                    <p>Add a new password for the user:</p>
                    <pre>
            users:<br></br>
                        &nbsp;&nbsp;YourUsername:<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;pass_hash: $2a$10$giJkTU6RAdKpCn8wvn4i1u<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;password: NewPassword
          </pre>
                    <p>After loading the file, the new password will be hashed.</p>
                    <pre>
            users:<br></br>
                        &nbsp;&nbsp;YourUsername:<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;pass_hash: $2a$10$hjYdQfkLoSiYeZKXZ9Gqgu
          </pre>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggleForgotPassModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
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
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

  render() {
    return (
      <div className="app flex-row align-items-center animated fadeIn">
          <this.CreateAccountModal/>
          <this.ForgotPassModal/>
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
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
  null, { login }
)(Login);