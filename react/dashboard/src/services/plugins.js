import axios from 'axios'

const headers = (token) => {
    return token ? { headers: { 'Authorization': 'bearer ' + token } } : undefined
}

const getAll = async (token) => {
    const response = await axios.get(
        '/api/plugins',
        undefined,
        headers(token)
    )
    return response.data.list
}

export default { getAll }