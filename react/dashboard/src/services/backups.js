import axios from 'axios'

import { getState } from '../store'

const headers = (token) => {
    return token ? { headers: { 'Authorization': 'bearer ' + token } } : undefined
}

const getAll = async (token) => {
    const response = await axios.get(
        '/api/backups',
        undefined,
        headers(token)
    )
    console.log(response.data)
    return response.data.list
}

export default { getAll }