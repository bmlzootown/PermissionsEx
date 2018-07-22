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
        }),
        ladder: group.ladder,
        ladderRank: group.ladderRank,
        prefix: group.prefix,
        suffix: group.suffix
    }
}

const reverseMapper = (group) => {
    return {
        name: group.name,
        inheritance: group.inheritance,
        worlds: [
            { name: null, information: group.permissions },
            ...group.worlds
                .map(world => {
                    return { name: world.name, information: world.permissions }
                })
        ],
        ladder: group.ladder,
        ladderRank: group.ladderRank,
        prefix: group.prefix,
        suffix: group.suffix
    }
}

const getAll = async (token) => {
    const response = await axios.get(
        '/api/groups',
        headers(token)
    ).catch(e => { throw e })
    return response.data.list.map(mapper)
}

const save = async (token, groups) => {
    await axios.put(
        '/api/groups',
        groups.map(reverseMapper),
        headers(token)
    ).catch(e => { throw e })
}

export default { getAll, save }