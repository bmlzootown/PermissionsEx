import React, { Component } from 'react'
import LogoutButton from './LogoutButton'

import { Card, CardBody } from 'reactstrap'

class Aside extends Component {
    render() {
        return (
            <aside style={{ height: '100%' }} className="aside-menu">

                <Card>
                    <CardBody>
                        <a style={{ width: '100%', color: '#fff' }} color="primary" className="px-4 btn btn-primary"
                            rel="noopener noreferrer" target="_blank" href="${documentation}">Documentation</a>
                    </CardBody>
                    <CardBody style={{ paddingTop: 0 }}>
                        <a style={{ width: '100%', color: '#fff' }} color="primary" className="px-4 btn btn-secondary"
                            rel="noopener noreferrer" target="_blank" href="${bstats}">Statistics</a>
                    </CardBody>
                </Card>
                <LogoutButton />
            </aside>
        )
    }
}

export default Aside
