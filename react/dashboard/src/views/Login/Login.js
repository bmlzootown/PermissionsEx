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
    Row
} from 'reactstrap';

import {connect} from 'react-redux'
import {login} from '../../reducers/loginReducer'

class Login extends Component {

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

    componentWillUnmount() {
        this.unsubscribe()
    }
  handleSubmit = (event) => {
      event.preventDefault();
    this.handleLogin(event.target)
  };
    // </Col>
  LoginPart = () => (
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
            <Button color="primary" className="px-4">Login</Button>
          </Col>
        </Row>
        </Form>
      </CardBody>
    </Card>
  );

    // <Col xs="6" className="text-right">
    // <Button type="submit" disabled color="link" className="px-0">Forgot password?</Button>
  RegisterPart = () => (
    <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
      <CardBody className="text-center">
        <div>
          <h2>Sign up</h2>
          <p>Registering an account requires<br></br>TODO Add info about requirements</p>
          <Button onClick={() => this.props.history.push('/register')} color="primary" className="mt-3" active>Register</Button>
        </div>
      </CardBody>
    </Card>
  );

    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

  render() {
    return (
      <div className="app flex-row align-items-center animated fadeIn">
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