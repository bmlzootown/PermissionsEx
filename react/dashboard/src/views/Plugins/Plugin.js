import React from 'react'

import {
    Card, CardBody, CardTitle,
    Collapse,
    ListGroup,
    ListGroupItemText,
    ListGroupItem,
    Media,
    Button,
    Row, Col
} from 'reactstrap'

import Permission from './Permission';
import Icon from '../../components/Icon';
import SubHeader from '../../components/Text/SubHeader';

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
            <ListGroupItem>
                <Row onClick={this.toggle}>
                    <Col><h5 style={{ padding: 0 }} className="float-left">{plugin.name}</h5></Col>
                    <Col>
                        <h5 style={{ padding: 0 }} className="float-right"><Icon i={open ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} /></h5>
                        <p style={{ padding: 0 }} className="float-right"><b>{plugin.permissions.length}</b> listed permissions&nbsp;</p>
                    </Col>
                </Row>
                <Collapse isOpen={open} >
                    <ListGroup>
                        <SubHeader text='Permissions' />
                        {[...new Set(plugin.permissions)]
                            .filter(permission => !permission.startsWith('-'))
                            .map(permission =>
                                <Permission key={permission} pluginName={plugin.name} permission={permission} />
                            )}
                    </ListGroup>
                </Collapse>
            </ListGroupItem>
        )
    }
}

export default Plugin