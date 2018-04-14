import axios from 'axios'

const headers = (token) => {
    return token ? { headers: { 'Authorization': 'bearer ' + token } } : undefined
}

const mapper = (world) => {
    return {
        name: world.name,
        inheritance: world.information
    }
}

const reverseMapper = (world) => {
    return {
        name: world.name,
        information: world.inheritance
    }
}

const getAll = async (token) => {
    const response = await axios.get(
        '/api/worlds',
        headers(token)
    )
    return response.data.list.map(mapper)
}

const save = async (token, worlds) => {
    await axios.put(
        '/api/worlds',
        worlds.map(reverseMapper),
        headers(token)
    )
}

export default { getAll, save }