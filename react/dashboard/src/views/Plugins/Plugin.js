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

        return (
            <Card body>
                <Row>
                    <Col><h5 className="float-left" onClick={this.toggle}><Icon i={open ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} /> {plugin.name}</h5></Col>
                    <Col><p style={{padding: 0}} className="float-right"><b>{plugin.permissions.length}</b> listed permissions</p></Col>
                </Row>
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
        )
    }
}

export default Plugin