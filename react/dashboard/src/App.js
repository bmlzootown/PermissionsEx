import React, {Component} from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
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
            </div>
        );
    }
}

export default App;
