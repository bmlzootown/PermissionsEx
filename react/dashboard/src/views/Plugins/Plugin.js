import React from 'react'

import {
    Card, CardBody, CardTitle,
    Collapse,
    ListGroup,
    ListGroupItem,
    Media,
    Button,
    Row, Col
} from 'reactstrap'

import Permission from './Permission'
import Icon from '../../components/Icon'

class Plugin extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    toggle = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        const plugin = this.props.plugin
        const open = this.state.open

        const alignButton = {
            color: '#fff',
            backgroundColor: '#757575',
            padding: '10px 15px',
            fontSize: '26px',
            borderColor: '#686868'
        }

        return (
            <div>
                <Col>
                    <Button className="float-right" title='Flat Permission view' style={alignButton}><Icon i='fa fa-align-justify' /></Button>
                    <Button className="float-right" title='Tree Permission view' style={alignButton}><Icon i='fa fa-align-left' /></Button>
                </Col>
                <Row>
                    <Col>
                        <Card body>
                            <h5 onClick={this.toggle}><Icon i={open ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} /> {plugin.name}</h5>
                            <Collapse isOpen={open} >
                                <br></br>
                                <ListGroup>
                                    {[...new Set(plugin.permissions)]
                                        .filter(permission => !permission.startsWith('-'))
                                        .map(permission =>
                                            <Permission key={permission} pluginName={plugin.name} permission={permission} />
                                        )}
                                </ListGroup>
                            </Collapse>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Plugin