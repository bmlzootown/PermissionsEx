import axios from 'axios'

const getAll = async () => {
    const response = await axios.get(
        '/api/plugins'
    )
    return response.data.list
}

export default { getAll }