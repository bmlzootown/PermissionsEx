import axios from 'axios'

const headers = (token) => {
    return token ? { headers: { 'Authorization': 'bearer ' + token } } : undefined
}

const mapper = (user) => {
    return {
        name: user.name,
        groups: user.groups,
        permissions: user.worlds.shift().information,
        worlds: user.worlds.map(world => {
            return { name: world.name, permissions: world.information }
        })
    }
}

const reverseMapper = (user) => {
    return {
        name: user.name,
        groups: user.groups,
        worlds: [
            { name: null, information: user.permissions },
            ...user.worlds
                .map(world => {
                    return { name: world.name, information: world.permissions }
                })
        ]
    }
}

const getAll = async (token) => {
    const response = await axios.get(
        '/api/users',
        headers(token)
    )
    return response.data.list.map(mapper)
}

const save = async (token, users) => {
    await axios.put(
        '/api/users',
        users.map(reverseMapper),
        headers(token)
    )
}

export default { getAll, save }