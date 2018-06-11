import axios from 'axios'

const headers = (token) => {
    return token ? { headers: { 'Authorization': 'bearer ' + token } } : undefined
}

const getAll = async (token) => {
    const response = await axios.get(
        '/api/plugins',
        headers(token)
    ).catch(e => { throw e })
    return response.data.list
}

export default { getAll }