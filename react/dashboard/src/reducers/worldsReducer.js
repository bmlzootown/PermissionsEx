import worldsSvc from '../services/worlds'

import { handleError, toggleDash } from './reducers'

const reducer = (store = [], action) => {
    if (action.type === 'INIT_WORLDS') {
        return [...action.data.worlds]
    }
    if (action.type === 'NEGATE_WORLD_PERMISSION') {
        const replacing = action.data.world
        return [...store.filter(world => world.name !== replacing.name)].concat(replacing)
    }
    return store
}

export const initializeWorlds = (token, worlds) => {
    return async (dispatch) => {
        try {
            if (!worlds) {
                worlds = await worldsSvc.getAll(token)
            }
            dispatch({
                type: 'INIT_WORLDS',
                data: {
                    worlds
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const negatePermission = (worlds, world, permission) => {
    return async (dispatch) => {
        try {
            const permissions = [...world.permissions]

            const negatedPerm = toggleDash(permission)

            const newPermisisons = [...permissions]
            newPermisisons[permissions.indexOf(permission)] = negatedPerm
            
            const newWorld = {
                name: world.name,
                inheritance: world.inheritance,
                permissions: newPermisisons
            }

            dispatch({
                type: 'NEGATE_WORLD_PERMISSION',
                data: {
                    world: newWorld
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export default reducer