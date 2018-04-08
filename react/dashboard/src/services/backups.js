import axios from 'axios'

const headers = (token) => {
    return token ? { headers: { 'Authorization': 'bearer ' + token } } : undefined
}

const getAll = async (token) => {
    const response = await axios.get(
        '/api/backups',
        headers(token)
    )
    return response.data.list
}

const create = async (token, name) => {
    const response = await axios.post(
        '/api/backups',
        { name },
        headers(token)
    )
    return response.data
}

const restore = async (token, name) => {
    const response = await axios.post(
        '/api/backups/restore/' + name,
        undefined,
        headers(token)
    )
    return response.data
}

const clone = async (token, name) => {
    const response = await axios.post(
        '/api/backups/clone/' + name,
        undefined,
        headers(token)
    )
    return response.data
}

const remove = async (token, name) => {
    const response = await axios.delete(
        '/api/backups/' + name,
        headers(token)
    )
    return response.data
}

export default {
    getAll,
    create,
    clone,
    remove,
    restore
}