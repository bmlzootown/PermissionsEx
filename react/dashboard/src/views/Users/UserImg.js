import React from 'react'

import uuidSvc from '../../services/uuid'

class UserImg extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            uuid: null
        }
    }

    componentDidMount() {
        const name = this.props.name
        uuidSvc.getUUID(name).then(uuid => {
            this.setState({ uuid, name })
        })
    }

    render() {
        if (this.props.name !== this.state.name) {
            this.componentDidMount()
        }
        const uuid = this.state.uuid
        const url = uuid && uuid !== null ? `https://visage.surgeplay.com/face/50/${uuid}` : 'https://visage.surgeplay.com/face/50/X-Steve'
        return <img style={{ padding: 0, alignContent: 'center', width: '55px' }} src={url}></img>
    }
}

export default UserImg