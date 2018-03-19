import React from 'react'

import {
    Media,
    ListGroupItem,
    Collapse
} from 'reactstrap'

import Icon from '../../components/Icon';

class InheritedPerms extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            open: true
        }
    }

    toggle = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <Media>
                <ListGroupItem onClick={this.toggle}>from {this.props.name} <Icon i={this.state.open ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} /></ListGroupItem>

                <Media body >
                    <Collapse isOpen={this.state.open} >
                        {this.props.permissions
                            .map((perm, idx) => (<ListGroupItem color="secondary" key={idx}>{perm}</ListGroupItem>))}
                    </Collapse>
                </Media>

            </Media>
        )
    }
}

export default InheritedPerms