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

const getAll = async (token) => {
    const response = await axios.get(
        '/api/worlds',
        headers(token)
    )
    return response.data.list.map(mapper)
}

export default { getAll }