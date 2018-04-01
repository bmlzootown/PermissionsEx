import axios from 'axios'

const headers = (token) => {
    return token ? { headers: { 'Authorization': 'bearer ' + token } } : undefined
}

const mapper = (group) => {
    return {
        name: group.name,
        inheritance: group.inheritance,
        permissions: group.worlds.shift().information,
        worlds: group.worlds.map(world => {
            return { name: world.name, permissions: world.information }
        })
    }
}

const getAll = async (token) => {
    const response = await axios.get(
        '/api/groups',
        headers(token)
    )
    return response.data.list.map(mapper)
}

const save = async (token, groups) => {
    const response = await axios.put(
        '/api/groups',
        groups,
        headers(token)
    )
}

export default { getAll, save }