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

const getAll = async (token) => {
    const response = await axios.get(
        '/api/users',
        headers(token)
    )
    return response.data.list.map(mapper)
}

const save = async (token, users) => {
    const response = await axios.put(
        '/api/users',
        users,
        headers(token)
    )
}

export default { getAll, save }