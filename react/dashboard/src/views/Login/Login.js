import React, { Component } from 'react'
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
    Row,
    Alert
} from 'reactstrap'

import ForgotPass from '../../components/Modals/Login/ForgotPass'
import RegisterInfo from '../../components/Modals/Login/RegisterInfo'

import { connect } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import { error } from '../../reducers/notificationReducer'
import Notification from '../../components/Notification/Notification'

class Login extends Component {

    toggleRegisterModal = () => {
        this.setState({
            registerModal: !this.state.registerModal
        })
    };

    toggleForgotPassModal = () => {
        this.setState({
            forgotPassModal: !this.state.forgotPassModal
        })
    };

    handleLogin = (target) => {
        const username = target.username.value
        if (!username || username.length === 0) {
            this.props.error('Please write your username')
            return
        }

        const password = target.password.value

        if (!password || password.length === 0) {
            this.props.error('Please write your password')
            return
        }

        this.props.login(username, password)
    };

    handleSubmit = (event) => {
        event.preventDefault()
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
                    <Button onClick={this.toggleForgotPassModal} color="link" className="px-0">Forgot password?</Button>
                </Col>
                <Col xs="6" className="text-right">
                    <Button type="submit" color="primary" className="px-4">Login</Button>
                </Col>
            </Row>
        </Form>
    )

    LoginPart = () => (
        <Col>
            {location.protocol.includes("https") ? undefined :
                <Alert color="danger">HTTP transfers are unsafe, anyone can read your password. HTTPS Certificate tutorial can be found <a rel="noopener noreferrer" target="_blank" href="https://pex.aeternum.network/">here.</a>
                </Alert>}
            <Card className="p-4">
                <CardBody>
                    <img className="mx-auto d-block" alt="logo" src="/img/logo-symbol.png"></img>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <this.LoginForm />
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Button style={{ width: '100%' }} onClick={this.toggleRegisterModal} color="success" className="px-4">How to create an account?</Button>
                </CardBody>
                <CardBody style={{ paddingTop: 0 }}>
                    <Row>
                        <Col>
                            <a style={{ width: '100%', color: '#fff' }} color="primary" className="px-4 btn btn-primary"
                                rel="noopener noreferrer" target="_blank" href="https://pex.aeternum.network/">Documentation</a>
                        </Col>
                        <Col>
                            <a style={{ width: '100%', color: '#fff' }} color="primary" className="px-4 btn btn-primary"
                            rel="noopener noreferrer" target="_blank" href="https://bstats.org/plugin/bukkit/PermissionsEx">Statistics</a>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    )

    constructor(props) {
        super(props)
        this.state = {
            registerModal: false,
            forgotPassModal: false
        }
    }

    render() {
        return (
            <div>
                <Notification />
                <div className="app flex-row align-items-center animated fadeIn">
                    <RegisterInfo isOpen={this.state.registerModal} toggle={this.toggleRegisterModal} />
                    <ForgotPass isOpen={this.state.forgotPassModal} toggle={this.toggleForgotPassModal} />
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
            </div>
        )
    }
}

Login.contextTypes = {
    store: PropTypes.object
}

export default connect(
    null, { login, error }
)(Login)