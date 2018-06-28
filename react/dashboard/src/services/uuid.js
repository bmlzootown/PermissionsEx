import axios from 'axios'

const getUUID = async (name) => {
    const url = `https://api.minetools.eu/uuid/${name}`
    const response = await axios.get(
        url,
        {}
    ).catch(e => { throw e })
    const id = response.data.id

    return id !== 'null' ? id : null
}

export default { getUUID }

