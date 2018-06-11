import axios from 'axios'

const login = async (fields) => {
    const token = await axios.post('/api/login', fields).catch(e => { throw e })
    return token
}

export default { login }