import React from 'react'

import { Card, CardBody } from 'reactstrap'

const Dummy = () => (
    <Card>
        <CardBody>
            <h3>Links to backend GET requests</h3>
            <ul>
                <li><a href="/api/users">GET /api/users</a></li>
                <li><a href="/api/groups">GET /api/groups</a></li>
                <li><a href="/api/worlds">GET /api/worlds</a></li>
                <li><a href="/api/plugins">GET /api/plugins</a></li>
                <li><a href="/api/backups">GET /api/backups</a></li>
            </ul>
            <ul>
                <li><a href="/api/users/Player Name">GET /api/users/Player Name</a></li>
                <li><a href="/api/groups/Group Name">GET /api/groups/Group Name</a></li>
                <li><a href="/api/worlds/WorldName">GET /api/worlds/WorldName</a></li>
                <li><a href="/api/plugins/PluginName">GET /api/worlds/WorldName (Dummy returns error JSON)</a></li>
            </ul>
            <h3>Other backend requests</h3>
            <ul>
                <li>PUT /api/users</li>
                <li>PUT /api/groups</li>
                <li>PUT /api/worlds</li>
                <li>POST /api/login</li>
                <li>POST /api/register</li>
                <li>POST /api/backups</li>
                <li>POST /api/backups/restore/:name</li>
                <li>POST /api/backups/clone/:name</li>
                <li>DELETE /api/backups/:name</li>
            </ul>
        </CardBody>
    </Card>
)

export default Dummy